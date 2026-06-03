import React, { useEffect, useState } from 'react';
import { TrendingUp, Search, Bookmark, BarChart2, ArrowUpRight, Clock, Flame, ChevronRight } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { supabase, Search as SearchRecord } from '../supabase';
interface DashboardProps {
  onNavigate: (page: string, productId?: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { profile } = useAuth();
  const [recentSearches, setRecentSearches] = useState<SearchRecord[]>([]);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    async function load() {
      if (!profile) return;
      const [{ data: searches }, { count }] = await Promise.all([
        supabase.from('searches').select('*').eq('user_id', profile.id).order('created_at', { ascending: false }).limit(5),
        supabase.from('saved_products').select('*', { count: 'exact', head: true }).eq('user_id', profile.id),
      ]);
      setRecentSearches(searches ?? []);
      setSavedCount(count ?? 0);
    }
    load();
  }, [profile]);

  const trendingProducts = MOCK_PRODUCTS.filter((p) => p.trend_score >= 88).slice(0, 4);
  const topCategories = [
    { name: 'Electronics', count: 1842, growth: 12 },
    { name: 'Fitness', count: 1231, growth: 24 },
    { name: 'Smart Home', count: 987, growth: 31 },
    { name: 'Health', count: 743, growth: 18 },
  ];

  const stats = [
    { label: 'Searches This Month', value: profile?.searches_used ?? 0, limit: profile?.plan === 'free' ? 30 : null, icon: Search, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Saved Products', value: savedCount, icon: Bookmark, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Trending Products', value: '50K+', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Categories Tracked', value: 24, icon: BarChart2, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Good morning, {profile?.full_name?.split(' ')[0] || 'there'} 👋
        </h1>
        <p className="text-gray-500 mt-1 text-sm">Here's what's trending in your market today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, limit, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className={`w-9 h-9 ${bg} rounded-lg flex items-center justify-center mb-3`}>
              <Icon size={18} className={color} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-0.5">
              {limit ? `${value}/${limit}` : value}
            </div>
            <div className="text-xs text-gray-500">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Trending products */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Flame size={18} className="text-red-500" />
              <h2 className="font-semibold text-gray-900">Trending Now</h2>
            </div>
            <button
              onClick={() => onNavigate('search')}
              className="text-xs text-red-600 font-medium hover:text-red-700 flex items-center gap-1"
            >
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {trendingProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => onNavigate('product', p.id)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
              >
                <img src={p.image_url} alt={p.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{p.title}</div>
                  <div className="text-xs text-gray-500">{p.category} · ${p.price}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <TrendingUp size={10} /> {p.trend_score}
                  </span>
                  <ArrowUpRight size={14} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-5">
            <BarChart2 size={18} className="text-gray-700" />
            <h2 className="font-semibold text-gray-900">Hot Categories</h2>
          </div>
          <div className="space-y-4">
            {topCategories.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-gray-700 font-medium">{cat.name}</span>
                  <span className="text-xs text-green-600 font-medium">+{cat.growth}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-red-500 h-1.5 rounded-full"
                    style={{ width: `${(cat.count / 2000) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{cat.count.toLocaleString()} products</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Searches */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-gray-700" />
            <h2 className="font-semibold text-gray-900">Recent Searches</h2>
          </div>
          <button
            onClick={() => onNavigate('search')}
            className="text-xs text-red-600 font-medium hover:text-red-700 flex items-center gap-1"
          >
            New search <ChevronRight size={12} />
          </button>
        </div>
        {recentSearches.length === 0 ? (
          <div className="text-center py-10">
            <Search size={32} className="text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No searches yet.</p>
            <button
              onClick={() => onNavigate('search')}
              className="mt-3 text-sm text-red-600 font-medium hover:text-red-700"
            >
              Start searching
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {recentSearches.map((s) => (
              <div
                key={s.id}
                onClick={() => onNavigate('search')}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Search size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-700 font-medium">{s.query}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{s.results_count} results</span>
                  <span className="text-xs text-gray-300">{new Date(s.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
