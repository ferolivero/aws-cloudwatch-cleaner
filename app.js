#!/usr/bin/env node

process.env.LOG_LEVEL = 'debug';
process.env.NODE_ENV = 'LOCAL';
const { Program, Printer, shouldRemove } = require('./core');
const programArguments = new Program().getArguments();
const { RemoveLogsService } = require('./services');
console.log(programArguments);

const run = async (config) => {
    let result;
    const removeLogsService = new RemoveLogsService(config);
    try {
        result = await removeLogsService.run();
        if (!config.force) {
            if (await shouldRemove(removeLogsService.logsToRemove)) {
                await removeLogsService.removeLogs();
            }
        }
    } catch (err) {
        console.error(err);
    } finally {
        const printer = new Printer();
        printer.printReport(result);
    }
};

run(programArguments);
