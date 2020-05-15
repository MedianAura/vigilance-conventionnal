import inquirer from 'inquirer';
import { spawn } from 'child_process';
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
    await this.commitFilesToGit();
  }

  private async addFilesToGit(): Promise<void> {
    console.log(1);
    return new Promise((resolve) => {
      const command = spawn('git', ['add', '.']);
      console.log('git', ['add', '.']);
      command.stdout.on('data', (data: any) => {
        console.log(data.toString());
      });

      command.stderr.on('data', (data: any) => {
        console.error(`grep stderr: ${data}`);
      });

      command.on('close', (code) => {
        if (code !== 0) {
          console.log(`grep process exited with code ${code}`);
          resolve();
        }
      });
    });
  }

  private async commitFilesToGit(): Promise<void> {
    console.log(2);
    return new Promise((resolve) => {
      const command = spawn('git', ['commit', '-a', '-m', `"${this.commitMessage}"`], { stdio: 'inherit' });
      console.log('git', ['commit', '-a', '-m', `"${this.commitMessage}"`]);
      command.stdout.on('data', (data) => {
        console.log(data.toString());
      });

      command.stderr.on('data', (data) => {
        console.error(`grep stderr: ${data}`);
      });

      command.on('close', (code) => {
        if (code !== 0) {
          console.log(`grep process exited with code ${code}`);
          resolve();
        }
      });
    });
  }
}
