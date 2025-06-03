import React from 'react';
import { TikTokVideo, Rarity } from '../types';
import { RARITY_COLORS, RARITY_GLOW, RARITY_NAMES } from '../constants';
import { ArrowUpFromLine, Heart, MessageCircle, PlayCircle, Share2 } from 'lucide-react';

interface VideoCardProps {
  video: TikTokVideo;
  rarity: Rarity;
  isNewlyOpened?: boolean;
}

const formatNumber = (num: number): string => {
  if (num < 1000) return num.toFixed(0);
  if (num < 1000000) return (num / 1000).toFixed(1) + 'k';
  return (num / 1000000).toFixed(1) + 'm';
};

const VideoCard: React.FC<VideoCardProps> = ({ video, rarity, isNewlyOpened = false }) => {
  const colorClasses = RARITY_COLORS[rarity];
  const glowClasses = RARITY_GLOW[rarity];
  const rarityName = RARITY_NAMES[rarity];
  
  // Video ID to embed on TikTok
  const videoId = video.webVideoUrl.split('/').pop();
  
  // Animation classes
  const animationClasses = isNewlyOpened 
    ? 'animate-fadeIn transform transition-all duration-500 scale-105' 
    : 'transform transition-all duration-300 hover:scale-102';

  return (
    <div 
      className={`rounded-lg overflow-hidden ${glowClasses} ${animationClasses} bg-gray-900 border border-gray-800`}
    >
      <div className={`${colorClasses} px-3 py-2 flex justify-between items-center`}>
        <span className="font-bold text-sm">{rarityName}</span>
        <span className="text-xs opacity-80">Score: {video.score ? Math.round(video.score * 100) : 100}</span>
      </div>
      
      <div className="p-4">
        <div className="mb-3">
          <a 
            href={video.webVideoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-sm underline flex items-center gap-1"
          >
            <PlayCircle size={16} />
            <span>Watch on TikTok</span>
          </a>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="flex items-center gap-1 text-gray-300">
            <Heart size={14} className="text-red-500" />
            <span className="text-xs">{formatNumber(video.diggCount)}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-300">
            <Share2 size={14} className="text-blue-500" />
            <span className="text-xs">{formatNumber(video.shareCount)}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-300">
            <PlayCircle size={14} className="text-green-500" />
            <span className="text-xs">{formatNumber(video.playCount)}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-300">
            <MessageCircle size={14} className="text-yellow-500" />
            <span className="text-xs">{formatNumber(video.commentCount)}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-300 col-span-2">
            <ArrowUpFromLine size={14} className="text-purple-500" />
            <span className="text-xs">{formatNumber(video.collectCount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;