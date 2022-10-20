require('dotenv').config();
const { expect, assert } = require('chai');
const logGroupsMocks = require('../mocks/log-groups');
const logStreamsMocks = require('../mocks/log-streams');
const logEventsMocks = require('../mocks/log-streams');

const AWS = require('aws-sdk');
const AWSMock = require('aws-sdk-mock');

AWS.config.update({ region: 'us-east-1' });
AWSMock.setSDKInstance(AWS);
const { CloudwatchClient } = require('../../components');

describe('Test unitario cloudwatch client', async () => {
    beforeEach(() => {});

    afterEach(() => {
        AWSMock.restore();
    });

    it('should get log group', async () => {
        AWSMock.mock('CloudWatchLogs', 'describeLogGroups', logGroupsMocks.simpleLogGroup);
        const cloudwatchClient = new CloudwatchClient({ limit: 1 });
        const response = await cloudwatchClient.describeLogGroups();
        expect(response).to.deep.equal(logGroupsMocks.simpleLogGroup);
    });

    it('should get log stream', async () => {
        AWSMock.mock('CloudWatchLogs', 'describeLogStreams', logStreamsMocks.simpleLogStream);
        const cloudwatchClient = new CloudwatchClient({ limit: 1 });
        const response = await cloudwatchClient.describeLogStreams('log group test');
        expect(response).to.deep.eql(logStreamsMocks.simpleLogStream);
    });

    it('should count logs stream', async () => {
        AWSMock.mock('CloudWatchLogs', 'describeLogStreams', logStreamsMocks.simpleLogStream);
        const cloudwatchClient = new CloudwatchClient({ limit: 1 });
        let count = 0;
        await cloudwatchClient.foreachLogStream('logGroupTest', () => count++);
        expect(count).eql(3);
    });

    it('should count logs groups', async () => {
        AWSMock.mock('CloudWatchLogs', 'describeLogGroups', logGroupsMocks.simpleLogGroup);
        const cloudwatchClient = new CloudwatchClient({ limit: 1 });
        let count = 0;
        await cloudwatchClient.foreachLogGroup(() => count++);
        expect(count).eql(1);
    });

    it('should return log group event', async () => {
        AWSMock.mock('CloudWatchLogs', 'getLogEvents', logEventsMocks.simpleLogStream);
        const cloudwatchClient = new CloudwatchClient({ limit: 1 });
        const response = await cloudwatchClient.getLogsEvents('log groups', 'logstream');
        expect(response).eql(logEventsMocks.simpleLogStream);
    });

});
