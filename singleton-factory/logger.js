class Logger {
    constructor() {
        if(!Logger.instance) {
            Logger.instance = this;
        }
        
        // Creo una instancia de logs especificos 
        this.logs = [];
        return Logger.instance;
    }

    log(message){
        const timestamp = new Date().toISOString();
        this.logs.push(`${timestamp}: ${message}`);
    }

    getLogs() {
        return this.logs;
    }
}

module.exports = Logger;