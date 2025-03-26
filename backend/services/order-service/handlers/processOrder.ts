import { EventBridgeHandler } from 'aws-lambda';
import { 
  dynamoDB, 
  handleError, 
  publishEvent 
} from '../../../lib/common/utils';
import { OrderStatus } from '../../../lib/common/types';
import { 
  ORDER_PROCESSED, 
  ORDER_SERVICE, 
  OrderCreatedEventDetail 
} from '../../../events/orderEvents';

export const handler: EventBridgeHandler<string, OrderCreatedEventDetail, void> = async (event) => {
  try {
    const { orderId, customerId, customerEmail } = event.detail;
    const timestamp = new Date().toISOString();

    // Update order status to PROCESSING
    const updateParams = {
      TableName: process.env.ORDER_TABLE!,
      Key: { id: orderId },
      UpdateExpression: 'set #status = :status, updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':status': OrderStatus.PROCESSING,
        ':updatedAt': timestamp,
      },
      ReturnValues: 'ALL_NEW',
    };

    const updatedOrder = await dynamoDB.update(updateParams).promise();

    // Publish OrderProcessed event
    const eventDetail = {
      orderId,
      status: OrderStatus.PROCESSING,
      timestamp,
    };

    await publishEvent(
      ORDER_SERVICE,
      ORDER_PROCESSED,
      eventDetail,
      process.env.ORDER_EVENTS_BUS!
    );

    // In a real-world scenario, we would perform additional processing here
    // such as inventory checks, payment processing, etc.

    // For demo purposes, we'll just return the updated order
    return updatedOrder.Attributes;
  } catch (error) {
    console.error('Error processing order:', error);
    throw error;
  }
};
