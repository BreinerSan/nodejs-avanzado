const tarea1 = () => new Promise(resolve => {
    setTimeout(() => {
        resolve('Tarea 1');
    }, 1000);
})

const tarea2 = () => new Promise(resolve => {
    setTimeout(() => {
        resolve('Tarea 2');
    }, 1500);
})

const tarea3 = () => new Promise(resolve => {
    setTimeout(() => {
        resolve('Tarea 3');
    }, 2000);
})

Promise.all([tarea1(), tarea2(), tarea3()])
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    })