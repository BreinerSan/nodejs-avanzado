const express = require('express');
const eventEmitter = require('node:events');

class LeakyEmitter extends eventEmitter {}
const emmiter = new LeakyEmitter();

const app = express();

const listeners = [];

app.get('/memory', (req, res) => {
    // Como en el array se almacena la funcion listener y este esta ejecutando req.url o por asi decirlo lo esta reteniendo, esto lo que hace es que al referenciarlo la memoria se va llenando
    const listener = (data) =>{
        console.log(`Evento recibido ${data}`, req.url);
        // Seria cambiar req.url por un texto para solucionarlo (Obviamente toca comentar la linea de arriba que tiene el req.url)
        console.log(`Evento recibido ${data}`, 'Texto cambiado');
    }

    listeners.push(listener);
    emmiter.on('data', listener)

    emmiter.emit('data', { id: 1, message: 'Evento de prueba' });

    res.send('Agergado el listener y se mantiene en memoria');
});

setInterval(() => {
    const used = process.memoryUsage();
    console.log(`Uso de heap: ${(used.heapTotal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Uso de heap total: ${(used.heapTotal / 1024 / 1024).toFixed(2)} MB`);
}, 1000);

app.listen(3000, () => console.log('Example app listening on port 3000!'));