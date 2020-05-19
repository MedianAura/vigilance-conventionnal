import { spawnSync, exec } from 'child_process';
import dedent from 'dedent';
import { inject, injectable } from 'inversify';
import { Logger } from './logger';

@injectable()
export class Git {
  @inject('Logger')
  public logger: Logger;

  public commit(commitMessage): void {
    this.logger.log('git', ['commit', '-m', dedent(commitMessage)]);
    spawnSync('git', ['commit', '-m', dedent(commitMessage)], { stdio: 'inherit' });
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
        function (error, stdout) {
          if (error) {
            return reject(error);
          }
          let output = stdout || '';
          resolve(output.trim().length === 0);
        }
      );
    });
  }

  public async log(): Promise<void> {
    let command = 'git log TAG..@';
    //
    // // git log --oneline $(git describe --tags --abbrev=0 @^)..@
    // const test = spawnSync("git", ["describe", "--tags","--abbrev=0"]);
    //
    // // console.log(test.stdout.toString());
    //
    // const commits = spawnSync("git", ["log"]).stdout.toString();
    //
    // // console.log(commits);
  }

  /**
   * Get Latest Tag from Git
   */
  public getLatestTag(): string {
    // Definition de l'action
    let command = 'git';
    let args = ['describe', '--tags', '--abbrev=0'];

    this.logger.log(command, args);
    const tag = spawnSync(command, args);
    if (tag.stderr.toString() !== '') {
      this.logger.error(tag.stderr.toString());
    }
    return tag.stdout.toString().toLowerCase();
  }
}
