import React from 'react';
import { useInventory } from '../context/InventoryContext';
import VideoCard from './VideoCard';
import { Trash2 } from 'lucide-react';

const InventoryList: React.FC = () => {
  const { inventory, clearInventory } = useInventory();
  
  // Format date
  const formatDate = (date: Date): string => {
    const d = new Date(date);
    return d.toLocaleString();
  };
  
  if (inventory.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p>Your inventory is empty. Open some crates to get TikTok videos!</p>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Your Inventory ({inventory.length})</h2>
        {inventory.length > 0 && (
          <button
            onClick={clearInventory}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
          >
            <Trash2 size={14} />
            Clear All
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {inventory.map((item, index) => (
          <div key={`${item.video.id}-${index}`} className="flex flex-col">
            <VideoCard video={item.video} rarity={item.rarity} />
            <div className="text-xs text-gray-500 mt-1">
              Opened: {formatDate(new Date(item.openedAt))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryList;