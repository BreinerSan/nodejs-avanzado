console.log('Inicio del script');

process.nextTick(() => {
    console.log('Ejecutando process.nextTick microtask o microtarea');
});

setTimeout(() => {
    console.log('Ejecutando setTimeout callback');
}, 0);

setImmediate(() => {
    console.log('Ejecutando setImmediate callback');
});

const fs = require('node:fs');

fs.readFile(__filename, 'utf8', () => {
    console.log('Ejecutando I/O callback');
});

console.log('Fin del script');