import { APIGatewayProxyHandler } from 'aws-lambda';
import { 
  dynamoDB, 
  formatResponse, 
  handleError, 
  generateId, 
  validateRequestBody,
  publishEvent
} from '../../../lib/common/utils';
import { Order, OrderStatus } from '../../../lib/common/types';
import { ORDER_CREATED, ORDER_SERVICE, createOrderCreatedEvent } from '../../../events/orderEvents';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.body) {
      return formatResponse(400, {
        message: 'Missing request body',
      });
    }

    const requestBody = JSON.parse(event.body);
    const requiredFields = ['customerId', 'customerEmail', 'items'];
    
    try {
      validateRequestBody<Omit<Order, 'id' | 'status' | 'createdAt' | 'updatedAt'>>(
        requestBody, 
        requiredFields
      );
    } catch (validationError: any) {
      return formatResponse(validationError.statusCode, {
        message: validationError.message,
      });
    }

    // Calculate order total
    const total = requestBody.items.reduce(
      (sum: number, item: any) => sum + (item.price * item.quantity), 
      0
    );

    const timestamp = new Date().toISOString();
    const order: Order = {
      id: generateId(),
      customerId: requestBody.customerId,
      customerEmail: requestBody.customerEmail,
      items: requestBody.items,
      total,
      status: OrderStatus.CREATED,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    // Save order to DynamoDB
    const params = {
      TableName: process.env.ORDER_TABLE!,
      Item: order,
    };

    await dynamoDB.put(params).promise();

    // Publish OrderCreated event to EventBridge
    const eventDetail = {
      orderId: order.id,
      customerId: order.customerId,
      customerEmail: order.customerEmail,
      items: order.items,
      total: order.total,
      status: order.status,
      timestamp,
    };

    await publishEvent(
      ORDER_SERVICE,
      ORDER_CREATED,
      eventDetail,
      process.env.ORDER_EVENTS_BUS!
    );

    return formatResponse(201, order);
  } catch (error) {
    return handleError(error);
  }
};
