const fs = require('node:fs');
const path = require('node:path');
const { Transform, pipeline } = require('node:stream');

const toUpperCase = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

pipeline(
    fs.createReadStream(path.join(__dirname, 'entrada.txt'), 'utf-8'),
    toUpperCase,
    fs.createWriteStream(path.join(__dirname, 'salida.txt'), 'utf-8'), 
    (err) => {
        if(err) console.log(err);
    }
);