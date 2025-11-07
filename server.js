const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const COUNTER_FILE = path.join(__dirname, 'counters.txt');
const HISTORY_FILE = path.join(__dirname, 'history.json');

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Initialiser le fichier de compteurs s'il n'existe pas
function initCountersFile() {
    if (!fs.existsSync(COUNTER_FILE)) {
        fs.writeFileSync(COUNTER_FILE, '0,0,Personne 1,Personne 2', 'utf8');
    }
}

// Initialiser le fichier d'historique s'il n'existe pas
function initHistoryFile() {
    if (!fs.existsSync(HISTORY_FILE)) {
        fs.writeFileSync(HISTORY_FILE, '[]', 'utf8');
    }
}

// Lire les compteurs depuis le fichier
function readCounters() {
    try {
        const data = fs.readFileSync(COUNTER_FILE, 'utf8');
        const parts = data.split(',');
        const person1 = parseInt(parts[0]) || 0;
        const person2 = parseInt(parts[1]) || 0;
        const name1 = parts[2] || 'Personne 1';
        const name2 = parts[3] || 'Personne 2';
        return { person1, person2, name1, name2 };
    } catch (error) {
        console.error('Erreur lors de la lecture des compteurs:', error);
        return { person1: 0, person2: 0, name1: 'Personne 1', name2: 'Personne 2' };
    }
}

// Écrire les compteurs dans le fichier
function writeCounters(person1, person2, name1 = 'Personne 1', name2 = 'Personne 2') {
    try {
        fs.writeFileSync(COUNTER_FILE, `${person1},${person2},${name1},${name2}`, 'utf8');
        return true;
    } catch (error) {
        console.error('Erreur lors de l\'écriture des compteurs:', error);
        return false;
    }
}

// Lire l'historique depuis le fichier
function readHistory() {
    try {
        const data = fs.readFileSync(HISTORY_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erreur lors de la lecture de l\'historique:', error);
        return [];
    }
}

// Écrire l'historique dans le fichier
function writeHistory(history) {
    try {
        fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Erreur lors de l\'écriture de l\'historique:', error);
        return false;
    }
}

// Ajouter une entrée à l'historique
function addHistoryEntry(person, name, context) {
    const history = readHistory();
    const entry = {
        person: person,
        name: name,
        context: context || null,
        date: new Date().toISOString()
    };
    history.unshift(entry); // Ajouter au début pour avoir les plus récents en premier

    // Garder seulement les 100 dernières entrées
    if (history.length > 100) {
        history.splice(100);
    }

    return writeHistory(history);
}

// API Routes

// Récupérer les compteurs actuels
app.get('/api/counters', (req, res) => {
    const counters = readCounters();
    res.json(counters);
});

// Incrémenter un compteur
app.post('/api/increment', (req, res) => {
    const { person, context } = req.body;

    if (person !== 1 && person !== 2) {
        return res.status(400).json({ error: 'Personne invalide' });
    }

    const counters = readCounters();

    if (person === 1) {
        counters.person1++;
    } else {
        counters.person2++;
    }

    // Sauvegarder les compteurs
    if (writeCounters(counters.person1, counters.person2, counters.name1, counters.name2)) {
        // Ajouter l'entrée à l'historique
        const personName = person === 1 ? counters.name1 : counters.name2;
        addHistoryEntry(person, personName, context);

        res.json(counters);
    } else {
        res.status(500).json({ error: 'Erreur lors de la sauvegarde' });
    }
});

// Réinitialiser les compteurs
app.post('/api/reset', (req, res) => {
    const counters = readCounters();
    if (writeCounters(0, 0, counters.name1, counters.name2)) {
        res.json({ person1: 0, person2: 0, name1: counters.name1, name2: counters.name2 });
    } else {
        res.status(500).json({ error: 'Erreur lors de la réinitialisation' });
    }
});

// Mettre à jour le nom d'une personne
app.post('/api/update-name', (req, res) => {
    const { person, name } = req.body;

    if (person !== 1 && person !== 2) {
        return res.status(400).json({ error: 'Personne invalide' });
    }

    if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'Nom invalide' });
    }

    const counters = readCounters();

    if (person === 1) {
        counters.name1 = name.trim();
    } else {
        counters.name2 = name.trim();
    }

    if (writeCounters(counters.person1, counters.person2, counters.name1, counters.name2)) {
        res.json(counters);
    } else {
        res.status(500).json({ error: 'Erreur lors de la sauvegarde' });
    }
});

// Récupérer l'historique
app.get('/api/history', (req, res) => {
    const history = readHistory();
    res.json(history);
});

// Initialiser les fichiers au démarrage
initCountersFile();
initHistoryFile();

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📊 Les compteurs sont stockés dans: ${COUNTER_FILE}`);
});
