require('dotenv').config();
const { expect, assert } = require('chai');
const logGroupsMocks = require('../mocks/log-groups');
const logStreamsMocks = require('../mocks/log-streams');
const AWS = require('aws-sdk');
const AWSMock = require('aws-sdk-mock');

AWS.config.update({ region: 'us-east-1' });
AWSMock.setSDKInstance(AWS);
const { RemoveLogsService } = require('../../services');

const filterMocks = (logs, key) => {
    return logs.filter(log => log.message.messageToLog.includes(key));
};

describe('Test integración remove service', async () => {
    beforeEach(() => {
        global.winstonLogger = [];
    });

    afterEach(() => {
        AWSMock.restore();
    });

    it('Should remove 1 logs and ignore 2 in one page', async () => {
        AWSMock.mock('CloudWatchLogs', 'describeLogGroups', (params, callback) => {
            callback(null, logGroupsMocks.simpleLogGroup);
        });
        AWSMock.mock('CloudWatchLogs', 'describeLogStreams', (params, callback) => {
            callback(null, logStreamsMocks.simpleLogStream);
        });
        AWSMock.mock('CloudWatchLogs', 'deleteLogStream', (params, callback) => {
            callback(null, logStreamsMocks.simpleLogStream);
        });
        const response = await new RemoveLogsService({ limit: 1, force: true, month: 2 }).run();
        const logs = global.winstonLogger;
        const removeLogs = filterMocks(logs, 'REMOVE');
        const ignoreLogs = filterMocks(logs, 'IGNORE');

        expect(removeLogs.length).eql(1);
        assert(logs.some(log => log.message.messageToLog === '"REMOVE 2020/01/29/[$LATEST]26fdb04684d04eb9a608aba346b118d1"'));

        expect(ignoreLogs.length).eql(2);
        assert(logs.some(log => log.message.messageToLog === '"IGNORE 2020/01/29/[$LATEST]26fdb04684d04eb9a608aba346b118d2"'));
        assert(logs.some(log => log.message.messageToLog === '"IGNORE 2020/01/29/[$LATEST]26fdb04684d04eb9a608aba346b118d3"'));
        expect(response).eql({
            removed: 1,
            ignored: 2,
            bytesRemoved: 12,
            nextToken: undefined,
            total: 3
        });
    });

    it('Remove 2 items and ignore 3 with multiple loggroups and lougstream', async () => {
        AWSMock.mock('CloudWatchLogs', 'describeLogGroups', (params, callback) => {
            callback(null, logGroupsMocks.logGroupsPageOne);
            AWSMock.remock('CloudWatchLogs', 'describeLogGroups', logGroupsMocks.logGroupsPageTwo);
        });
        AWSMock.mock('CloudWatchLogs', 'describeLogStreams', (params, callback) => {
            callback(null, logStreamsMocks.logStreamsFirstLogGroupPageOne);
            AWSMock.remock('CloudWatchLogs', 'describeLogStreams', logStreamsMocks.logStreamsSecondLogGroupPageOne);
        });
        AWSMock.mock('CloudWatchLogs', 'deleteLogStream', (params, callback) => {
            callback(null, logStreamsMocks.simpleLogStream);
        });

        const response = await new RemoveLogsService({ limit: 2, force: true, month: 2 }).run();
        const logs = global.winstonLogger;
        const removeLogs = filterMocks(logs, 'REMOVE');
        const ignoreLogs = filterMocks(logs, 'IGNORE');

        expect(removeLogs.length).eql(2);
        assert(removeLogs.some(log => log.message.messageToLog === '"REMOVE 2018/02/01/[$LATEST]26fdb04684d04eb9a608aba346b118d3"'));
        assert(removeLogs.some(log => log.message.messageToLog === '"REMOVE 2018/02/01/[$LATEST]26fdb04684d04eb9a608aba346b118d4"'));
        expect(ignoreLogs.length).eql(3);
        assert(ignoreLogs.some(log => log.message.messageToLog === '"IGNORE 2020/01/29/[$LATEST]26fdb04684d04eb9a608aba346b118d1"'));
        assert(ignoreLogs.some(log => log.message.messageToLog === '"IGNORE 2020/01/29/[$LATEST]26fdb04684d04eb9a608aba346b118d2"'));
        assert(ignoreLogs.some(log => log.message.messageToLog === '"IGNORE 2020/01/29/[$LATEST]26fdb04684d04eb9a608aba346b118d5"'));
        expect(response).eql({
            removed: 2,
            ignored: 3,
            bytesRemoved: 1234,
            nextToken: undefined,
            total: 5
        });
    });

    it('Should Remove but doesnt Log anything', async () => {
        AWSMock.mock('CloudWatchLogs', 'describeLogGroups', (params, callback) => {
            callback(null, logGroupsMocks.logGroupsPageOne);
            AWSMock.remock('CloudWatchLogs', 'describeLogGroups', logGroupsMocks.logGroupsPageTwo);
        });
        AWSMock.mock('CloudWatchLogs', 'describeLogStreams', (params, callback) => {
            callback(null, logStreamsMocks.logStreamsFirstLogGroupPageOne);
            AWSMock.remock('CloudWatchLogs', 'describeLogStreams', logStreamsMocks.logStreamsSecondLogGroupPageOne);
        });
        AWSMock.mock('CloudWatchLogs', 'deleteLogStream', (params, callback) => {
            callback(null, logStreamsMocks.simpleLogStream);
        });

        const response = await new RemoveLogsService({ limit: 2, force: true, month: 2, silent: true }).run();
        const logs = global.winstonLogger;
        expect(logs).eql([]);
        expect(response).eql({
            removed: 2,
            ignored: 3,
            bytesRemoved: 1234,
            nextToken: undefined,
            total: 5
        });
    });

    it('Should return next token', async () => {
        AWSMock.mock('CloudWatchLogs', 'describeLogGroups', (params, callback) => {
            callback(null, logGroupsMocks.logGroupsPageOne);
        });
        AWSMock.mock('CloudWatchLogs', 'describeLogStreams', (params, callback) => {
            callback(null, logStreamsMocks.logStreamsFirstLogGroupPageOne);
        });
        AWSMock.mock('CloudWatchLogs', 'deleteLogStream', (params, callback) => {
            callback(null, logStreamsMocks.simpleLogStream);
        });

        const response = await new RemoveLogsService({ limit: 1, force: true, month: 2, silent: true }).run();
        const logs = global.winstonLogger;
        expect(response.nextToken).eql('/aws/apigateway/welcome');
    });

    it('Should doesnt remove all logs with month 0', async () => {
        AWSMock.mock('CloudWatchLogs', 'describeLogGroups', (params, callback) => {
            callback(null, logGroupsMocks.logGroupsPageOne);
        });
        AWSMock.mock('CloudWatchLogs', 'describeLogStreams', (params, callback) => {
            callback(null, logStreamsMocks.logStreamsFirstLogGroupPageOne);
        });
        AWSMock.mock('CloudWatchLogs', 'deleteLogStream', (params, callback) => {
            callback(null, logStreamsMocks.simpleLogStream);
        });

        const response = await new RemoveLogsService({ limit: 1, force: true, month: 0 }).run();
        const logs = global.winstonLogger;
        const removeLogs = filterMocks(logs, 'REMOVE');
        expect(removeLogs.length).eql(2);
        assert(removeLogs.some(log => log.message.messageToLog === '"REMOVE 2020/01/29/[$LATEST]26fdb04684d04eb9a608aba346b118d1"'));
        assert(removeLogs.some(log => log.message.messageToLog === '"REMOVE 2020/01/29/[$LATEST]26fdb04684d04eb9a608aba346b118d2"'));
        expect(response.nextToken).eql('/aws/apigateway/welcome');
        expect(response).eql({
            removed: 2,
            ignored: 0,
            bytesRemoved: 2314,
            nextToken: '/aws/apigateway/welcome',
            total: 2
        });
    });

    it('Should doesnt remove because force isnt activate', async () => {
        AWSMock.mock('CloudWatchLogs', 'describeLogGroups', (params, callback) => {
            callback(null, logGroupsMocks.logGroupsPageOne);
        });
        AWSMock.mock('CloudWatchLogs', 'describeLogStreams', (params, callback) => {
            callback(null, logStreamsMocks.logStreamsFirstLogGroupPageOne);
        });
        AWSMock.mock('CloudWatchLogs', 'deleteLogStream', (params, callback) => {
            callback(null, logStreamsMocks.simpleLogStream);
        });

        const response = await new RemoveLogsService({ limit: 1, force: false, month: 0 }).run();
        const logs = global.winstonLogger;
        const removeLogs = filterMocks(logs, 'REMOVE');
        expect(removeLogs.length).eql(0);
        expect(response).eql({
            removed: 0,
            ignored: 0,
            bytesRemoved: 0,
            nextToken: '/aws/apigateway/welcome',
            total: 2
        });
    });

    it('should returns 1 remove after produce error', async () => {
        AWSMock.mock('CloudWatchLogs', 'describeLogGroups', (params, callback) => {
            callback(null, logGroupsMocks.logGroupsPageOne);
        });
        AWSMock.mock('CloudWatchLogs', 'describeLogStreams', (params, callback) => {
            callback(null, logStreamsMocks.logStreamsTestException);
        });
        AWSMock.mock('CloudWatchLogs', 'deleteLogStream', (params, callback) => {
            const error = new Error('Delete Error');
            error.code = 'DELETE_ERROR';
            callback(error);
        });

        const response = await new RemoveLogsService({ limit: 1, force: true, month: 2 }).run();
        expect(response).to.deep.equal({
            'removed': 0,
            'ignored': 1,
            'total': 2,
            'bytesRemoved': 0,
            'nextToken': '/aws/apigateway/welcome',
            'err': 'Delete Error'
        });
    });

    it('Should remove all logs using function removelogs', async () => {
        AWSMock.mock('CloudWatchLogs', 'describeLogGroups', (params, callback) => {
            callback(null, logGroupsMocks.logGroupsPageOne);
        });
        AWSMock.mock('CloudWatchLogs', 'describeLogStreams', (params, callback) => {
            callback(null, logStreamsMocks.simpleLogStream);
        });
        AWSMock.mock('CloudWatchLogs', 'deleteLogStream', (params, callback) => {
            callback(null, logStreamsMocks.deletedSimpleLogStream);
        });
        const removeLogsService = new RemoveLogsService({ limit: 1, force: false, month: 2 });
        const response = await removeLogsService.run();
        await removeLogsService.removeLogs();
        const logs = global.winstonLogger;
        const removeLogs = filterMocks(logs, 'REMOVE');
        const ignoredLogs = filterMocks(logs, 'IGNORE');
        expect(removeLogs.length).eql(1);
        expect(ignoredLogs.length).eql(2);
        assert(removeLogs.some(log => log.message.messageToLog === '"REMOVE 2020/01/29/[$LATEST]26fdb04684d04eb9a608aba346b118d1"'));
        assert(ignoredLogs.some(log => log.message.messageToLog === '"IGNORE 2020/01/29/[$LATEST]26fdb04684d04eb9a608aba346b118d2"'));
        assert(ignoredLogs.some(log => log.message.messageToLog === '"IGNORE 2020/01/29/[$LATEST]26fdb04684d04eb9a608aba346b118d3"'));
        expect(response.nextToken).eql('/aws/apigateway/welcome');
        expect(response).eql({
            removed: 1,
            ignored: 2,
            bytesRemoved: 12,
            nextToken: '/aws/apigateway/welcome',
            total: 3
        });
    });
});
