'use client';

import { Plus } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface FloatingActionButtonProps {
  onClick?: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick(); // This will handle the onClick directly
      return;
    }

    switch (pathname) {
      case '/orders':
        // Trigger the dialog directly in the Orders page
        document.querySelector<HTMLButtonElement>('[data-add-order-trigger]')?.click();
        break;
      case '/items':
        // Handle item page click
        document.querySelector<HTMLButtonElement>('[data-add-item-trigger]')?.click();
        break;
      default:
        router.push('/orders');
    }
  };

  if (pathname === '/') return null; // Don't render FAB on homepage

  return (
    <button
      onClick={handleClick}
      className="fixed right-4 bottom-24 w-12 h-12 bg-[#53B7D2] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[#53B7D2]/90 transition-colors"
    >
      <Plus className="w-6 h-6" />
    </button>
  );
};

export default FloatingActionButton;
