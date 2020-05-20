import inquirer from 'inquirer';
import { DescriptionQuestion, LogQuestion, SubjectQuestion, TaskQuestion, TypeQuestion } from '../models/questions';
import { sprintf } from 'sprintf-js';
import { injectFromContainer } from '../decorators/inject-from-container';
import { Git, Logger, Cache } from '../services';

export class Commit {
  @injectFromContainer('Git')
  protected git: Git;

  @injectFromContainer('Logger')
  protected logger: Logger;

  @injectFromContainer('Cache')
  protected cache: Cache;

  public async start(options: any): Promise<void> {
    // Check if staging is clean
    const stagingIsClean = await this.git.isClean();
    if (stagingIsClean) {
      throw new Error('No files added to staging! Did you forget to run git add?');
    }

    let commitMessage = '';
    if (options.retry) {
      commitMessage = this.cache.getCache();
    } else {
      commitMessage = await this.showUserPrompt();
    }

    if (!commitMessage) {
      throw new Error("Commit message can't be empty.");
    }

    try {
      await this.git.commit(commitMessage);
      this.cache.clearCache();
    } catch (error) {
      this.logger.error(error.toString());
    }
  }

  private async showUserPrompt(): Promise<string> {
    const answers = await inquirer.prompt([TypeQuestion, LogQuestion, SubjectQuestion, DescriptionQuestion, ...TaskQuestion]);

    const head = this.buildHead(answers);

    let logMessage = '';
    if (answers.log) {
      logMessage = `[log]`;
    }

    const commitMessage = [head, answers.description, logMessage].join('\n\n');
    this.cache.setCache(commitMessage);
    return commitMessage;
  }

  private buildHead(answers: any): string {
    let taskMessage = '';
    if (answers.isTaskAffected) {
      taskMessage = `(${answers.task})`;
    }

    return sprintf('%(type)s%(task)s: %(description)s', {
      type: answers.type,
      task: taskMessage,
      description: answers.subject
    });
  }
}
