const notifier = require('../notifier.js');

function sendEmail(user) {
    console.log(`Enviando correo a ${user.email}`);
}

notifier.on('userRegistered', sendEmail);

module.exports = sendEmail;