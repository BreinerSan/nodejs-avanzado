const fs = require('node:fs');
const path = require('node:path');

const data = fs.createReadStream(path.join(__dirname, 'entrada.txt'), 'utf-8');

data.on('data', chunk => console.log(chunk.toString()));

data.on('end', () => console.log('Fin del stream'));

data.on('error', err => console.log(err));