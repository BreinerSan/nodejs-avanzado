const express = require('express');
const { Worker } = require('worker_threads');
const { fork } = require('node:child_process');
const path = require('node:path');
const app = express();


// Hay dos formas de optimizar los endpoints con workers y con child_process

function fibonacci(n) {
    if (n < 2) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Este endpoint es pesado ya que es una funcion recursiva usando autocannon -d 20 http://localhost:3000/block se ve que solo hizo 30 peticiones y fallaron 20 por timeout
app.get('/block', (req, res) => {
    const n = parseInt(req.query.n) || 40;
    const result = fibonacci(n);
    res.send(`Enpoint bloqueado: ${result}`);
});

app.get('/worker', (req, res) => {
    const n = parseInt(req.query.n) || 40;
    const worker = new Worker(path.join(__dirname, 'worker.js'), { workerData: n });
    worker.on('message', (result) => res.send(`Fibonacci ${n}: ${result}`));

    worker.on('error', (error) => {
        res.status(500).send(error.message);
    });
});

app.get('/child_process', (req, res) => {
    const n = parseInt(req.query.n) || 40;
    const child = fork(path.join(__dirname, 'child.js'));

    child.send(n);
    child.on('message', (result) => res.send(`Fibonacci ${n}: ${result}`));

    child.on('error', (error) => {
        res.status(500).send(error.message);
    });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));