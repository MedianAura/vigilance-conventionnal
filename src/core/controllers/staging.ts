import { injectFromContainer } from '../decorators/inject-from-container';
import { Logger, Git } from '../services';
import inquirer from 'inquirer';

export class Staging {
  @injectFromContainer('Logger')
  protected logger: Logger;

  @injectFromContainer('Git')
  protected git: Git;

  public async start(): Promise<void> {
    const files = this.git.getUnstagedFiles();

    const answers = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'files',
        message: 'Choisir les fichiers a ajoutés dans le commit : \n',
        choices: files
      }
    ]);

    this.git.stagesFiles(answers.files);
  }
}
