#!/usr/bin/env node

const minimist = require('minimist');
const args = minimist(process.argv.slice(2), {
    string: ['name', 'role', 'company'],
    boolean: ['saludo'],
    default: {
        saludo: false
    },
    alias: {
        n: 'name',
        r: 'role',
        c: 'company',
        s: 'saludo'
    }
});

console.log(args);

const signals = ['SIGINT', 'SIGTERM', 'SIGUSR1', 'SIGUSR2'];

signals.forEach(signal => {
    process.on(signal, () => {
        console.log(`Recibido ${signal}`);
        process.exit(0);
    })
})