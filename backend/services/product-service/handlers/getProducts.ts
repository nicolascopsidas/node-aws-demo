import { APIGatewayProxyHandler } from 'aws-lambda';
import { dynamoDB, formatResponse, handleError } from '../../../lib/common/utils';

export const handler: APIGatewayProxyHandler = async () => {
  try {
    const params = {
      TableName: process.env.PRODUCT_TABLE!,
    };

    const result = await dynamoDB.scan(params).promise();

    return formatResponse(200, {
      products: result.Items,
      count: result.Count,
    });
  } catch (error) {
    return handleError(error);
  }
};
