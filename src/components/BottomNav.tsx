'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Package, ClipboardList } from 'lucide-react'

const BottomNav = () => {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
      <div className="flex justify-around items-center h-16">
        <Link 
          href="/" 
          className={`flex flex-col items-center space-y-1 text-sm ${
            pathname === '/' ? 'text-[#53B7D2]' : 'text-gray-500'
          }`}
        >
          <Home size={20} />
          <span className="text-xs">Home</span>
        </Link>
        <Link 
          href="/orders" 
          className={`flex flex-col items-center space-y-1 text-sm ${
            pathname === '/orders' ? 'text-[#53B7D2]' : 'text-gray-500'
          }`}
        >
          <ClipboardList size={20} />
          <span className="text-xs">Orders</span>
        </Link>
        <Link 
          href="/items" 
          className={`flex flex-col items-center space-y-1 text-sm ${
            pathname === '/items' ? 'text-[#53B7D2]' : 'text-gray-500'
          }`}
        >
          <Package size={20} />
          <span className="text-xs">Items</span>
        </Link>
      </div>
    </nav>
  )
}

export default BottomNav

