import { SQSHandler } from 'aws-lambda';
import { 
  publishEvent, 
  handleError 
} from '../../../lib/common/utils';
import { OrderStatus } from '../../../lib/common/types';
import { 
  NOTIFICATION_SERVICE, 
  ORDER_CONFIRMED, 
  createOrderConfirmedEvent 
} from '../../../events/orderEvents';

export const handler: SQSHandler = async (event) => {
  try {
    // Process each message from SQS
    for (const record of event.Records) {
      const messageBody = JSON.parse(record.body);
      const { orderId, customerEmail, status } = messageBody;
      
      console.log(`Sending order confirmation email to ${customerEmail} for order ${orderId}`);
      
      // In a real application, we would send an actual email here
      // For demo purposes, we'll just log the email details
      console.log('Email sent:', {
        to: customerEmail,
        subject: `Order Confirmation: ${orderId}`,
        body: `Your order ${orderId} has been ${status.toLowerCase()}. Thank you for your purchase!`,
      });
      
      // Publish OrderConfirmed event
      const timestamp = new Date().toISOString();
      const eventDetail = {
        orderId,
        customerEmail,
        status: OrderStatus.CONFIRMED,
        timestamp,
      };
      
      await publishEvent(
        NOTIFICATION_SERVICE,
        ORDER_CONFIRMED,
        eventDetail,
        process.env.ORDER_EVENTS_BUS!
      );
      
      console.log(`Published OrderConfirmed event for order ${orderId}`);
    }
  } catch (error) {
    console.error('Error sending order confirmation:', error);
    throw error;
  }
};
