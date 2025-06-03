import { TikTokVideo, Rarity } from '../types';
import { DATA_URLS, RARITY_PROBABILITY } from '../constants';

// Cache videos by rarity to avoid repeated fetches
const videoCache: Record<Rarity, TikTokVideo[]> = {
  common: [],
  uncommon: [],
  rare: [],
  epic: [],
  legendary: [],
};

// Fetch videos by rarity
export const fetchVideosByRarity = async (rarity: Rarity): Promise<TikTokVideo[]> => {
  if (videoCache[rarity].length > 0) {
    return videoCache[rarity];
  }

  try {
    const response = await fetch(DATA_URLS[rarity]);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${rarity} videos`);
    }
    
    const data = await response.json();
    videoCache[rarity] = data; // The data is nested in an array
    return videoCache[rarity];
  } catch (error) {
    console.error(`Error fetching ${rarity} videos:`, error);
    return [];
  }
};

// Get a random video based on rarity
export const getRandomVideo = async (rarity: Rarity): Promise<TikTokVideo | null> => {
  const videos = await fetchVideosByRarity(rarity);
  if (videos.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * videos.length);
  return videos[randomIndex];
};

// Determine rarity based on probability
export const determineRarity = (): Rarity => {
  const random = Math.random();
  let cumulativeProbability = 0;
  
  for (const [rarity, probability] of Object.entries(RARITY_PROBABILITY)) {
    cumulativeProbability += probability;
    if (random <= cumulativeProbability) {
      return rarity as Rarity;
    }
  }
  
  return 'common'; // Fallback
};

// Open a crate and get a random video
export const openCrate = async (): Promise<{ video: TikTokVideo | null; rarity: Rarity }> => {
  const rarity = determineRarity();
  console.log('Rarity:', rarity);
  const video = await getRandomVideo(rarity);
  return { video, rarity };
};