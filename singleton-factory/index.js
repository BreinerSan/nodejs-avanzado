const LoggerFactory = require('./loggerFactory.js');
const logger = require('./logger.js');

const loggerInstance = new logger();
const loggerConsole = LoggerFactory.createLogger('console');
const loggerFile = LoggerFactory.createLogger('file');

loggerConsole.log('Mensaje 2');
loggerFile.log('Mensaje 3');

loggerInstance.getLogs().forEach(log => console.log(log));