## Vigilance Conventionnal (Changelog)

[//]: # "TEMPLATE"

## [[1.2.2.0] - 2020-05-20](https://git.vigilance.local/slafleur/conventionnal/blob/master/CHANGELOG.md)
    
#### Nouvelles fonctionnalités

#### Correctifs

- [2020-05-20] Empecher l'application de planter quand le fichier de cache n'est pas présent en mode retry.

#### Changements

- [2020-05-20] Toujours afficher le sujet et la description dans un commit qui sera envoyé du commit.

- [2020-05-20] Avoir un sujet pour le commit clean en retirant la mention [log].

- [2020-05-20] Valider le message de commit en fonction des nouvelles contraintes de commit.

- [2020-05-20] Vérification si le champ tache est un integer et requis. vérifier si le sujet n'est pas vide. vérifier si la description est remplit.

- [2020-05-20] Pour facilité le travail lorsqu'on lance en mode retry. si le fichier de cache est absent ou vide alors on affiche le cli pour remplir un nouveau commit.

#### Ajouts

#### Retraits

#### Autres

## [[1.2.1.0] - 2020-05-20](https://git.vigilance.local/slafleur/conventionnal/blob/master/CHANGELOG.md)
    
#### Nouvelles fonctionnalités

#### Correctifs

#### Changements

- [2020-05-20] Modification de l'ordre des questions et ne pas demander de sujet quand on n'envoie pas dans le log.

- [2020-05-20] Modification des questions pour être en français dans tous les cas.

#### Ajouts

#### Retraits

#### Autres

## [[1.2.0.0] - 2020-05-20](https://git.vigilance.local/git@github.com:MedianAura/vigilance-conventionnal/blob/master/CHANGELOG.md)
    
#### Nouvelles fonctionnalités

- [2020-05-20] Ajout d'un option pour facilement choisir les fichiers qui doivent être staged.

#### Correctifs

#### Changements

#### Ajouts

- [2020-05-20] Ajout d'un commit automatique lors qu'on génère le changelog.

#### Retraits

#### Autres

## [[1.1.0.0] - 2020-05-19](https://git.vigilance.local/vigilance-conventionnal/blob/master/CHANGELOG.md)
    
#### Nouvelles fonctionnalités

- [2020-05-19] Ajout d'une validation du message de commit pour utilisation dans le hook commit_msg.

- [2020-05-19] Ajout d'un option pour 'retry' le dernier commit en cas d'erreur.

#### Correctifs

#### Changements

#### Ajouts

#### Retraits

#### Autres

## [[1.0.0.0] - 2020-05-19](https://git.vigilance.local/vigilance-conventionnal/blob/master/CHANGELOG.md)
   
#### Nouvelles fonctionnalités

- [2020-05-19] Mise en place de tous les éléments pour la saisie du sujet dans le commit.

- [2020-05-19] Ajout d'un feature complet pour pouvoir créer un changelog a partir des messages de commit.

#### Correctifs

- [2020-05-19] Afficher le sujet dans le commit plustot que undefined.

- [2020-05-19] Masque undefined dans le commit quand on a pas de tache.

- [2020-05-19] Correction d'indentation dans le changelog.

#### Changements

- [2020-05-19] Stardardisation des types et cleanup du code.

#### Ajouts

#### Retraits

#### Autres