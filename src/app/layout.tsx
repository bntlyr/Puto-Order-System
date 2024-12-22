'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { OrderProvider } from './contexts/OrderContext'
import BottomNav from '@/components/BottomNav'
import FloatingActionButton from '@/components/FloatingActionButton'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <OrderProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow pb-16">
              {children}
            </main>
            <FloatingActionButton />
            <BottomNav />
          </div>
        </OrderProvider>
      </body>
    </html>
  )
}

