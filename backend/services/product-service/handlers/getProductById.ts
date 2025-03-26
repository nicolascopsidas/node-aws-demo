import { APIGatewayProxyHandler } from 'aws-lambda';
import { dynamoDB, formatResponse, handleError } from '../../../lib/common/utils';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const productId = event.pathParameters?.id;
    
    if (!productId) {
      return formatResponse(400, {
        message: 'Missing product ID',
      });
    }

    const params = {
      TableName: process.env.PRODUCT_TABLE!,
      Key: {
        id: productId,
      },
    };

    const result = await dynamoDB.get(params).promise();

    if (!result.Item) {
      return formatResponse(404, {
        message: `Product with ID ${productId} not found`,
      });
    }

    return formatResponse(200, result.Item);
  } catch (error) {
    return handleError(error);
  }
};
