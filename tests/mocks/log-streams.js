const deletedSimpleLogStream = {
    logStreamName: '2020/01/29/[$LATEST]26fdb04684d04eb9a608aba346b118d1',
    creationTime: 1580330057779,
    firstEventTimestamp: 1580330058666,
    lastEventTimestamp: 1580330405245,
    lastIngestionTime: new Date(2018, 2, 1).getTime(),
    uploadSequenceToken: '49597322667547142137939380752775454313135946154373280594',
    arn: 'arn:aws:logs:us-east-1:528529065360:log-group:/aws/lambda/dev-ID-BACKOFFICE-BE-GET-Fotos:log-stream:2020/01/29/[$LATEST]26fdb04684d04eb9a608aba346b118d1',
    storedBytes: 12
};

const simpleLogStream = {
    logStreams: [
    {
        logStreamName: '2020/01/29/[$LATEST]26fdb04684d04eb9a608aba346b118d1',
        creationTime: 1580330057779,
        firstEventTimestamp: 1580330058666,
        lastEventTimestamp: 1580330405245,
        lastIngestionTime: new Date(2018, 2, 1).getTime(),
        uploadSequenceToken: '49597322667547142137939380752775454313135946154373280594',
        arn: 'arn:aws:logs:us-east-1:528529065360:log-group:/aws/lambda/dev-ID-BACKOFFICE-BE-GET-Fotos:log-stream:2020/01/29/[$LATEST]26fdb04684d04eb9a608aba346b118d1',
        storedBytes: 12
    },
    {
        logStreamName: '2020/01/29/[$LATEST]26fdb04684d04eb9a608aba346b118d2',
        creationTime: 1580330057779,
        firstEventTimestamp: 1580330058666,
        lastEventTimestamp: 1580330405245,
        lastIngestionTime: new Date().getTime(),
        uploadSequenceToken: '49597322667547142137939380752775454313135946154373280594',
        arn: 'arn:aws:logs:us-east-1:528529065360:log-group:/aws/lambda/dev-ID-BACKOFFICE-BE-GET-Fotos:log-stream:2020/01/29/[$LATEST]26fdb04684d04eb9a608aba346b118d2',
        storedBytes: 0
    },
    {
        logStreamName: '2020/01/29/[$LATEST]26fdb04684d04eb9a608aba346b118d3',
        creationTime: 1580330057779,
        firstEventTimestamp: 1580330058666,
        lastEventTimestamp: 1580330405245,
        lastIngestionTime: new Date().getTime(),
        uploadSequenceToken: '49597322667547142137939380752775454313135946154373280594',
        arn: 'arn:aws:logs:us-east-1:528529065360:log-group:/aws/lambda/dev-ID-BACKOFFICE-BE-GET-Fotos:log-stream:2020/01/29/[$LATEST]26fdb04684d04eb9a608aba346b118d3',
        storedBytes: 0
    }]
};

const logStreamsFirstLogGroupPageOne = {
    logStreams: [
        {
            logStreamName: '2020/01/29/[$LATEST]26fdb04684d04eb9a608aba346b118d1',
            creationTime: 1580330057779,
            firstEventTimestamp: 1580330058666,
            lastEventTimestamp: 1580330405245,
            lastIngestionTime: new Date().getTime(),
            uploadSequenceToken: '49597322667547142137939380752775454313135946154373280594',
            arn: 'arn:aws:logs:us-east-1:528529065360:log-group:/aws/apigateway/welcome:log-stream:2020/01/29/[$LATEST]26fdb04684d04eb9a608aba346b118d1',
            storedBytes: 2314
        },
        {
            logStreamName: '2020/01/29/[$LATEST]26fdb04684d04eb9a608aba346b118d2',
            creationTime: 1580333464082,
            firstEventTimestamp: 1580333464915,
            lastEventTimestamp: 1580333466490,
            lastIngestionTime: new Date().getTime(),
            uploadSequenceToken: '49603724420954523737123882009479128293503397857610405058',
            arn: 'arn:aws:logs:us-east-1:528529065360:log-group:/aws/apigateway/welcome:log-stream:2020/01/29/[$LATEST]59c527614715431189d0693b84109b08',
            storedBytes: 0
        }]
};

