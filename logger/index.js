const pino = require('pino');
const pretty = require('pino-pretty');
const isProduction = process.env.NODE_ENV === 'production';

const developmentConfig = {
    level: 'debug',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            ignore: 'pid,hostname',
            translateTime: 'SYS:dd-mm-yyyy hh:MM:ss.l-Z',
            levelFirst: true
        }
    }
};

const productionConfig = {
    level: 'info',
    transport: {
        target: 'pino/file',
        options: {
            destination: 'log.txt',
            translateTime: 'SYS:dd-mm-yyyy hh:MM:ss.l-Z',
            levelFirst: true
        }
    }
};

const config = isProduction ? productionConfig : developmentConfig;
const logger = pino(config);

function operacion(){
    // throw new Error('Operacion fallida');
    setInterval(() => {
        logger.debug('Realizando operacion');
    }, 1000);
}

process.on('uncaughtException', (err) => {
    // logger.log('Uncaught Exception thrown');
    // logger.log(err);
    logger.error('Error no capturado', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, p) => {
    // logger.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    logger.error('Rechazo no capturado', reason);
    process.exit(1);
});

const signals = ['SIGINT', 'SIGTERM', 'SIGUSR1', 'SIGUSR2'];	

signals.forEach(signal => {
    process.on(signal, () => {
        logger.info('Recibido', signal);
        process.exit(0);
    })
})

operacion();