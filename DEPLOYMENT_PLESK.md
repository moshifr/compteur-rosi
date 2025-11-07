# Guide de déploiement sur Plesk

Ce guide vous explique comment déployer l'application de compteur sur un serveur Plesk.

## Prérequis

- Accès à votre panneau Plesk
- Node.js activé sur votre domaine/sous-domaine
- Accès SSH (optionnel mais recommandé)

## Méthode 1 : Déploiement via l'interface Plesk (Recommandé)

### Étape 1 : Activer Node.js sur votre domaine

1. Connectez-vous à **Plesk**
2. Allez dans **Domaines** > Sélectionnez votre domaine
3. Cliquez sur **Node.js**
4. Activez Node.js et sélectionnez la version (recommandé : 18.x ou supérieur)

### Étape 2 : Configurer l'application

Dans les paramètres Node.js :

- **Mode d'application** : Production
- **Document Root** : `/httpdocs` (ou votre dossier web)
- **Répertoire de l'application** : `/httpdocs` (ou créez un sous-dossier comme `/httpdocs/compteur`)
- **Fichier de démarrage** : `server.js`
- **Variables d'environnement** (optionnel) :
  - `NODE_ENV=production`
  - `PORT=3000` (ou le port de votre choix)

### Étape 3 : Uploader les fichiers

**Option A : Via le Gestionnaire de fichiers Plesk**
1. Allez dans **Fichiers** > **Gestionnaire de fichiers**
2. Naviguez vers le dossier de votre application
3. Uploadez tous les fichiers suivants :
   - `server.js`
   - `index.html`
   - `package.json`
   - `package-lock.json`
   - `.gitignore`

**Option B : Via FTP/SFTP**
1. Connectez-vous à votre serveur via FTP/SFTP
2. Uploadez tous les fichiers dans le dossier de l'application

**Option C : Via Git (si disponible)**
```bash
cd /var/www/vhosts/votredomaine.com/httpdocs
git clone <votre-repo-url> compteur
cd compteur
```

### Étape 4 : Installer les dépendances

Dans l'interface **Node.js** de Plesk :
1. Cliquez sur **NPM Install**
2. Attendez que l'installation se termine

**OU via SSH :**
```bash
cd /var/www/vhosts/votredomaine.com/httpdocs
npm install --production
```

### Étape 5 : Démarrer l'application

1. Dans l'interface **Node.js**, cliquez sur **Activer Node.js**
2. L'application devrait démarrer automatiquement
3. Vérifiez l'état : **Statut de l'application** devrait afficher "En cours d'exécution"

### Étape 6 : Configurer le proxy (si nécessaire)

Si votre application tourne sur un port différent de 80/443, Plesk configure automatiquement un reverse proxy.

Sinon, créez un fichier `.htaccess` dans le Document Root :

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

## Méthode 2 : Déploiement via SSH

### 1. Connexion SSH

```bash
ssh votre-utilisateur@votredomaine.com
cd /var/www/vhosts/votredomaine.com/httpdocs
```

### 2. Cloner ou copier le projet

```bash
# Si vous utilisez Git
git clone <votre-repo-url> compteur
cd compteur

# Ou copiez les fichiers manuellement
```

### 3. Installer les dépendances

```bash
npm install --production
```

### 4. Configurer PM2 (Process Manager)

Plesk utilise souvent PM2 pour gérer les applications Node.js :

```bash
npm install -g pm2
pm2 start server.js --name compteur-rosi
pm2 save
pm2 startup
```

### 5. Vérifier que l'application tourne

```bash
pm2 status
pm2 logs compteur-rosi
```

## Configuration avancée

### Changer le port

Si vous devez utiliser un port différent, modifiez `server.js` :

```javascript
const PORT = process.env.PORT || 3000;
```

Puis définissez la variable d'environnement dans Plesk ou via :
```bash
export PORT=8080
```

### Permissions du fichier counters.txt

Assurez-vous que l'application peut écrire dans le dossier :

```bash
cd /var/www/vhosts/votredomaine.com/httpdocs/compteur
chmod 664 counters.txt  # Si le fichier existe
chmod 775 .  # Permettre l'écriture dans le dossier
```

### Logs

Pour voir les logs dans Plesk :
1. Allez dans **Node.js**
2. Cliquez sur **Logs de l'application**

Via SSH :
```bash
pm2 logs compteur-rosi
# ou
tail -f /var/www/vhosts/votredomaine.com/logs/error_log
```

## Accéder à l'application

Une fois déployée, accédez à votre application via :
- `http://votredomaine.com` (si configuré à la racine)
- `http://votredomaine.com/compteur` (si dans un sous-dossier)

## Dépannage

### L'application ne démarre pas

1. Vérifiez les logs dans Plesk ou via `pm2 logs`
2. Vérifiez que Node.js est activé
3. Vérifiez que le port n'est pas déjà utilisé
4. Vérifiez les permissions des fichiers

### Erreur 502 Bad Gateway

- Le serveur Node.js n'est probablement pas démarré
- Vérifiez le proxy reverse dans `.htaccess`
- Redémarrez l'application dans Plesk

### Le fichier counters.txt n'est pas créé

```bash
cd /var/www/vhosts/votredomaine.com/httpdocs/compteur
chmod 775 .
chown votre-utilisateur:psacln .
```

### Redémarrer l'application

**Via Plesk :**
1. Allez dans **Node.js**
2. Cliquez sur **Redémarrer l'application**

**Via SSH :**
```bash
pm2 restart compteur-rosi
```

## Mise à jour de l'application

### Via Git

```bash
cd /var/www/vhosts/votredomaine.com/httpdocs/compteur
git pull
npm install
pm2 restart compteur-rosi
```

### Via Plesk

1. Uploadez les fichiers modifiés
2. Redémarrez l'application dans **Node.js**

## Sécurité

1. **HTTPS** : Activez SSL/TLS dans Plesk (Let's Encrypt gratuit)
2. **Firewall** : Assurez-vous que seul le port 80/443 est ouvert
3. **Backup** : Configurez des sauvegardes automatiques dans Plesk

## Support

En cas de problème :
- Consultez les logs de l'application
- Vérifiez la documentation Plesk pour Node.js
- Contactez votre hébergeur si nécessaire
