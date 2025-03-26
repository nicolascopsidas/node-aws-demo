import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/services/api';

// Fallback mock data in case API fails
const fallbackProducts = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    stock: 15
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Fitness tracker with heart rate monitoring and sleep analysis.',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    stock: 8
  },
  {
    id: '3',
    name: 'Wireless Earbuds',
    description: 'True wireless earbuds with active noise cancellation and water resistance.',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    stock: 20
  },
  {
    id: '4',
    name: 'Smartphone',
    description: 'Latest model with high-resolution camera and all-day battery life.',
    price: 899.99,
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    stock: 5
  },
  {
    id: '5',
    name: 'Laptop',
    description: 'Powerful laptop for work and entertainment with fast processor.',
    price: 1299.99,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    stock: 3
  },
  {
    id: '6',
    name: 'Bluetooth Speaker',
    description: 'Portable speaker with 360-degree sound and 12-hour playtime.',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    stock: 12
  }
];

export default async function Home() {
  // Fetch products from the API
  const products = await getProducts();
  
  // Use fallback data if API call fails or returns empty array
  const displayProducts = products.length > 0 ? products : fallbackProducts;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>AWS E-commerce Demo - Event-driven microservices with serverless architecture</p>
        </div>
      </footer>
    </div>
  );
}
