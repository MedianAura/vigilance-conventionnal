import { NumberQuestion, ConfirmQuestion } from 'inquirer';

const TaskNumberQuestion: NumberQuestion = {
  type: 'number',
  message: 'Numero de la tâche Jira :',
  name: 'task',
  when(answers) {
    return answers.isTaskAffected;
  }
};

const hasTaskQuestion: ConfirmQuestion = {
  type: 'confirm',
  name: 'isTaskAffected',
  message: 'Est ce que ça corrige une tâche existante ?',
  default: true
};

const TaskQuestion = [hasTaskQuestion, TaskNumberQuestion];

export { TaskQuestion };
