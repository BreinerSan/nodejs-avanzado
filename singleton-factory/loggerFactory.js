const fs = require('fs');
const path = require('path');
const Logger = require('./logger.js');

const loggerInstance = new Logger();

class ConsoleLogger {
    constructor() {
        this.logger = loggerInstance;
    }

    log(message) {
        console.log('Usando ConsoleLogger');
        console.log(`ConsoleLogger: ${message}`);
        this.logger.log(message);
    }
}

class FileLogger {
    constructor(filepath = path.join(__dirname, 'log.txt')) {
        this.logger = loggerInstance;
        this.filepath = filepath;
    }

    log(message, level = 'info') {
        console.log('Usando FileLogger');
        console.log(`FileLogger: ${message}`);
        this.logger.log(message);

        // Escribir en el archivo
        const timestamp = new Date().toISOString();
        const formattedMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;

        fs.appendFileSync(this.filepath, formattedMessage, 'utf-8');
    }
}

class LoggerFactory {
    static createLogger(type){
        if(type === 'console') return new ConsoleLogger();
        if(type === 'file') return new FileLogger();
        throw new Error('Tipo de Logger no válido');
    }
}

module.exports = LoggerFactory;
