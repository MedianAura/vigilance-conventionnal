import { ListQuestion } from 'inquirer';
import longest from 'longest';

const types = [
  {
    description: "Un nouveau feature pour l'utilisateur.",
    name: 'Nouvelle Fonctionnalité',
    value: 'feature'
  },
  {
    description: "Correction d'un feature.",
    name: 'Correction',
    value: 'fix'
  },
  {
    description: "Changement d'un comportement qui n'est pas brisé.",
    name: 'Changement',
    value: 'change'
  },
  {
    description: "Ajout de code qui n'a pas d'impacte pour le client",
    name: 'Ajout',
    value: 'add'
  },
  {
    description: "Retrait de code qui n'a pas d'impacte pour le client",
    name: 'Retrait',
    value: 'remove'
  },
  {
    description: 'Mise en place de dépréciation de code.',
    name: 'Depreciation',
    value: 'deprecate'
  },
  {
    description: 'Ajout de documentation (Cookbook, Readme ou commentaire)',
    name: 'Documentation',
    value: 'doc'
  },
  {
    description: 'Ajout ou Correction de test unitaire ou e2e',
    name: 'Test',
    value: 'test'
  },
  {
    description: 'Mise a jour de librairie',
    name: 'Maintenance',
    value: 'maintenance'
  },
  {
    description: "Changement qui n'affecte pas le code. (Prettier, Configuration, Pipeline)",
    name: 'Chore',
    value: 'chore'
  }
];

const length = (longest(types.map((type) => type.name)) as string).length + 1;
const choices = types.map((type) => {
  return {
    name: `${(type.name + ':').padEnd(length)} ${type.description}`,
    value: type.value,
    short: type.value
  };
});

const TypeQuestion: ListQuestion = {
  type: 'list',
  message: 'Choisir le type de changement pour le commit :',
  choices,
  name: 'type'
};

export { TypeQuestion };
