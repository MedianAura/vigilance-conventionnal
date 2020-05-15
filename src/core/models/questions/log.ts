import { ConfirmQuestion } from 'inquirer';

const LogQuestion: ConfirmQuestion = {
  type: 'confirm',
  default: 'Y',
  message: 'Save commit to changelog ?',
  name: 'log'
};

export { LogQuestion };