const logStreamsTestException = {
    logStreams: [
        {
            logStreamName: '2020/01/29/[$LATEST]26fdb04684d04eb9a608aba346b118d1',
            creationTime: 1580330057779,
            firstEventTimestamp: 1580330058666,
            lastEventTimestamp: 1580330405245,
            lastIngestionTime: new Date().getTime(),
            uploadSequenceToken: '49597322667547142137939380752775454313135946154373280594',
            arn: 'arn:aws:logs:us-east-1:528529065360:log-group:/aws/apigateway/welcome:log-stream:2020/01/29/[$LATEST]26fdb04684d04eb9a608aba346b118d1',
            storedBytes: 2314
        },
        {
            logStreamName: '2020/01/29/[$LATEST]26fdb04684d04eb9a608aba346b118d2',
            creationTime: 1580333464082,
            firstEventTimestamp: 1580333464915,
            lastEventTimestamp: 1580333466490,
            lastIngestionTime: new Date(2018, 2, 1).getTime(),
            uploadSequenceToken: '49603724420954523737123882009479128293503397857610405058',
            arn: 'arn:aws:logs:us-east-1:528529065360:log-group:/aws/apigateway/welcome:log-stream:2020/01/29/[$LATEST]59c527614715431189d0693b84109b08',
            storedBytes: 0
        }]
};

const logStreamsSecondLogGroupPageOne = {
    logStreams: [{
        logStreamName: '2018/02/01/[$LATEST]26fdb04684d04eb9a608aba346b118d3',
        creationTime: 1583858566156,
        firstEventTimestamp: 1583858567151,
        lastEventTimestamp: 1583858588159,
        lastIngestionTime: new Date(2018, 2, 1).getTime(),
        uploadSequenceToken: '49600613916827660114759559493715453833312608224773854066',
        arn: 'arn:aws:logs:us-east-1:528529065360:log-group:/aws/lambda/IdentidadDigitalSendToBucket:log-stream:2020/03/10/[$LATEST]eac09adbc9d44377b2cab20be10fc5ac',
        storedBytes: 1234
    },
    {
        logStreamName: '2018/02/01/[$LATEST]26fdb04684d04eb9a608aba346b118d4',
        creationTime: 1584043231001,
        firstEventTimestamp: 1584043231985,
        lastEventTimestamp: 1584043750216,
        lastIngestionTime: new Date(2018, 2, 1).getTime(),
        uploadSequenceToken: '49602087191251388773977907114832928764900283402674293202',
        arn: 'arn:aws:logs:us-east-1:528529065360:log-group:/aws/lambda/IdentidadDigitalSendToBucket:log-stream:2020/03/12/[$LATEST]2f0053c1dba4495e9c25201a57ff9c3c',
        storedBytes: 0
    },
    {
        logStreamName: '2020/01/29/[$LATEST]26fdb04684d04eb9a608aba346b118d5',
        creationTime: 1584044671061,
        firstEventTimestamp: 1584044671985,
        lastEventTimestamp: 1584045401863,
        lastIngestionTime: new Date().getTime(),
        uploadSequenceToken: '49598256605852091739944488983213644381129977238215094514',
        arn: 'arn:aws:logs:us-east-1:528529065360:/aws/lambda/IdentidadDigitalSendToBucket:log-stream:2020/03/12/[$LATEST]3821744d0a37481db685b5c1a58fd1d9',
        storedBytes: 0
    }]
};

module.exports = {
    simpleLogStream,
    logStreamsFirstLogGroupPageOne,
    logStreamsSecondLogGroupPageOne,
    logStreamsTestException,
    deletedSimpleLogStream
};
