import { APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

// Initialize AWS SDK clients
export const dynamoDB = new AWS.DynamoDB.DocumentClient();
export const eventBridge = new AWS.EventBridge();
export const stepFunctions = new AWS.StepFunctions();
export const sqs = new AWS.SQS();

// Helper for generating unique IDs
export const generateId = (): string => {
  return uuidv4();
};

// Helper for formatting API responses
export const formatResponse = (
  statusCode: number,
  body: any,
  allowCORS = true
): APIGatewayProxyResult => {
  const response: APIGatewayProxyResult = {
    statusCode,
    body: JSON.stringify(body),
  };

  if (allowCORS) {
    response.headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    };
  }

  return response;
};

// Helper for publishing events to EventBridge
export const publishEvent = async (
  source: string,
  detailType: string,
  detail: any,
  eventBusName: string
): Promise<AWS.EventBridge.PutEventsResponse> => {
  const params: AWS.EventBridge.PutEventsRequest = {
    Entries: [
      {
        Source: source,
        DetailType: detailType,
        Detail: JSON.stringify(detail),
        EventBusName: eventBusName,
      },
    ],
  };

  return eventBridge.putEvents(params).promise();
};

// Helper for starting Step Functions execution
export const startStepFunctionExecution = async (
  stateMachineArn: string,
  input: any,
  name?: string
): Promise<AWS.StepFunctions.StartExecutionOutput> => {
  const params: AWS.StepFunctions.StartExecutionInput = {
    stateMachineArn,
    input: JSON.stringify(input),
    name: name || `execution-${generateId()}`,
  };

  return stepFunctions.startExecution(params).promise();
};

// Helper for sending messages to SQS
export const sendToSQS = async (
  queueUrl: string,
  messageBody: any
): Promise<AWS.SQS.SendMessageResult> => {
  const params: AWS.SQS.SendMessageRequest = {
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(messageBody),
  };

  return sqs.sendMessage(params).promise();
};

// Helper for error handling
export const handleError = (error: any): APIGatewayProxyResult => {
  console.error('Error:', error);

  return formatResponse(
    error.statusCode || 500,
    {
      message: error.message || 'Internal Server Error',
    }
  );
};

// Helper for validating request body
export const validateRequestBody = <T>(body: any, requiredFields: string[]): T => {
  if (!body) {
    throw {
      statusCode: 400,
      message: 'Missing request body',
    };
  }

  for (const field of requiredFields) {
    if (body[field] === undefined || body[field] === null) {
      throw {
        statusCode: 400,
        message: `Missing required field: ${field}`,
      };
    }
  }

  return body as T;
};
