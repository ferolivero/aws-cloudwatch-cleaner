const chalk = require('chalk');

class Printer {
    _printStatus(err) {
        err ? console.log(chalk.bold.red('Error'), err) :
            console.log(chalk.bold.green('Resultado Exitoso'));
    }
    printReport(response) {
        console.log('------------------------------------------');
        console.log(chalk.bold.white('PROCESO FINALIZADO'));
        this._printStatus(response.err);
        console.log('------------------------------------------');
        console.log(chalk.bold.blue('Ignorados: '), response.ignored);
        console.log('------------------------------------------');
        console.log(chalk.bold.blue('Removidos: '), response.removed);
        console.log('------------------------------------------');
        console.log(chalk.bold.blue.bold('Totales: '), response.total);
        console.log(chalk.bold.blue('Bytes removidos: '), response.bytesRemoved);
        console.log('------------------------------------------');
        console.log(chalk.bold.blue.bold('Ultimo removido: '), response.nextToken);
    }
}

module.exports = Printer;
