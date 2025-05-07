const { parentPort, workerData } = require('node:worker_threads');

function fibonacci(n) {
    if (n < 2) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(workerData);

parentPort.postMessage(result);

parentPort.on('error', (error) => {
    parentPort.postMessage({ error: error.message });
});