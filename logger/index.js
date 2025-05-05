function operacion(){
    // throw new Error('Operacion fallida');
    setInterval(() => {
        console.log('Realizando operacion');
    }, 1000);
}

process.on('uncaughtException', (err) => {
    // console.log('Uncaught Exception thrown');
    // console.log(err);
    console.log('Error no capturado', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, p) => {
    // console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    console.log('Rechazo no capturado', reason);
    process.exit(1);
});

const signals = ['SIGINT', 'SIGTERM', 'SIGUSR1', 'SIGUSR2'];	

signals.forEach(signal => {
    process.on(signal, () => {
        console.log('Recibido', signal);
        process.exit(0);
    })
})

operacion();