const AWS = require('aws-sdk');

class CloudwatchClient {
    constructor(config) {
        this.fromLogGroup = config.init;
        this.limit = parseInt(config.limit);
        this.proccessedLogs = 0;
        this.generateClient(config);
    }

    generateClient({ profile, region }) {
        if (profile) {
            const credentials = new AWS.SharedIniFileCredentials({
                profile
            });
            AWS.config.credentials = credentials;
        }
        if (region) {
            AWS.config.region = region;
        }
        this.cloudwatchlogs = new AWS.CloudWatchLogs();
    }

    async describeLogGroups() {
        const params = {
            ...this.fromLogGroup && { nextToken: this.fromLogGroup },
            ...this.limit && { limit: this.limit }
        };
        return this.cloudwatchlogs.describeLogGroups(params).promise();
    }

    async deleteLogStream(logGroupName, logStreamName) {
        const params = {
            logGroupName,
            logStreamName
        };
        return this.cloudwatchlogs.deleteLogStream(params).promise();
    }

    async getLogsEvents(logGroupName, logStreamName) {
        const params = {
            logGroupName,
            logStreamName,
        };
        return this.cloudwatchlogs.getLogEvents(params).promise();
    }

    async describeLogStreams(logGroupName, nextToken) {
        const params = {
            logGroupName,
            ...nextToken && { nextToken }
        };
        return this.cloudwatchlogs.describeLogStreams(params).promise();
    }

    async foreachLogStream(logGroupName, functionToExecute) {
        let data;
        let nextToken;
        do {
            data = await this.describeLogStreams(logGroupName, nextToken);
            await this._foreachAsync(data.logStreams, functionToExecute);
            nextToken = data.nextToken;
        } while (nextToken);
    }

    async foreachLogGroup(functionToExecute) {
        let data;
        do {
            data = await this.describeLogGroups();
            await this._foreachAsync(data.logGroups, functionToExecute, data.nextToken);
            this.fromLogGroup = data.nextToken;
            this.proccessedLogs += data.logGroups.length;
        } while (this._validLimit() && data.nextToken);
    }

    _validLimit() {
        return this.limit ? this.proccessedLogs < this.limit : true;
    }

    async _foreachAsync(items, callback, nextToken) {
        for (let index = 0; index < items.length; index++) {
            await callback(items[index], nextToken);
        }
    }
}

module.exports = CloudwatchClient;
