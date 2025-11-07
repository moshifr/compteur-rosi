// Configuration PM2 pour le déploiement sur Plesk
// Documentation : https://pm2.keymetrics.io/docs/usage/application-declaration/

module.exports = {
  apps: [{
    name: 'compteur-rosi',
    script: './server.js',

    // Mode d'exécution
    instances: 1,
    exec_mode: 'fork',

    // Variables d'environnement
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },

    // Gestion des erreurs et redémarrages
    autorestart: true,
    watch: false,
    max_memory_restart: '200M',

    // Logs
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,

    // Délais de redémarrage
    min_uptime: '10s',
    max_restarts: 10,
    restart_delay: 4000
  }]
};
