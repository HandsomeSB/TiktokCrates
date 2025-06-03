import React from 'react';
import { useInventory } from '../context/InventoryContext';
import { Rarity } from '../types';
import { RARITY_COLORS, RARITY_NAMES } from '../constants';
import { BarChart, Database } from 'lucide-react';

const StatsDisplay: React.FC = () => {
  const { inventory } = useInventory();
  
  // Calculate stats
  const totalOpened = inventory.length;
  
  const countByRarity: Record<Rarity, number> = {
    common: 0,
    uncommon: 0,
    rare: 0,
    epic: 0,
    legendary: 0
  };
  
  inventory.forEach(item => {
    countByRarity[item.rarity]++;
  });
  
  // Calculate percentages
  const percentageByRarity: Record<Rarity, string> = {
    common: '0%',
    uncommon: '0%',
    rare: '0%',
    epic: '0%',
    legendary: '0%'
  };
  
  if (totalOpened > 0) {
    Object.keys(countByRarity).forEach(rarity => {
      const r = rarity as Rarity;
      percentageByRarity[r] = `${((countByRarity[r] / totalOpened) * 100).toFixed(1)}%`;
    });
  }
  
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <BarChart className="text-blue-500" size={20} />
        <h2 className="text-lg font-bold text-white">Opening Statistics</h2>
      </div>
      
      <div className="flex items-center gap-2 mb-3">
        <Database className="text-gray-400" size={16} />
        <span className="text-gray-300 text-sm">Total Opened: {totalOpened}</span>
      </div>
      
      <div className="space-y-2 mt-4">
        {Object.keys(countByRarity).map(rarity => {
          const r = rarity as Rarity;
          const count = countByRarity[r];
          const percentage = percentageByRarity[r];
          const colorClass = RARITY_COLORS[r].split(' ')[0]; // Get just the bg color
          
          return (
            <div key={r} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${colorClass}`} />
              <span className="text-gray-300 text-sm min-w-24">{RARITY_NAMES[r]}:</span>
              <div className="flex-1 bg-gray-800 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${colorClass}`} 
                  style={{ width: percentage }}
                />
              </div>
              <span className="text-gray-400 text-xs ml-2 min-w-16">{count} ({percentage})</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsDisplay;