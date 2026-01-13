export interface AppItem {
  id: string;
  name: string;
  tagline: string;
  description?: string;
  icon: string; // URL or placeholder id
  rating: number;
  users: string;
  category: string;
  url: string;
  isPremium?: boolean;
  isTrending?: boolean;
}

export type AppView = 
  | 'HOME' 
  | 'LOGIN' 
  | 'APP_DETAILS' 
  | 'LIKES' 
  | 'WEBVIEW' 
  | 'PROFILE' 
  | 'BUG_REPORT' 
  | 'POINTS' 
  | 'PREMIUM_UPGRADE' 
  | 'SETTINGS' 
  | 'SUPPORT' 
  | 'PRIVACY' 
  | 'TERMS' 
  | 'DISCLAIMER' 
  | 'REDEEM_CODE';

export interface NavItem {
  id: string;
  icon: any; // Lucide icon component type
  label: string;
  isActive?: boolean;
}