export interface TikTokVideo {
  id: number;
  diggCount: number;
  shareCount: number;
  playCount: number;
  commentCount: number;
  collectCount: number;
  webVideoUrl: string;
  score: number;
}

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface CrateState {
  isOpening: boolean;
  isRevealed: boolean;
  currentVideo: TikTokVideo | null;
  currentRarity: Rarity | null;
}

export interface InventoryItem {
  video: TikTokVideo;
  rarity: Rarity;
  openedAt: Date;
}