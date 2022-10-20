const figlet = require('figlet');
const chalk = require('chalk');
console.log(chalk.bold.cyan(figlet.textSync('cloudwatch', {
    font: 'ANSI Shadow',
    horizontalLayout: 'default',
    verticalLayout: 'default'
})));

console.log(chalk.bold.cyan(figlet.textSync('cleaner', {
    font: 'ANSI Shadow',
    horizontalLayout: 'default',
    verticalLayout: 'default'
})));
