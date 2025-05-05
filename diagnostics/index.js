const diagnostics = require('node:diagnostics_channel');

const channel = diagnostics.channel('my-channel');

function onMessage(message) {
    // Aqui hace alguna funcionalidad con el mensaje
    console.log('Mensaje recibido:', message);
}

diagnostics.subscribe('my-channel', onMessage);

if(channel.hasSubscribers) {
    channel.publish('Mensaje de prueba');
}

diagnostics.unsubscribe('my-channel', onMessage);

// Funciona para usar mensajes de debugging, manejar mensajes de errores e informacion para usarlas para diagnosticar problemas y usarlas sin alterar el performace de la aplicacion