import React, { useState, useEffect } from 'react';
import { TikTokVideo, Rarity, CrateState } from '../types';
import { RARITY_NAMES, RARITY_COLORS } from '../constants';
import { useInventory } from '../context/InventoryContext';

interface CrateRevealProps {
  crateState: CrateState;
  onRevealComplete: () => void;
}

const CrateReveal: React.FC<CrateRevealProps> = ({ crateState, onRevealComplete }) => {
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
    } else {
      setShowVideo(false);
      setScrollingRarity('common');
    }
  }, [isOpening, currentRarity, onRevealComplete]);
  
  useEffect(() => {
    if (isRevealed && currentVideo && currentRarity) {
      addToInventory(currentVideo, currentRarity);
    }
  }, [isRevealed, currentVideo, currentRarity, addToInventory]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
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
      
      {/* Video Display */}
      {showVideo && currentVideo && (
        <div className="w-full animate-fadeIn bg-gray-800 rounded-lg overflow-hidden">
          <div className="aspect-w-9 aspect-h-16">
            <iframe
              src={`https://www.tiktok.com/embed/v2/${currentVideo.webVideoUrl.split('/').pop()}`}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrateReveal;