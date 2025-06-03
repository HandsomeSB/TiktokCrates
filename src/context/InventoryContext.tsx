import React, { createContext, useContext, useState, useEffect } from 'react';
import { InventoryItem, TikTokVideo, Rarity } from '../types';

interface InventoryContextType {
  inventory: InventoryItem[];
  addToInventory: (video: TikTokVideo, rarity: Rarity) => void;
  clearInventory: () => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state directly from localStorage
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    if (typeof window === 'undefined') return []; // For SSR
    const saved = localStorage.getItem('tiktokCrateInventory');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage when inventory changes
  useEffect(() => {
    localStorage.setItem('tiktokCrateInventory', JSON.stringify(inventory));
  }, [inventory]);

  const addToInventory = (video: TikTokVideo, rarity: Rarity) => {
    const newItem: InventoryItem = {
      video,
      rarity,
      openedAt: new Date(),
    };
    setInventory((prev) => [newItem, ...prev]);
  };

  const clearInventory = () => {
    setInventory([]);
  };

  return (
    <InventoryContext.Provider value={{ inventory, addToInventory, clearInventory }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = (): InventoryContextType => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};