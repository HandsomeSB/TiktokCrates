import { Rarity } from '../types';

export const RARITY_COLORS: Record<Rarity, string> = {
  common: 'bg-gray-400 text-gray-900',
  uncommon: 'bg-blue-500 text-white',
  rare: 'bg-purple-600 text-white',
  epic: 'bg-pink-600 text-white',
  legendary: 'bg-amber-500 text-white',
};

export const RARITY_GLOW: Record<Rarity, string> = {
  common: 'shadow-sm shadow-gray-400/50',
  uncommon: 'shadow-md shadow-blue-500/50',
  rare: 'shadow-lg shadow-purple-600/50',
  epic: 'shadow-xl shadow-pink-600/70',
  legendary: 'shadow-2xl shadow-amber-500/70',
};

export const RARITY_NAMES: Record<Rarity, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
};

export const RARITY_PROBABILITY: Record<Rarity, number> = {
  common: 0.6,
  uncommon: 0.25,
  rare: 0.1,
  epic: 0.04,
  legendary: 0.01,
};

export const DATA_URLS: Record<Rarity, string> = {
  common: 'https://raw.githubusercontent.com/HandsomeSB/TiktokCrates/refs/heads/main/data/common.json',
  uncommon: 'https://raw.githubusercontent.com/HandsomeSB/TiktokCrates/refs/heads/main/data/uncommon.json',
  rare: 'https://raw.githubusercontent.com/HandsomeSB/TiktokCrates/refs/heads/main/data/rare.json',
  epic: 'https://raw.githubusercontent.com/HandsomeSB/TiktokCrates/refs/heads/main/data/epic.json',
  legendary: 'https://raw.githubusercontent.com/HandsomeSB/TiktokCrates/refs/heads/main/data/legendary.json',
};

export const CRATE_OPEN_DURATION = 3000;
export const REVEAL_DELAY = 1000;