import { InputQuestion } from 'inquirer';

const DescriptionQuestion: InputQuestion = {
  type: 'input',
  message: 'Description pour le changelog :\n',
  name: 'description',
  when(answers) {
    return answers.log;
  }
};

export { DescriptionQuestion };
