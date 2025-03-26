export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export enum OrderStatus {
  CREATED = 'CREATED',
  PROCESSING = 'PROCESSING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

// Event types
export interface OrderCreatedEvent {
  source: string;
  'detail-type': string;
  detail: {
    orderId: string;
    customerId: string;
    customerEmail: string;
    status: OrderStatus;
    timestamp: string;
  };
}

export interface OrderNotificationEvent {
  orderId: string;
  customerEmail: string;
  status: OrderStatus;
}
