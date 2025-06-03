import React from 'react';
import { Package } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-6 flex items-center justify-between border-b border-gray-800">
      <div className="flex items-center gap-2">
        <Package className="text-amber-500" size={24} />
        <h1 className="text-xl font-bold text-white">TikTok Crates</h1>
      </div>
      <div className="text-gray-400 text-sm hidden md:block">
        Fry Your Brain
      </div>
    </header>
  );
};

export default Header;