import inquirer from 'inquirer';
import { spawnSync } from 'child_process';
import { DescriptionQuestion, LogQuestion, TaskQuestion, TypeQuestion } from '../models/questions';

export class Commit {
  public async start(): Promise<void> {
    const answers = await inquirer.prompt([LogQuestion, TypeQuestion, TaskQuestion, DescriptionQuestion]);

    let logMessage = '';
    if (answers.log) {
      logMessage = `[log]`;
    }

    let taskMessage = '';
    if (!isNaN(answers.task)) {
      taskMessage = `(${answers.task})`;
    }

    const commitMessage = `${answers.type}${logMessage}${taskMessage}: ${answers.description}`;
    const result = spawnSync('git', ['commit', '-a', '-m', commitMessage]);
    console.log(result.stdout.toString());
    console.warn(result.stderr.toString());
  }
}
