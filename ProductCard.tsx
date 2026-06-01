import React from 'react';
import { TrendingUp, Star, Bookmark, ShoppingCart, BarChart2 } from 'lucide-react';
import { Product } from '../lib/mockData';

interface ProductCardProps {
  product: Product;
  isSaved?: boolean;
  onSave?: () => void;
  onUnsave?: () => void;
  onClick?: () => void;
}

export default function ProductCard({ product, isSaved, onSave, onUnsave, onClick }: ProductCardProps) {
  const trendColor = product.trend_score >= 90 ? 'text-green-600 bg-green-50' : product.trend_score >= 75 ? 'text-amber-600 bg-amber-50' : 'text-gray-600 bg-gray-100';
  const competitionColor = product.competition === 'low' ? 'text-green-700 bg-green-50' : product.competition === 'medium' ? 'text-amber-700 bg-amber-50' : 'text-red-700 bg-red-50';

  return (
    <div
      className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={product.image_url}
          alt={product.title}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2">
          <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 ${trendColor}`}>
            <TrendingUp size={10} />
            {product.trend_score}
          </span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); isSaved ? onUnsave?.() : onSave?.(); }}
          className={`absolute top-2 right-2 p-1.5 rounded-full transition-all ${
            isSaved ? 'bg-red-600 text-white' : 'bg-white/80 text-gray-500 hover:bg-white hover:text-red-600'
          }`}
        >
          <Bookmark size={14} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 flex-1">{product.title}</h3>
        </div>
        <div className="flex items-center gap-1 mb-2">
          <Star size={12} className="text-amber-400 fill-amber-400" />
          <span className="text-xs font-medium text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews_count.toLocaleString()})</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${competitionColor}`}>
            {product.competition} comp
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-50">
          <div className="flex items-center gap-1.5">
            <ShoppingCart size={12} className="text-gray-400" />
            <span className="text-xs text-gray-500">{(product.monthly_sales / 1000).toFixed(1)}k/mo</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BarChart2 size={12} className="text-gray-400" />
            <span className="text-xs text-gray-500">{product.profit_margin}% margin</span>
          </div>
        </div>
      </div>
    </div>
  );
}
