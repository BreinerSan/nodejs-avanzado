const express = require('express');
const app = express();

const fs = require('node:fs');
const path = require('node:path');
const largeFile = JSON.parse(fs.readFileSync(path.join(__dirname, 'items.json'), 'utf-8'));

const port = 3000;

app.get('/fast', (req, res) => res.send('Enpoint raiz'));

app.get('block', (req, res) => {
    const result = [];

    for(const item of largeFile){
        result.push(item);
    }

    res.send(`Enpoint bloqueado: ${result.length} items`);
});

app.get('unblock', (req, res) => {
    const result = [];
    let index = 0;
    const chunkSize = 1000;
    
    function processChunk(){
        const end = Math.min(index + chunkSize, largeFile.length);
        while(index < end){
            result.push(largeFile[index]);
            index++;
        }

        if(index < largeFile.length){
            setImmediate(processChunk);
        }else{
            res.send(`Enpoint desbloqueado: ${result.length} items`);
        }
    }

    processChunk();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));