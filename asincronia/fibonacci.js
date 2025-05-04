function* fubonacci() {
    let current = 0;
    let next = 1;
    while(true) {
        yield current;
        [current, next] = [next, current + next];
    }
}

const fib = fubonacci();

for(let i = 0; i < 10; i++) {
    console.log('Dentro del ciclo ' + fib.next().value);
}

console.log('Por fuera del ciclo ' + fib.next().value);
console.log('Por fuera del ciclo ' + fib.next().value);