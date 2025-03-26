import { OrderStatus } from '../lib/common/types';

// Event detail types
export const ORDER_CREATED = 'OrderCreated';
export const ORDER_PROCESSED = 'OrderProcessed';
export const ORDER_CONFIRMED = 'OrderConfirmed';

// Event sources
export const ORDER_SERVICE = 'order-service';
export const NOTIFICATION_SERVICE = 'notification-service';

// Event interfaces
export interface OrderCreatedEventDetail {
  orderId: string;
  customerId: string;
  customerEmail: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: OrderStatus;
  timestamp: string;
}

export interface OrderProcessedEventDetail {
  orderId: string;
  status: OrderStatus;
  timestamp: string;
}

export interface OrderConfirmedEventDetail {
  orderId: string;
  customerEmail: string;
  status: OrderStatus;
  timestamp: string;
}

// Helper functions to create event payloads
export const createOrderCreatedEvent = (detail: OrderCreatedEventDetail) => {
  return {
    Source: ORDER_SERVICE,
    DetailType: ORDER_CREATED,
    Detail: JSON.stringify(detail),
  };
};

export const createOrderProcessedEvent = (detail: OrderProcessedEventDetail) => {
  return {
    Source: ORDER_SERVICE,
    DetailType: ORDER_PROCESSED,
    Detail: JSON.stringify(detail),
  };
};

export const createOrderConfirmedEvent = (detail: OrderConfirmedEventDetail) => {
  return {
    Source: NOTIFICATION_SERVICE,
    DetailType: ORDER_CONFIRMED,
    Detail: JSON.stringify(detail),
  };
};
