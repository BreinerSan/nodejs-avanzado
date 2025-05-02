const fs = require('node:fs');
const path = require('node:path');
const { Transform, pipeline } = require('node:stream');
const readLine = require('node:readline');

// Leo el archivo 
const readStream = fs.createReadStream(path.join(__dirname, 'lineasInput.txt'), 'utf-8');
const writeStream = fs.createWriteStream(path.join(__dirname, 'lineasOutput.txt'), 'utf-8');

const rl = readLine.createInterface({
    input: readStream,
    crlfDelay: Infinity
});

const processLineByLine = new Transform({
    transform(chunk, encoding, callback){
        const newLine = `${chunk.toString().toUpperCase()}\n`;
        callback(null, newLine);
    }
});

pipeline(
    rl,
    processLineByLine,
    writeStream,
    (err) => {
        if(err) {
            console.log(err);
        }else{
            console.log('Proceso finalizado');
        }
    }
)