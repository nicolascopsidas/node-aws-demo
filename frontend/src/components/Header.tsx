'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { totalItems } = useCart();
  
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          AWS E-commerce Demo
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link href="/" className="hover:text-gray-600 transition-colors">
            Products
          </Link>
          <Link href="/orders" className="hover:text-gray-600 transition-colors">
            Orders
          </Link>
          <Link href="/cart">
            <Button variant="outline" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
