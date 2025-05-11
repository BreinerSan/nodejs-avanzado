#!/usr/bin/env node

const readline = require('node:readline');
const { argv } = require('node:process');

const [nodeExecPath, scriptPath, ...args] = argv;

console.log(`Ruta de node ${nodeExecPath}`);
console.log(`Ruta del script ${scriptPath}`);
console.log(`Argumentos ${args}`);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('¿Cuál es tu nombre? ', (name) => {
    console.log(`Hola ${name}!`);
    rl.close();
    process.exit(0);
});

const signals = ['SIGINT', 'SIGTERM', 'SIGUSR1', 'SIGUSR2'];	

signals.forEach(signal => {
    process.on(signal, () => {
        console.log('Recibido', signal);
        rl.close();
        process.exit(0);
    })
})