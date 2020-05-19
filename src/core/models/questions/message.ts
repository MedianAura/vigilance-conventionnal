import { InputQuestion } from 'inquirer';

const DescriptionQuestion: InputQuestion = {
  type: 'input',
  message: 'Change description ?',
  name: 'description'
};

export { DescriptionQuestion };
