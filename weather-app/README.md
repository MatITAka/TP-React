Cette application permet de consulter la météo actuelle et les prévisions pour les jours suivants. Elle utilise l'API OpenWeatherMap pour récupérer les données météorologiques.
L'on peut consulter la météo pour une ville spécifique en utilisant son nom.


## Installation
1. Clone le dépôt :
   ```bash
   git clone
   ```
2. Installe les dépendances :
   ```bash
   cd weather-app
    npm install
    ```

## Utilisation
1. Lance l'application :
   ```bash
   cd weather-app
   npm run dev
   ```
2. Ouvre ton navigateur et va à l'adresse `http://localhost:5173`
3. Renseigne ta localisation via le bouton "Utiliser ma position"
4. Ou renseigne le nom d'une ville dans le champ de recherche disponible via le + en haut à droite
5. Consulte la météo actuelle et les prévisions pour les jours suivants. ENJOY!

## Architecture
L'application est structurée de la manière suivante :

```
    src/
    ├── components/ # Composants réutilisables
                  |- AddCityModal.tsx # Modal pour ajouter une ville
                  |- LocationButton.tsx # Bouton pour utiliser la position actuelle
                  |- TabNav.tsx # Navigation par onglets
    ├── hooks/ # Hooks personnalisés
             |- useWeather.ts # Hook pour gérer la logique de la météo
             |- useLocalisation.ts # Hook pour gérer les localisations des villes 
             |- useUserLocation.ts # Hook pour gérer la localisation de l'utilisateur
    ├── pages/ # Pages de l'application
             |- Home.tsx # Page d'accueil avec la météo actuelle et les prévisions
 App.tsx           # Composant principal de l'application
 App.css           # Styles globaux de l'application

```

## Auteurs
- [@MatITAka]

