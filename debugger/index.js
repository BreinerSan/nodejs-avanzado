function operacionCompleja() {
    console.time('Operacion compleja');
    console.log('Realizando operacion compleja')
    for (let i = 0; i < 100000; i++) {
        Math.sqrt(i);
    }
    console.timeEnd('Operacion compleja');
    console.trace('Fin de operacion compleja');
}

function operacionA (){
    operacionCompleja();
}

function procesoB (){
    operacionA();
}

procesoB();
