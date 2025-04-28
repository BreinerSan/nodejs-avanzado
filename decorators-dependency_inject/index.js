class DataService {
    processData(data) {
        return data.map(d => d * 2);
    }
}

// Decorar DataService
class DataServiceWithLogin {
    constructor(dataService, logger) {
        this.dataService = dataService;
        this.logger = logger;
    }

    processData(data) {
        this.logger.log('Processing data...');
        const resultado = this.dataService.processData(data);
        this.logger.log('Data finished processing.');
        return resultado;
    }
}

class Logger {
    log(message) {
        console.log('[Logger] ' + message);
    }
}

const baseService = new DataService();
const logger = new Logger();
const decorateService = new DataServiceWithLogin(baseService, logger);

const inputData = [1, 2, 3];
const processData = decorateService.processData(inputData);

console.log('Resultado procesado', processData);
