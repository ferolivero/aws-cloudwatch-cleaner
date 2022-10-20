const simpleLogGroup = {
    logGroups: [{
        logGroupName: 'dev-ID-BACKOFFICE-BE-GET-Fotos',
        creationTime: 1584005465469,
        metricFilterCount: 0,
        arn: 'arn:aws:logs:us-east-1:528529065360:log-group:dev-ID-BACKOFFICE-BE-GET-Fotos:*',
        storedBytes: 109
    }]
};

const logGroupsPageOne = {
    logGroups: [{
        logGroupName: '/aws/apigateway/welcome',
        creationTime: 1578245465469,
        metricFilterCount: 0,
        arn: 'arn:aws:logs:us-east-1:528529065360:log-group:/aws/apigateway/welcome:*',
        storedBytes: 109
    }],
    nextToken: '/aws/apigateway/welcome'
};

const logGroupsPageTwo = {
    logGroups: [{
        logGroupName: '/aws/lambda/IdentidadDigitalSendToBucket',
        creationTime: 1582919148388,
        metricFilterCount: 0,
        arn: 'arn:aws:logs:us-east-1:528529065360:log-group:/aws/lambda/IdentidadDigitalSendToBucket:*',
        storedBytes: 1288
    }]
};

module.exports = {
    logGroupsPageOne,
    logGroupsPageTwo,
    simpleLogGroup
};
