import inquirer from 'inquirer';
import { spawnSync } from 'child_process';
import { DescriptionQuestion, LogQuestion, TaskQuestion, TypeQuestion } from '../models/questions';

export class Commit {
  private commitMessage = '';

  public async start(): Promise<void> {
    const answers = await inquirer.prompt([LogQuestion, TypeQuestion, TaskQuestion, DescriptionQuestion]);

    let logMessage = '';
    if (answers.log) {
      logMessage = `[log]`;
    }

    let taskMessage = '';
    if (!Number.isNaN(answers.task)) {
      taskMessage = `(${answers.task})`;
    }

    this.commitMessage = `${answers.type}${logMessage}${taskMessage}: ${answers.description}`;
    this.commitFilesToGit();
  }

  private addFilesToGit(): void {
    spawnSync('git', ['add', '.']);
    console.log('git', ['add', '.']);
  }

  private commitFilesToGit(): void {
    console.log('git', ['commit', '-a', '-m', `"${this.commitMessage}"`]);
    spawnSync('git', ['commit', '-a', '-m', `"${this.commitMessage}"`], { stdio: 'inherit' });
  }
}
