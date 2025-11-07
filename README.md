# Compteur pour 2 Personnes

Application web simple pour suivre les compteurs de 2 personnes avec stockage persistant dans un fichier .txt

## Fonctionnalités

- ✅ Compteur séparé pour 2 personnes
- ✅ Boutons pour incrémenter chaque compteur
- ✅ Affichage visuel en grand des compteurs
- ✅ Stockage persistant dans un fichier `counters.txt`
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

## Mode développement

Pour démarrer en mode développement avec rechargement automatique :
```bash
npm run dev
```

## Stockage

Les compteurs sont stockés dans le fichier `counters.txt` au format :
```
person1,person2
```

Exemple : `5,3` signifie que la personne 1 a un compteur de 5 et la personne 2 un compteur de 3.

## Technologies utilisées

- **Frontend** : HTML, CSS, JavaScript vanilla
- **Backend** : Node.js, Express.js
- **Stockage** : Fichier .txt
