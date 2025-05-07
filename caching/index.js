const express = require('express');
const { LRUCache  } = require('lru-cache');

const app = express();

const cache = new LRUCache({
    max: 1000, // max number of items
    ttl: 1000 * 60 * 60 // 1 hour
});

function fibonacci(n) {
    if (n < 2) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

app.get('/block', (req, res) => {
    const n = parseInt(req.query.n) || 40;
    const result = fibonacci(n);
    res.send(`Enpoint bloqueado: ${result}`);
});

app.get('/cache', (req, res) => {
    const n = parseInt(req.query.n) || 40;

    if(cache.has(n)){
        return res.send(`Fibonacci ${n}: ${cache.get(n)}`);
    }else{
        const result = fibonacci(n);
        cache.set(n, result);
        res.send(`Fibonacci ${n}: ${result}`);
    }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));