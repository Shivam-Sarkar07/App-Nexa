import { AppItem } from './types';

export const CATEGORIES = ['All', 'Top Apps', 'Trending', 'New', 'Games'];

export const MOCK_APPS: AppItem[] = [
  {
    id: '1',
    name: 'ZenSpace',
    tagline: 'Meditation & Focus',
    description: 'AI-powered soundscapes for deep focus and relaxation.',
    icon: 'https://images.unsplash.com/photo-1528319725582-ddc096101511?w=200&h=200&fit=crop',
    rating: 4.9,
    users: '120k',
    category: 'Top Apps',
    url: 'https://bing.com',
    isTrending: true,
    isPremium: true
  },
  {
    id: '2',
    name: 'Retro Drift',
    tagline: 'Arcade Racing',
    description: 'Synthwave style endless racer.',
    icon: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=200&h=200&fit=crop',
    rating: 4.5,
    users: '85k',
    category: 'Games',
    url: 'https://bing.com',
    isTrending: true
  },
  {
    id: '3',
    name: 'Pixel Art Pro',
    tagline: 'Creative Studio',
    description: 'Create amazing pixel art on the go.',
    icon: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=200&h=200&fit=crop',
    rating: 4.7,
    users: '45k',
    category: 'New',
    url: 'https://bing.com',
    isTrending: false
  },
  {
    id: '4',
    name: 'CryptoWatch',
    tagline: 'Market Tracker',
    description: 'Real-time crypto prices and alerts.',
    icon: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=200&h=200&fit=crop',
    rating: 4.6,
    users: '200k',
    category: 'Trending',
    url: 'https://bing.com',
    isTrending: true
  },
  {
    id: '5',
    name: 'Sky Weather',
    tagline: 'Hyperlocal Forecast',
    description: 'Precise weather alerts for your location.',
    icon: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=200&h=200&fit=crop',
    rating: 4.8,
    users: '500k',
    category: 'Top Apps',
    url: 'https://bing.com',
    isTrending: false
  },
   {
    id: '6',
    name: 'FitTrack',
    tagline: 'Workout Planner',
    description: 'Personalized workout plans and tracking.',
    icon: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&h=200&fit=crop',
    rating: 4.7,
    users: '300k',
    category: 'Top Apps',
    url: 'https://bing.com',
    isTrending: true
  }
];