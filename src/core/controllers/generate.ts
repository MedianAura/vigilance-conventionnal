// eslint-disable-next-line import/no-extraneous-dependencies
import { resolve } from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { injectFromContainer } from '../decorators/inject-from-container';
import { Git, Logger, VersionGenerator, ChangelogGenerator } from '../services';
import { CommitModel } from '../models/commit';
import { get } from 'lodash';
import parse from 'parse-git-config';

export class Generate {
  @injectFromContainer('Git')
  protected git: Git;

  @injectFromContainer('Logger')
  protected logger: Logger;

  @injectFromContainer('ChangelogGenerator')
  protected generator: ChangelogGenerator;

  @injectFromContainer('VersionGenerator')
  protected version: VersionGenerator;

  public async start(args: any, options: any): Promise<void> {
    const changelogPath = resolve(process.cwd(), 'CHANGELOG.md');

    // Vérifier si le fichier changelog existe.
    if (!existsSync(changelogPath)) {
      throw new Error(`Le fichier de changelog n'existe pas dans le projet.`);
    }

    // Vérifier si la variable de template existe
    let content = readFileSync(changelogPath, { encoding: 'utf8' });
    if (!content.includes('[//]: # "TEMPLATE"')) {
      throw new Error(`Le fichier de changelog ne contient pas le string <<[//]: # "TEMPLATE">>`);
    }

    // Get Latest Tag
    const tag = this.git.getLatestTag();
    const nextTag = this.version.generate(tag, args);

    // Get Commit Log
    const list: CommitModel[] = [];
    const logs = await this.git.log(tag);
    logs.forEach((log) => {
      const commit = new CommitModel();

      commit.hash = log.hash;
      commit.author = log.authorName;
      commit.setDate(log.authorDate);
      commit.setSubject(log.subject, log.rawBody);
      commit.setBody(log.body);

      list.push(commit);
    });

    const log = this.generator.generate(list, nextTag, this.getRepo(), args.branch);

    if (options.preview) {
      this.logger.log(log);
      console.log(log);
    }

    if (options.write) {
      this.logger.log('Element added to CHANGELOG.md');
      content = content.replace('[//]: # "TEMPLATE"', `[//]: # "TEMPLATE"\r\n\r\n${log}`);
      writeFileSync(changelogPath, content, { encoding: 'utf8' });
      this.git.stagesFiles(['CHANGELOG.md']);
      await this.git.commit(`doc: mise à jour du changelog pour la version ${nextTag}`);
    }
  }

  private getRepo(): string {
    const gitConfig = parse.sync();
    return get(gitConfig, ['remote "origin"', 'url'], '').replace('git@git.vigilance.local:', '').replace('.git', '');
  }
}
