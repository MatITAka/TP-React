Cette application est une app de gestions de tâches. Elle permet de créer, modifier et de les marquer comme terminées.

## Installation
1. Clonez le dépôt :
   ```bash
   git clone
2. Installez les dépendances :
   ```bash
   cd my-app
   npm install
   ```
3. Démarrez l'application :
   ```bash
    npm run dev
    ```
4. Ouvrez votre navigateur et allez à l'adresse suivante : http://localhost:5173

## Fonctionnalités
- Création de tâches
- Modification de tâches
- Marquage des tâches comme terminées

## Technologies utilisées
- React
- Vite
- Tailwind CSS
- TypeScript

## Architecture du projet
Le projet est structuré de la manière suivante :
```
App.tsx  # Composant principal de l'application
index.tsx  # Point d'entrée de l'application
|
|__ src/
    |__ components/  # Composants React
    |            List.tsx  # Composant pour afficher la liste des tâches
    |            Modal.tsx  # Composant pour le formulaire de création/modification de tâche
    |  
    |__ data/  # Fichiers de données
    |        goalsData.ts  # Echantillon de bases de tâches
    |
    |__ hooks/  # Hooks personnalisés
    |         useGoals.ts  # Hook pour la gestion des tâches
    |
    |__ pages/  # Pages de l'application
              ObjectiveListPage.tsx  # Page d'accueil de l'application
```

## Auteurs
- Batman

