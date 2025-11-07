# Démarrage Rapide - Déploiement Plesk

Guide ultra-rapide pour déployer l'application sur Plesk.

## 📋 Ce dont vous avez besoin

- Accès à votre panneau Plesk
- Node.js activé sur votre domaine
- Fichiers de l'application

## 🚀 Étapes rapides (5 minutes)

### 1️⃣ Activer Node.js dans Plesk

1. Connexion à **Plesk**
2. **Domaines** → Votre domaine → **Node.js**
3. Activer Node.js (version 16+ recommandée)

### 2️⃣ Configurer l'application

- **Fichier de démarrage** : `server.js`
- **Mode** : Production
- **Port** : 3000 (ou autre si nécessaire)

### 3️⃣ Uploader les fichiers

Via **Fichiers** → **Gestionnaire de fichiers**, uploadez :
- ✅ `server.js`
- ✅ `index.html`
- ✅ `package.json`
- ✅ `package-lock.json`
- ✅ `.htaccess`
- ✅ `ecosystem.config.js` (si vous utilisez PM2)

### 4️⃣ Installer les dépendances

Dans **Node.js** → Cliquez sur **NPM Install**

### 5️⃣ Démarrer

Cliquez sur **Activer Node.js** ou **Redémarrer l'application**

### 6️⃣ Tester

Ouvrez votre navigateur : `http://votre-domaine.com`

## ✅ Vérification

Si tout fonctionne, vous devriez voir :
- Les deux compteurs affichés
- Possibilité de cliquer sur "➕ Ajouter"
- Possibilité de modifier les noms en cliquant dessus

## ⚠️ Problèmes courants

**L'application ne démarre pas ?**
→ Vérifiez les logs dans Plesk : **Node.js** → **Logs de l'application**

**Erreur 502 Bad Gateway ?**
→ Le serveur Node.js n'est pas démarré, redémarrez-le dans Plesk

**Les compteurs ne se sauvegardent pas ?**
→ Vérifiez les permissions du dossier (775)

## 📖 Plus d'aide

Pour un guide complet, consultez : **DEPLOYMENT_PLESK.md**

## 🔄 Mise à jour de l'application

1. Uploadez les nouveaux fichiers
2. Dans **Node.js** → **Redémarrer l'application**

C'est tout ! 🎉
