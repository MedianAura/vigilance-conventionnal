import { ListQuestion } from 'inquirer';

const TypeQuestion: ListQuestion = {
  type: 'list',
  message: 'What are you doing ?',
  choices: [
    {
      name: 'Nouvelle Fonctionnalité',
      value: 'feature'
    },
    {
      name: 'Changement',
      value: 'change'
    },
    {
      name: 'Ajout',
      value: 'add'
    },
    {
      name: 'Retrait',
      value: 'remove'
    },
    {
      name: 'Depreciation',
      value: 'deprecate'
    },
    {
      name: 'Documentation',
      value: 'doc'
    },
    {
      name: 'Test',
      value: 'test'
    },
    {
      name: 'Maintenance',
      value: 'maintenance'
    },
    {
      name: 'Chore',
      value: 'chose'
    }
  ],
  name: 'type'
};

export { TypeQuestion };
