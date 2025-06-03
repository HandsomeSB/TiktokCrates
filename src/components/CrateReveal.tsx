import React, { useState, useEffect } from 'react';
import { TikTokVideo, Rarity, CrateState } from '../types';
import { RARITY_NAMES, RARITY_COLORS } from '../constants';
import { useInventory } from '../context/InventoryContext';
import { Loader2 } from 'lucide-react';

interface CrateRevealProps {
  crateState: CrateState;
  onRevealComplete: () => void;
  onReset: () => void;
  onOpenCrate: () => void;
  isLoading: boolean;
}

const CrateReveal: React.FC<CrateRevealProps> = ({ 
  crateState, 
  onRevealComplete, 
  onReset, 
  onOpenCrate, 
  isLoading 
}) => {
  const { isOpening, isRevealed, currentVideo, currentRarity } = crateState;
  const [scrollingRarity, setScrollingRarity] = useState<Rarity>('common');
  const [showVideo, setShowVideo] = useState(false);
  const { addToInventory } = useInventory();
  
  const rarities: Rarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
  
  useEffect(() => {
    if (isOpening && currentRarity) {
      let scrollCount = 0;
      const maxScrolls = 20; // Number of times to cycle through rarities
      const interval = setInterval(() => {
        scrollCount++;
        setScrollingRarity(rarities[Math.floor(Math.random() * rarities.length)]);
        
        if (scrollCount >= maxScrolls) {
          clearInterval(interval);
          setScrollingRarity(currentRarity);
          onRevealComplete();
          setTimeout(() => setShowVideo(true), 500);
        }
      }, 100); // Speed of scrolling
      
      return () => clearInterval(interval);
    } else if(!isOpening) {
      setShowVideo(false);
    }
  }, [isOpening, currentRarity, onRevealComplete]);
  
  useEffect(() => {
    if (isRevealed && currentVideo && currentRarity) {
      addToInventory(currentVideo, currentRarity);
      console.log('Added to inventory:', currentVideo, currentRarity);
    }
  }, [isRevealed, currentVideo, currentRarity]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4">
      {/* Rarity Display */}
      <div className={`
        text-center mb-8 p-4 rounded-lg transition-all duration-300
        ${RARITY_COLORS[scrollingRarity]}
        ${isOpening ? 'scale-110' : 'scale-100'}
      `}>
        <h2 className="text-2xl font-bold">
          {RARITY_NAMES[scrollingRarity]}
        </h2>
      </div>
      
      {/* Action Button */}
      <div className="w-full flex justify-center mb-4">
        <button
          onClick={crateState.isRevealed ? onReset : onOpenCrate}
          disabled={isLoading || crateState.isOpening}
          className={`px-6 py-2 rounded-lg transition-colors ${
            crateState.isRevealed 
              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
              : 'bg-amber-600 hover:bg-amber-500 text-white disabled:bg-amber-800 disabled:opacity-50'
          }`}
        >
          {isLoading || crateState.isOpening ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin h-4 w-4" />
              Opening...
            </span>
          ) : crateState.isRevealed ? (
            'Open Another Crate'
          ) : (
            'Open Crate'
          )}
        </button>
      </div>
      
      {/* Video Display */}
      {showVideo && currentVideo && (
        <div className="w-full h-[80vh] max-h-[800px] mx-auto my-4 animate-fadeIn bg-gray-800 rounded-lg overflow-hidden">
          <div className="w-full h-full overflow-y-auto scrollbar-hide">
            <div className="w-full h-full min-h-full">
              <iframe
                src={`https://www.tiktok.com/embed/v2/${currentVideo.webVideoUrl.split('/').pop()}`}
                className="w-full h-full min-h-[80vh]"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrateReveal;