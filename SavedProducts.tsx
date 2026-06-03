import React from 'react';
import { Bookmark, TrendingUp, Search, Trash2, Star } from 'lucide-react';
import { SavedProduct } from '../supabase';

interface SavedProductsProps {
  savedProducts: SavedProduct[];
  onUnsave: (productId: string) => void;
  onNavigate: (page: string, productId?: string) => void;
}

export default function SavedProducts({ savedProducts, onUnsave, onNavigate }: SavedProductsProps) {
  if (savedProducts.length === 0) {
    return (
      <div className="p-6 md:p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Saved Products</h1>
          <p className="text-gray-500 text-sm">Your curated list of winning products.</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bookmark size={28} className="text-gray-300" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">No saved products yet</h2>
          <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">
            Start saving products from the search page to build your winning product list.
          </p>
          <button
            onClick={() => onNavigate('search')}
            className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors"
          >
            <Search size={16} />
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Saved Products</h1>
          <p className="text-gray-500 text-sm">{savedProducts.length} product{savedProducts.length !== 1 ? 's' : ''} saved</p>
        </div>
        <button
          onClick={() => onNavigate('search')}
          className="inline-flex items-center gap-2 text-sm text-red-600 font-medium hover:text-red-700 border border-red-200 px-4 py-2 rounded-xl hover:bg-red-50 transition-all"
        >
          <Search size={14} />
          Find More
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedProducts.map((sp) => (
          <div
            key={sp.id}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all group"
          >
            <div
              className="relative cursor-pointer"
              onClick={() => onNavigate('product', sp.product_id)}
            >
              <img
                src={sp.image_url}
                alt={sp.title}
                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2">
                <span className="text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 text-green-600 bg-green-50">
                  <TrendingUp size={10} /> {sp.trend_score}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div
                className="cursor-pointer"
                onClick={() => onNavigate('product', sp.product_id)}
              >
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1 leading-snug">{sp.title}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs font-medium text-gray-700">{sp.rating}</span>
                  <span className="text-xs text-gray-400">({sp.reviews_count.toLocaleString()})</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-gray-900">${sp.price}</span>
                  <span className="text-xs text-gray-400">{sp.category}</span>
                </div>
              </div>
              <div className="flex gap-2 pt-3 border-t border-gray-50">
                <button
                  onClick={() => onNavigate('product', sp.product_id)}
                  className="flex-1 text-xs text-gray-600 border border-gray-200 py-1.5 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  View Details
                </button>
                <button
                  onClick={() => onUnsave(sp.product_id)}
                  className="p-1.5 text-gray-400 border border-gray-200 rounded-lg hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
