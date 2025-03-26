'use client';

import Image from 'next/image';
import { toast } from 'sonner';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    stock: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
    });
    
    toast.success(`Added ${product.name} to cart`);
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-gray-500 line-clamp-2 mb-2">{product.description}</p>
        <p className="font-bold">${product.price.toFixed(2)}</p>
        <p className="text-xs text-gray-500 mt-1">
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart} 
          disabled={product.stock <= 0}
          className="w-full"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
