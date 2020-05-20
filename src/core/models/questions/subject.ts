import { InputQuestion } from 'inquirer';
import chalk from 'chalk';

const SubjectQuestion: InputQuestion = {
  type: 'input',
  message: 'Saisir une courte phrase imperative pour décrire le commit (max 100 chars) :\n',
  name: 'subject',
  validate(subject) {
    const message = `Subject length must be less than or equal to 100 characters. Current length is ${subject.length} characters.`;

    if (subject.length === 0) {
      return 'subject is required';
    }

    if (subject.length > 100) {
      return message;
    }

    return true;
  },
  transformer(subject) {
    const color = subject.length <= 100 ? chalk.green : chalk.red;
    return color(`(${subject.length}) ${subject}`);
  },
  when(answers) {
    return !answers.log;
  }
};

export { SubjectQuestion };
