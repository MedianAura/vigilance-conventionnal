import { InputQuestion, ConfirmQuestion } from 'inquirer';

const TaskNumberQuestion: InputQuestion = {
  type: 'input',
  message: 'Numero de la tâche Jira :',
  name: 'task',
  validate(task) {
    task = task.trim();
    if (!task.match(/^\d+$/gm)) {
      return 'task must be a number';
    }

    return true;
  },
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
