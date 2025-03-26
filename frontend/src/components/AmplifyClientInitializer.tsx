'use client';

import { useEffect, useState } from 'react';
import { configureAmplify } from '@/lib/amplify';

interface AmplifyClientInitializerProps {
  children: React.ReactNode;
}

/**
 * This component initializes AWS Amplify on the client side
 * Next.js 13+ with app directory requires this approach to avoid SSR issues with Amplify
 */
export default function AmplifyClientInitializer({ children }: AmplifyClientInitializerProps) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize Amplify on the client side
    configureAmplify();
    setIsInitialized(true);
  }, []);

  // Show children only after Amplify is initialized
  if (!isInitialized) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}
