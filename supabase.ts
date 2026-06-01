import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Plan = 'free' | 'pro' | 'enterprise';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  plan: Plan;
  searches_used: number;
  searches_reset_at: string;
  created_at: string;
  updated_at: string;
}

export interface Search {
  id: string;
  user_id: string;
  query: string;
  results_count: number;
  created_at: string;
}

export interface SavedProduct {
  id: string;
  user_id: string;
  product_id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  source: string;
  rating: number;
  reviews_count: number;
  trend_score: number;
  created_at: string;
}
