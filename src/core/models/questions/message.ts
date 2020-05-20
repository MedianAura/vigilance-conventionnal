import { InputQuestion } from 'inquirer';

const DescriptionQuestion: InputQuestion = {
  type: 'input',
  message: 'Change description ?',
  name: 'description',
  when(answers) {
    return answers.log;
  }
};

export { DescriptionQuestion };
