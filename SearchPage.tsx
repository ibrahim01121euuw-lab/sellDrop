import React, { useState } from 'react';
import { Search, SlidersHorizontal, X, TrendingUp, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { MOCK_PRODUCTS, CATEGORIES, Product } from '../lib/mockData';
import ProductCard from '../components/ProductCard';

interface SearchPageProps {
  onNavigate: (page: string, productId?: string) => void;
  savedProductIds: Set<string>;
  onSave: (product: Product) => void;
  onUnsave: (productId: string) => void;
}

export default function SearchPage({ onNavigate, savedProductIds, onSave, onUnsave }: SearchPageProps) {
  const { profile, refreshProfile } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'trend' | 'price_asc' | 'price_desc' | 'rating'>('trend');
  const [showFilters, setShowFilters] = useState(false);
  const [limitReached, setLimitReached] = useState(false);

  const searchLimit = profile?.plan === 'free' ? 30 : Infinity;
  const searchesUsed = profile?.searches_used ?? 0;

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    if (profile?.plan === 'free' && searchesUsed >= searchLimit) {
      setLimitReached(true);
      return;
    }

    setLoading(true);
    setLimitReached(false);

    await new Promise((r) => setTimeout(r, 600));

    let filtered = MOCK_PRODUCTS.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 0) filtered = MOCK_PRODUCTS;

    setResults(filtered);
    setSearched(true);
    setLoading(false);

    if (profile) {
      await supabase.from('searches').insert({
        user_id: profile.id,
        query: query.trim(),
        results_count: filtered.length,
      });
      await supabase.from('profiles').update({ searches_used: searchesUsed + 1 }).eq('id', profile.id);
      await refreshProfile();
    }
  }

  function applyFilters(products: Product[]) {
    let out = [...products];
    if (selectedCategory !== 'All') out = out.filter((p) => p.category === selectedCategory);
    if (sortBy === 'trend') out.sort((a, b) => b.trend_score - a.trend_score);
    else if (sortBy === 'price_asc') out.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price_desc') out.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') out.sort((a, b) => b.rating - a.rating);
    return out;
  }

  const displayProducts = applyFilters(searched ? results : MOCK_PRODUCTS);

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Product Search</h1>
        <p className="text-gray-500 text-sm">Find winning products with real-time trend data.</p>
      </div>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, niches, or keywords..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
            />
            {query && (
              <button type="button" onClick={() => { setQuery(''); setSearched(false); setResults([]); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-6 py-3 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
          >
            {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search size={16} />}
            Search
          </button>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-3 rounded-xl border text-sm font-medium transition-colors flex items-center gap-2 ${showFilters ? 'border-red-500 text-red-600 bg-red-50' : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50'}`}
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        {/* Search limit warning */}
        {profile?.plan === 'free' && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 bg-gray-100 rounded-full h-1">
              <div className="bg-red-500 h-1 rounded-full" style={{ width: `${Math.min((searchesUsed / 30) * 100, 100)}%` }} />
            </div>
            <span className="text-xs text-gray-500">{searchesUsed}/30 searches</span>
          </div>
        )}
      </form>

      {/* Limit reached */}
      {limitReached && (
        <div className="mb-6 bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-3">
          <Lock size={18} className="text-red-500 flex-shrink-0" />
          <div>
            <div className="text-sm font-semibold text-red-700">Monthly search limit reached</div>
            <div className="text-xs text-red-600">Upgrade to Pro for unlimited searches.</div>
          </div>
          <button onClick={() => onNavigate('pricing')} className="ml-auto text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-red-700 transition-colors">
            Upgrade
          </button>
        </div>
      )}

      {/* Filters */}
      {showFilters && (
        <div className="bg-white border border-gray-100 rounded-xl p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">Category</label>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${selectedCategory === cat ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">Sort By</label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { value: 'trend', label: 'Trend Score' },
                  { value: 'price_asc', label: 'Price: Low' },
                  { value: 'price_desc', label: 'Price: High' },
                  { value: 'rating', label: 'Rating' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSortBy(opt.value as typeof sortBy)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${sortBy === opt.value ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-red-500" />
          <span className="text-sm font-medium text-gray-700">
            {searched ? `${displayProducts.length} results for "${query}"` : `${displayProducts.length} trending products`}
          </span>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayProducts.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            isSaved={savedProductIds.has(p.id)}
            onSave={() => onSave(p)}
            onUnsave={() => onUnsave(p.id)}
            onClick={() => onNavigate('product', p.id)}
          />
        ))}
      </div>
    </div>
  );
}
