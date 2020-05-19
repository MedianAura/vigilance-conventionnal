import inquirer from 'inquirer';
import { DescriptionQuestion, LogQuestion, TaskQuestion, TypeQuestion } from '../models/questions';
import { sprintf } from 'sprintf-js';
import { InjectFromContainer } from '../decorators/inject-from-container';
import { Git, Logger } from '../services';

export class Commit {
  @InjectFromContainer('Git')
  protected git: Git;

  @InjectFromContainer('Logger')
  protected logger: Logger;

  public async start(): Promise<void> {
    // Check if staging is clean
    const stagingIsClean = await this.git.isClean();
    if (stagingIsClean) {
      throw new Error('No files added to staging! Did you forget to run git add?');
    }

    const answers = await inquirer.prompt([LogQuestion, TypeQuestion, DescriptionQuestion, TaskQuestion]);

    let logMessage = '';
    if (answers.log) {
      logMessage = `[log]`;
    }

    let taskMessage = '';
    if (!Number.isNaN(answers.task)) {
      taskMessage = `(${answers.task})`;
    }

    const commitMessage = sprintf('%(type)s%(log)s%(task)s: %(description)s', {
      type: answers.type,
      log: logMessage,
      task: taskMessage,
      description: answers.description
    });

    this.git.commit(commitMessage);
  }
}
