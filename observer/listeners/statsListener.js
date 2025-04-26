const notifier = require('../notifier.js');

function logStats(user) {
    console.log('Enviando estadísticas...', user);
}

notifier.on('userRegistered', logStats);

module.exports = logStats;
