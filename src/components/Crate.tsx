import React, { useState, useEffect } from 'react';
import { Package, PackageOpen } from 'lucide-react';
import { Rarity, TikTokVideo } from '../types';
import { RARITY_COLORS, CRATE_OPEN_DURATION, REVEAL_DELAY, RARITY_GLOW } from '../constants';

interface CrateProps {
  isOpening: boolean;
  rarity: Rarity | null;
  onOpenComplete: () => void;
}

const Crate: React.FC<CrateProps> = ({ isOpening, rarity, onOpenComplete }) => {
  const [isRotating, setIsRotating] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; color: string }>>([]);
  
  // Generate particles based on rarity
  useEffect(() => {
    if (rarity && isOpening && !isOpened) {
      setIsRotating(true);
      
      // Start opening sequence after rotation
      setTimeout(() => {
        setIsOpened(true);
        setShowParticles(true);
        
        // Generate particles
        const particleCount = rarity === 'legendary' ? 40 : 
                              rarity === 'epic' ? 30 : 
                              rarity === 'rare' ? 20 : 
                              rarity === 'uncommon' ? 15 : 10;
        
        const colorMap: Record<Rarity, string[]> = {
          common: ['#9CA3AF'],
          uncommon: ['#3B82F6'],
          rare: ['#8B5CF6'],
          epic: ['#EC4899'],
          legendary: ['#F59E0B', '#FBBF24', '#FCD34D']
        };
        
        const colors = colorMap[rarity];
        
        const newParticles = Array(particleCount).fill(0).map((_, i) => ({
          id: i,
          x: 50 + (Math.random() - 0.5) * 30,
          y: 50 + (Math.random() - 0.5) * 30,
          size: 3 + Math.random() * 8,
          color: colors[Math.floor(Math.random() * colors.length)],
        }));
        
        setParticles(newParticles);
        
        // Complete opening after animation
        setTimeout(() => {
          setShowParticles(false);
          onOpenComplete();
        }, REVEAL_DELAY);
      }, CRATE_OPEN_DURATION / 2);
      
      // Reset rotation at the end
      setTimeout(() => {
        setIsRotating(false);
      }, CRATE_OPEN_DURATION);
    }
  }, [isOpening, rarity, onOpenComplete]);
  
  // Reset state when not opening
  useEffect(() => {
    if (!isOpening) {
      setIsOpened(false);
      setShowParticles(false);
    }
  }, [isOpening]);
  
  // Determine crate classes based on state
  const crateClasses = `
    relative transition-all duration-1000 ease-in-out
    ${isRotating ? 'animate-crate-rotate' : ''}
    ${isOpened ? 'scale-110' : 'scale-100 hover:scale-105'}
    ${rarity && RARITY_GLOW[rarity]}
  `;
  
  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      {/* Particles layer */}
      {showParticles && (
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full animate-particle opacity-80"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${0.5 + Math.random() * 1}s`,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Crate visual */}
      <div className={crateClasses}>
        {isOpened ? (
          <PackageOpen 
            size={128} 
            className={`${rarity ? 'text-' + rarity : 'text-gray-400'} transition-all duration-500`} 
          />
        ) : (
          <Package 
            size={128} 
            className="text-gray-400 transition-all duration-500" 
          />
        )}
      </div>
    </div>
  );
};

export default Crate;