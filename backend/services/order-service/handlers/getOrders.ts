import { APIGatewayProxyHandler } from 'aws-lambda';
import { dynamoDB, formatResponse, handleError } from '../../../lib/common/utils';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const customerId = event.queryStringParameters?.customerId;
    let params: any = {
      TableName: process.env.ORDER_TABLE!,
    };

    // If customerId is provided, filter orders by customer
    if (customerId) {
      params = {
        ...params,
        FilterExpression: 'customerId = :customerId',
        ExpressionAttributeValues: {
          ':customerId': customerId,
        },
      };
    }

    const result = await dynamoDB.scan(params).promise();

    return formatResponse(200, {
      orders: result.Items,
      count: result.Count,
    });
  } catch (error) {
    return handleError(error);
  }
};
