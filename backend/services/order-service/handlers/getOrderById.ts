import { APIGatewayProxyHandler } from 'aws-lambda';
import { dynamoDB, formatResponse, handleError } from '../../../lib/common/utils';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const orderId = event.pathParameters?.id;
    
    if (!orderId) {
      return formatResponse(400, {
        message: 'Missing order ID',
      });
    }

    const params = {
      TableName: process.env.ORDER_TABLE!,
      Key: {
        id: orderId,
      },
    };

    const result = await dynamoDB.get(params).promise();

    if (!result.Item) {
      return formatResponse(404, {
        message: `Order with ID ${orderId} not found`,
      });
    }

    return formatResponse(200, result.Item);
  } catch (error) {
    return handleError(error);
  }
};
