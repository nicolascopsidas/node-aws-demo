// API service for e-commerce application
import type { Product, Order, CreateOrderRequest } from '@/lib/types';
import { API_ENDPOINT } from '@/lib/amplify';

// Helper function to safely parse and validate API responses
function parseResponse<T>(data: unknown): T | null {
  if (!data) return null;
  return data as unknown as T;
}

// Helper function to safely parse array responses
function parseArrayResponse<T>(data: unknown): T[] {
  if (!data) return [];
  if (Array.isArray(data)) {
    return data as unknown as T[];
  }
  return [];
}

// Product API
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return parseArrayResponse<Product>(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProductById = async (productId: string): Promise<Product | null> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/products/${productId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const product = await response.json();
    return parseResponse<Product>(product);
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    return null;
  }
};

export const createProduct = async (productData: Omit<Product, 'id'>): Promise<Product | null> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const product = await response.json();
    return parseResponse<Product>(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
  }
};

// Order API
export const createOrder = async (orderData: CreateOrderRequest): Promise<Order | null> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const order = await response.json();
    return parseResponse<Order>(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return null;
  }
};

export const getOrders = async (customerId?: string): Promise<Order[]> => {
  try {
    const url = new URL(`${API_ENDPOINT}/orders`);
    if (customerId) {
      url.searchParams.append('customerId', customerId);
    }
    
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json();
    return parseArrayResponse<Order>(responseData);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

export const getOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/orders/${orderId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const order = await response.json();
    return parseResponse<Order>(order);
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    return null;
  }
};
