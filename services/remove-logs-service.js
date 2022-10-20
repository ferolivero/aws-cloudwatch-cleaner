process.env.LOG_LEVEL = 'debug';
const dayjs = require('dayjs');
const { Output } = require('../models');
const { CloudwatchClient } = require('../components');

class RemoveLogsService {
    constructor(config) {
        this.setupConfig(config);
        this.cloudwatchClient = new CloudwatchClient(this.config);
    }

    setupConfig(config) {
        this.config = config;
        this.logsToRemove = [];
        this.output = new Output();
    }

    async run() {
        try {
            await this.cloudwatchClient.foreachLogGroup(async (logGroup, nextToken) => {
                this.output.nextToken = nextToken;
                console.debug(`Procesando logGroup ${logGroup.logGroupName}`);
                await this.cloudwatchClient.foreachLogStream(logGroup.logGroupName, async logStream => {
                    await this._removeLogs(logGroup, logStream);
                });
            });
            return this.output;
        } catch (err) {
            console.error(err);
            this.output.err = err.message;
            return this.output;
        }
    }

    async _removeLogs(logGroup, logStream) {
        this.output.total += 1;
        const now = dayjs();
        const diff = now.diff(dayjs(new Date(logStream.lastIngestionTime)), 'month');
        if (parseInt(diff) >= parseInt(this.config.month)) {
            await this._removeLog(logGroup, logStream);
        } else {
            this._ignoreLog(logStream);
        }
    }

    _ignoreLog(logStream) {
        if (!this.config.silent) {
            console.debug(`IGNORE ${logStream.logStreamName}`);
        }
        this.output.ignored += 1;
    }

    async _removeLog({ logGroupName }, { logStreamName, storedBytes }) {
        if (this.config.force) {
            console.debug(`REMOVE ${logStreamName}`);
            await this.cloudwatchClient.deleteLogStream(logGroupName, logStreamName);
            this.output.removed += 1;
            this.output.bytesRemoved += storedBytes;
        } else {
            this.logsToRemove.push({ logGroupName, logStreamName, storedBytes });
        }
    }

    async removeLogs() {
        for (const { logGroupName, logStreamName, storedBytes } of this.logsToRemove) {
            await this.cloudwatchClient.deleteLogStream(logGroupName, logStreamName);
            console.debug(`REMOVE ${logStreamName}`);
            this.output.removed += 1;
            this.output.bytesRemoved += storedBytes;
        }
    }
}

module.exports = RemoveLogsService;
