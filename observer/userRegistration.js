const notifier = require('./notifier.js');

function registerUser(user) {
    console.log('Registrando usuario');

    // Emite el evento de registrando usuario
    notifier.emit('userRegistered', user);
    // Implementar registro -> como que se ejecutaria los procesos de registrar el usuario

    return user;
}

module.exports = registerUser;
