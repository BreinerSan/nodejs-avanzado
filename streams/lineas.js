const fs = require('node:fs');
const path = require('node:path');
const readLine = require('node:readline');

async function leerLineas() {
    const fileStream = fs.createReadStream(path.join(__dirname, 'contenido.txt'), 'utf-8');
    const rl = readLine.createInterface({ input: fileStream, crlfDelay: Infinity });
    for await (const line of rl) {
        console.log(`Linea: ${line}`);
    }
}

leerLineas().catch(err => console.log(err));