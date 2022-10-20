#!/usr/bin/env node

const { Command } = require('commander');

class Program {
    constructor() {
        this.program = new Command();
        this.selectedArguments = null;
        this._config();
    }

    _config() {
        this.program.version('0.0.1');

        this.program
            .option('-d, --delete', 'elimina los logstream')
            .option('-f, --force', 'No pide confirmación al eliminar')
            .option('-i, --init <logGroupName>', 'a partir de que log stream arrancar, es el último removido')
            .option('-l, --limit <cantidad>', 'limite de logs groups a evaluar')
            .option('-m --month <number>', 'Los meses a partir del cual eliminar los logs')
            .option('-p, --profile <profileName>', 'El perfil definido en las credenciales de AWS')
            .option('-r --region <region>', 'La region de AWS')
            .option('-s, --silent', 'silencia los logs');

        this.program.parse(process.argv);
    }

    _assignArgument(argument, defaultValue) {
        const value = this.program[argument] || defaultValue;
        if (value) {
            this.selectedArguments = {
                ...this.selectedArguments,
                ...{
                    [`${argument}`]: value
                }
            };
        }
    }

    getArguments() {
        const defaultMonth = 2;
        this._assignArgument('delete');
        this._assignArgument('silent');
        this._assignArgument('init');
        this._assignArgument('force');
        this._assignArgument('limit');
        this._assignArgument('profile');
        this._assignArgument('region');
        this._assignArgument('month', defaultMonth);
        return this.selectedArguments;
    }
};

module.exports = Program;
