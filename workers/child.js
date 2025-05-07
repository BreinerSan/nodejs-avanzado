process.on('message', (n) => {
    const result = fibonacci(n);
    process.send(result);
});

function fibonacci(n) {
    if (n < 2) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

process.on('error', (error) => {
    process.send({ error: error.message });
});