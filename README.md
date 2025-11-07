# Compteur pour 2 Personnes

Application web simple pour suivre les compteurs de 2 personnes avec stockage persistant dans un fichier .txt

## Fonctionnalités

- ✅ Compteur séparé pour 2 personnes
- ✅ Boutons pour incrémenter chaque compteur
- ✅ Affichage visuel en grand des compteurs
- ✅ **Noms personnalisables** : cliquez sur un nom pour le modifier
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

4. Cliquer sur un nom (ex: "Personne 1") pour le personnaliser

## Mode développement

Pour démarrer en mode développement avec rechargement automatique :
```bash
npm run dev
```

## Stockage

Les compteurs et noms sont stockés dans le fichier `counters.txt` au format :
```
counter1,counter2,name1,name2
```

Exemple : `5,3,Alice,Bob` signifie qu'Alice a un compteur de 5 et Bob un compteur de 3.

## Technologies utilisées

- **Frontend** : HTML, CSS, JavaScript vanilla
- **Backend** : Node.js, Express.js
- **Stockage** : Fichier .txt
