# Compteur MODI

Application web simple pour suivre les compteurs de 2 personnes avec stockage persistant et historique détaillé

## Fonctionnalités

- ✅ Compteur séparé pour 2 personnes
- ✅ Boutons pour incrémenter chaque compteur
- ✅ Affichage visuel en grand des compteurs
- ✅ **Noms personnalisables** : cliquez sur un nom pour le modifier
- ✅ **Contexte et date** : ajoutez un contexte optionnel à chaque incrémentation
- ✅ **Historique détaillé** : consultez l'historique avec dates et contextes
- ✅ Stockage persistant dans des fichiers (`counters.txt` + `history.json`)
- ✅ Interface moderne et responsive
- ✅ Animation lors de l'incrémentation
- ✅ Bouton de réinitialisation

## Installation

1. Installer les dépendances :
```bash
npm install
```

## Utilisation

1. Démarrer le serveur :
```bash
npm start
```

2. Ouvrir votre navigateur à l'adresse :
```
http://localhost:3000
```

3. Cliquer sur les boutons "➕ Ajouter" pour incrémenter les compteurs
   - Une modale s'affichera pour ajouter un contexte optionnel
   - Le contexte permet de noter pourquoi vous incrémentez (ex: "Réunion client", "Formation terminée")

4. Cliquer sur un nom (ex: "Personne 1") pour le personnaliser

5. Cliquer sur "Afficher" dans la section Historique pour voir toutes les incrémentations passées avec leurs dates et contextes

## Mode développement

Pour démarrer en mode développement avec rechargement automatique :
```bash
npm run dev
```

## Stockage

### Compteurs (`counters.txt`)
Les compteurs et noms sont stockés au format :
```
counter1,counter2,name1,name2
```
Exemple : `5,3,Alice,Bob` signifie qu'Alice a un compteur de 5 et Bob un compteur de 3.

### Historique (`history.json`)
L'historique des incrémentations est stocké au format JSON :
```json
[
  {
    "person": 1,
    "name": "Alice",
    "context": "Atelier de formation terminé",
    "date": "2025-01-15T14:30:00.000Z"
  }
]
```

Les 100 dernières entrées sont conservées automatiquement.

## Technologies utilisées

- **Frontend** : HTML, CSS, JavaScript vanilla
- **Backend** : Node.js, Express.js
- **Stockage** : Fichier .txt
