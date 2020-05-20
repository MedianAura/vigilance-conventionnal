import { spawnSync, spawn, exec } from 'child_process';
import dedent from 'dedent';
import gitlog, { GitlogOptions } from 'gitlog';
import { inject, injectable } from 'inversify';
import { Logger } from './logger';

@injectable()
export class Git {
  @inject('Logger')
  public logger: Logger;

  /**
   *
   * @param commitMessage
   */
  public async commit(commitMessage): Promise<any> {
    // Definition de l'action
    const command = 'git';
    const args = ['commit', '-m', dedent(commitMessage)];

    return new Promise((resolve, reject) => {
      this.logger.log(command, args);
      const child = spawn(command, args, { stdio: 'inherit' });

      child.on('error', (err) => {
        reject(err);
      });

      child.on('exit', (code) => {
        if (code) {
          if (code === 128) {
            this.logger.warn(`Git exited with code 128. Did you forget to run:
              git config --global user.email "you@example.com"
              git config --global user.name "Your Name"
            `);
          }
          return reject(new Error(`git exited with error code ${code.toString()}`));
        }

        resolve();
      });
    });
  }

  /**
   * Check if repo as uncommited changes
   */
  public async isClean(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const command = 'git diff --no-ext-diff --cached --name-only';
      this.logger.log(command);
      exec(
        command,
        {
          maxBuffer: Infinity
        },
        (error, stdout) => {
          if (error) {
            return reject(error);
          }
          const output = stdout || '';
          resolve(output.trim().length === 0);
        }
      );
    });
  }

  /**
   *
   * @param tag
   */
  public async log(tag: string): Promise<any[]> {
    const options: GitlogOptions<any> = {
      repo: process.cwd(),
      fields: ['hash', 'subject', 'body', 'rawBody', 'authorName', 'authorDate']
    };

    if (tag) {
      options.branch = `${tag}..HEAD`;
    }

    return gitlog(options);
  }

  /**
   * Get Latest Tag from Git
   */
  public getLatestTag(): string {
    // Definition de l'action
    const command = 'git';
    const args = ['describe', '--tags', '--abbrev=0'];

    this.logger.log(command, args);
    const tag = spawnSync(command, args);
    if (tag.stderr.toString() !== '') {
      this.logger.error(tag.stderr.toString());
    }
    return tag.stdout.toString() ? tag.stdout.toString().toLowerCase().replace(/\n/, '') : null;
  }

  /**
   *
   * @param files
   */
  public stagesFiles(files: string[]): void {
    spawnSync('git', ['add'].concat(files));
  }

  /**
   *
   */
  public getUnstagedFiles(): string[] {
    spawnSync('git', ['restore', '--staged', '.']);

    const files = [];

    // Get a list of unstaged files
    let output = spawnSync('git', ['-c', 'core.quotepath=false', 'diff-index', '--name-status', '-M', '--diff-filter=ACDMRTUXB', 'HEAD']);
    if (output.stderr.toString().trim() !== '') {
      throw new Error(output.stderr.toString());
    }
    output.stdout
      .toString()
      .split('\n')
      .filter((line) => line.trim() !== '')
      .forEach((line) => {
        files.push(line.split('\t')[1]);
      });

    // Get a list of untracked files
    output = spawnSync('git', ['ls-files', '--others', '--exclude-standard']);
    if (output.stderr.toString().trim() !== '') {
      throw new Error(output.stderr.toString());
    }
    output.stdout
      .toString()
      .split('\n')
      .filter((line) => line.trim() !== '')
      .forEach((line) => {
        files.push(line);
      });

    return files;
  }
}
