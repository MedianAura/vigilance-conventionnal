import { EditorQuestion } from 'inquirer';

const DescriptionQuestion: EditorQuestion = {
  type: 'editor',
  message: 'Change description ?',
  name: 'description'
};

export { DescriptionQuestion };
