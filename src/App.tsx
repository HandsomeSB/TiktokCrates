import React, { useState } from 'react';
import { InventoryProvider } from './context/InventoryContext';
import Header from './components/Header';
import CrateReveal from './components/CrateReveal';
import InventoryList from './components/InventoryList';
import StatsDisplay from './components/StatsDisplay';
import { CrateState } from './types';
import { openCrate } from './services/api';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [crateState, setCrateState] = useState<CrateState>({
    isOpening: false,
    isRevealed: false,
    currentVideo: null,
    currentRarity: null,
  });
  
  // Initialize crate state
  const handleOpenCrate = async () => {
    if (isLoading || crateState.isOpening) return;
    
    setIsLoading(true);
    setCrateState({
      isOpening: true,
      isRevealed: false,
      currentVideo: null,
      currentRarity: null,
    });
    
    try {
      const { video, rarity } = await openCrate();
      
      // Update state with the video and rarity
      setCrateState(prev => ({
        ...prev,
        currentVideo: video,
        currentRarity: rarity,
      }));

    } catch (error) {
      console.error('Error opening crate:', error);
      // Reset on error
      setCrateState({
        isOpening: false,
        isRevealed: false,
        currentVideo: null,
        currentRarity: null,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle reveal completion
  const handleRevealComplete = () => {
    setCrateState(prev => ({
      ...prev,
      isOpening: false,
      isRevealed: true,
    }));
  };
  
  // Reset crate state
  const handleReset = () => {
    setCrateState({
      isOpening: false,
      isRevealed: false,
      currentVideo: null,
      currentRarity: null,
    });
  };
  
  return (
    <InventoryProvider>
      <div className="min-h-screen bg-gray-950 text-white flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-6 max-w-5xl">
          <div className="grid md:grid-cols-[4fr_6fr] gap-8">
            <div className="flex flex-col">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-4 text-center">Open TikTok Crate</h2>
                
                {/* Crate opening area */}
                <CrateReveal 
                  crateState={crateState}
                  onRevealComplete={handleRevealComplete}
                  onReset={handleReset}
                  onOpenCrate={handleOpenCrate}
                  isLoading={isLoading}
                />
                
                {/* Stats display */}
                <StatsDisplay />
              </div>
            </div>
            
            {/* Inventory section */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <InventoryList />
            </div>
          </div>
        </main>
        
        <footer className="py-4 text-center text-gray-500 text-sm border-t border-gray-800">
          <p>TikTok Crates © {new Date().getFullYear()} - Fry Your Brain</p>
        </footer>
      </div>
    </InventoryProvider>
  );
}

export default App;