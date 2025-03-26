import { APIGatewayProxyHandler } from 'aws-lambda';
import { 
  dynamoDB, 
  formatResponse, 
  handleError, 
  generateId, 
  validateRequestBody 
} from '../../../lib/common/utils';
import { Product } from '../../../lib/common/types';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.body) {
      return formatResponse(400, {
        message: 'Missing request body',
      });
    }

    const requestBody = JSON.parse(event.body);
    const requiredFields = ['name', 'description', 'price', 'imageUrl', 'stock'];
    
    try {
      validateRequestBody<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>(
        requestBody, 
        requiredFields
      );
    } catch (validationError: any) {
      return formatResponse(validationError.statusCode, {
        message: validationError.message,
      });
    }

    const timestamp = new Date().toISOString();
    const product: Product = {
      id: generateId(),
      name: requestBody.name,
      description: requestBody.description,
      price: requestBody.price,
      imageUrl: requestBody.imageUrl,
      stock: requestBody.stock,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    const params = {
      TableName: process.env.PRODUCT_TABLE!,
      Item: product,
    };

    await dynamoDB.put(params).promise();

    return formatResponse(201, product);
  } catch (error) {
    return handleError(error);
  }
};
