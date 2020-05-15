import { NumberQuestion } from 'inquirer';

const TaskQuestion: NumberQuestion = {
  type: 'number',
  message: 'Jira Task Number ?',
  name: 'task'
};

export { TaskQuestion };
