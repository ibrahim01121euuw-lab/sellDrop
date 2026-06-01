import React from 'react';
import { ArrowLeft, Star, TrendingUp, ShoppingCart, BarChart2, Bookmark, ExternalLink, Globe, Award, ThumbsUp } from 'lucide-react';
import { MOCK_PRODUCTS, Product } from '../lib/mockData';

interface ProductDetailsProps {
  productId: string;
  isSaved: boolean;
  onSave: (product: Product) => void;
  onUnsave: (productId: string) => void;
  onBack: () => void;
}

export default function ProductDetails({ productId, isSaved, onSave, onUnsave, onBack }: ProductDetailsProps) {
  const product = MOCK_PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Product not found.</p>
        <button onClick={onBack} className="mt-3 text-red-600 font-medium text-sm">Go Back</button>
      </div>
    );
  }

  const competitionColor = product.competition === 'low' ? 'text-green-700 bg-green-50 border-green-200' : product.competition === 'medium' ? 'text-amber-700 bg-amber-50 border-amber-200' : 'text-red-700 bg-red-50 border-red-200';

  const scoreItems = [
    { label: 'Trend Score', value: product.trend_score, max: 100, color: 'bg-red-500' },
    { label: 'Profit Margin', value: product.profit_margin, max: 100, color: 'bg-green-500' },
    { label: 'Demand Score', value: Math.round((product.monthly_sales / 25000) * 100), max: 100, color: 'bg-blue-500' },
    { label: 'Saturation Score', value: product.competition === 'low' ? 25 : product.competition === 'medium' ? 55 : 85, max: 100, color: 'bg-amber-500' },
  ];

  const relatedProducts = MOCK_PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
        <ArrowLeft size={16} />
        Back to results
      </button>

      <div className="grid lg:grid-cols-5 gap-8 mb-8">
        {/* Image */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-square">
            <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-3">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{product.category} · {product.source}</span>
              <h1 className="text-2xl font-bold text-gray-900 mt-1 leading-tight">{product.title}</h1>
            </div>
            <button
              onClick={() => isSaved ? onUnsave(product.id) : onSave(product)}
              className={`flex-shrink-0 p-2.5 rounded-xl border transition-all ${isSaved ? 'bg-red-600 border-red-600 text-white' : 'border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-600'}`}
            >
              <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'} />
              ))}
              <span className="text-sm font-semibold text-gray-700 ml-1">{product.rating}</span>
            </div>
            <span className="text-sm text-gray-400">({product.reviews_count.toLocaleString()} reviews)</span>
          </div>

          <div className="text-3xl font-bold text-gray-900 mb-4">${product.price}</div>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.description}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-500 mb-1 flex items-center justify-center gap-1"><TrendingUp size={12} /> Trend</div>
              <div className="text-xl font-bold text-red-600">{product.trend_score}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-500 mb-1 flex items-center justify-center gap-1"><ShoppingCart size={12} /> Sales/mo</div>
              <div className="text-xl font-bold text-gray-900">{(product.monthly_sales / 1000).toFixed(1)}k</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-500 mb-1 flex items-center justify-center gap-1"><BarChart2 size={12} /> Margin</div>
              <div className="text-xl font-bold text-green-600">{product.profit_margin}%</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">Competition</div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full border capitalize ${competitionColor}`}>
                {product.competition}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => isSaved ? onUnsave(product.id) : onSave(product)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 border ${
                isSaved
                  ? 'border-red-200 text-red-600 bg-red-50 hover:bg-red-100'
                  : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
              {isSaved ? 'Saved' : 'Save Product'}
            </button>
            <button className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
              <ExternalLink size={15} />
              View on {product.source}
            </button>
          </div>
        </div>
      </div>

      {/* Scoring */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-5">
            <Award size={18} className="text-gray-700" />
            <h2 className="font-semibold text-gray-900">Product Scores</h2>
          </div>
          <div className="space-y-4">
            {scoreItems.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className="text-sm font-bold text-gray-900">{item.value}/100</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={`${item.color} h-2 rounded-full transition-all`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-5">
            <Globe size={18} className="text-gray-700" />
            <h2 className="font-semibold text-gray-900">Market Overview</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Estimated Monthly Revenue', value: `$${(product.monthly_sales * product.price * (product.profit_margin / 100)).toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
              { label: 'Est. Cost Price', value: `$${(product.price * (1 - product.profit_margin / 100)).toFixed(2)}` },
              { label: 'Recommended Sell Price', value: `$${(product.price * 1.15).toFixed(2)}` },
              { label: 'Avg. Order Value', value: `$${product.price}` },
              { label: 'Top Marketplace', value: product.source },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-500">{row.label}</span>
                <span className="text-sm font-semibold text-gray-900">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ThumbsUp size={18} className="text-gray-700" />
            <h2 className="font-semibold text-gray-900">Related Products</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {/* re-render with new product id */}}
                className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3 hover:shadow-sm cursor-pointer transition-all"
              >
                <img src={p.image_url} alt={p.title} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-medium text-gray-900 truncate">{p.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">${p.price}</div>
                  <div className="text-xs text-green-600 font-medium mt-0.5 flex items-center gap-0.5">
                    <TrendingUp size={10} /> {p.trend_score}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
