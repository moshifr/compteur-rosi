const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const COUNTER_FILE = path.join(__dirname, 'counters.txt');

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Initialiser le fichier de compteurs s'il n'existe pas
function initCountersFile() {
    if (!fs.existsSync(COUNTER_FILE)) {
        fs.writeFileSync(COUNTER_FILE, '0,0,Personne 1,Personne 2', 'utf8');
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

// API Routes

// Récupérer les compteurs actuels
app.get('/api/counters', (req, res) => {
    const counters = readCounters();
    res.json(counters);
});

// Incrémenter un compteur
app.post('/api/increment', (req, res) => {
    const { person } = req.body;

    if (person !== 1 && person !== 2) {
        return res.status(400).json({ error: 'Personne invalide' });
    }

    const counters = readCounters();

    if (person === 1) {
        counters.person1++;
    } else {
        counters.person2++;
    }

    if (writeCounters(counters.person1, counters.person2, counters.name1, counters.name2)) {
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

// Initialiser le fichier au démarrage
initCountersFile();

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📊 Les compteurs sont stockés dans: ${COUNTER_FILE}`);
});
