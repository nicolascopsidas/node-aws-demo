import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import AmplifyClientInitializer from "@/components/AmplifyClientInitializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-commerce Demo | AWS Serverless",
  description: "Event-driven e-commerce demo using AWS Serverless architecture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AmplifyClientInitializer>
          <CartProvider>
            <Toaster position="top-right" richColors />
            {children}
          </CartProvider>
        </AmplifyClientInitializer>
      </body>
    </html>
  );
}
