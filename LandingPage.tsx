import React from 'react';
import { Search, BarChart2, Zap, ArrowRight, Star, Shield, Globe } from 'lucide-react';
import SellDropLogo from '../components/SellDropLogo';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <SellDropLogo size={32} />
            <span className="text-xl font-bold text-gray-900">SellDrop</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onGetStarted} className="text-sm text-gray-600 font-medium hover:text-gray-900 transition-colors">
              Sign In
            </button>
            <button
              onClick={onGetStarted}
              className="bg-red-600 text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-red-700 transition-colors"
            >
              Start Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-red-100">
            <Zap size={12} />
            50,000+ products analyzed daily
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight">
            Discover. Analyze.
            <br />
            <span className="text-red-600">Sell.</span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            SellDrop gives dropshippers a competitive edge with real-time product research, trend scoring, and profit analytics — all in one platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onGetStarted}
              className="flex items-center gap-2 bg-red-600 text-white px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-200 hover:shadow-red-300"
            >
              Get Started Free
              <ArrowRight size={16} />
            </button>
            <button
              onClick={onGetStarted}
              className="flex items-center gap-2 border border-gray-200 text-gray-700 px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              View Demo
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-4">No credit card required · Free plan available</p>
        </div>
      </section>

      {/* Metrics strip */}
      <section className="border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '50K+', label: 'Products Tracked' },
            { value: '10K+', label: 'Active Sellers' },
            { value: '98%', label: 'Accuracy Rate' },
            { value: '3x', label: 'Avg. Revenue Increase' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="text-2xl font-black text-gray-900">{value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Everything you need to find winning products</h2>
            <p className="text-gray-500 max-w-lg mx-auto">From trend detection to profit analysis, SellDrop handles the research so you can focus on selling.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Trend Scoring',
                desc: 'Real-time trend scores based on search volume, sales velocity, and social signals. Spot winning products before they peak.',
                color: 'bg-red-100 text-red-600',
              },
              {
                icon: Search,
                title: 'Smart Product Search',
                desc: 'Search across 50,000+ products with advanced filters for category, price range, competition level, and profit margin.',
                color: 'bg-blue-100 text-blue-600',
              },
              {
                icon: BarChart2,
                title: 'Profit Analytics',
                desc: 'Instant profit margin calculations, competition scoring, and market demand estimates to validate every product.',
                color: 'bg-green-100 text-green-600',
              },
              {
                icon: Shield,
                title: 'Competition Analysis',
                desc: 'See how saturated each niche is. Low competition scores mean more opportunity for you to dominate.',
                color: 'bg-amber-100 text-amber-600',
              },
              {
                icon: Globe,
                title: 'Multi-Marketplace',
                desc: 'Source products from AliExpress, Amazon, and Alibaba all tracked in one unified dashboard.',
                color: 'bg-gray-100 text-gray-600',
              },
              {
                icon: Zap,
                title: 'Instant Insights',
                desc: 'No more manual research. Get actionable insights within seconds of searching for any product or niche.',
                color: 'bg-red-100 text-red-600',
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-sm hover:border-gray-200 transition-all">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Trusted by serious sellers</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Alex R.', role: 'Dropshipper', quote: 'I found my best-selling product using SellDrop\'s trend score. Made $12K in my first month.' },
              { name: 'Sarah M.', role: 'E-commerce Entrepreneur', quote: 'The profit margin calculator alone saves me hours of research every week. Game changer.' },
              { name: 'James K.', role: 'Agency Owner', quote: 'We use SellDrop for all our clients. The competition analysis is incredibly accurate.' },
            ].map(({ name, role, quote }) => (
              <div key={name} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">"{quote}"</p>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{name}</div>
                  <div className="text-xs text-gray-400">{role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-3">Start free, scale when ready</h2>
          <p className="text-gray-500 mb-10">Plans that grow with your business.</p>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 text-left">
              <div className="text-lg font-bold text-gray-900 mb-1">Free</div>
              <div className="text-3xl font-black text-gray-900 mb-1">$0<span className="text-sm font-normal text-gray-400">/mo</span></div>
              <p className="text-sm text-gray-500 mb-4">Perfect for getting started</p>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-center gap-2"><Check size={14} className="text-green-500" /> 30 searches/month</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-green-500" /> 3 tools access</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-green-500" /> Basic analytics</li>
              </ul>
              <button onClick={onGetStarted} className="w-full py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                Get Started Free
              </button>
            </div>
            <div className="bg-black rounded-2xl p-6 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-lg font-bold text-white">Pro</div>
                  <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">POPULAR</span>
                </div>
                <div className="text-3xl font-black text-white mb-1">$29<span className="text-sm font-normal text-gray-400">/mo</span></div>
                <p className="text-sm text-gray-400 mb-4">For serious dropshippers</p>
                <ul className="space-y-2 text-sm text-gray-300 mb-6">
                  <li className="flex items-center gap-2"><Check size={14} className="text-red-400" /> Unlimited searches</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-red-400" /> All tools access</li>
                  <li className="flex items-center gap-2"><Check size={14} className="text-red-400" /> Advanced analytics</li>
                </ul>
                <button onClick={onGetStarted} className="w-full py-2.5 bg-red-600 rounded-xl text-sm font-semibold text-white hover:bg-red-700 transition-colors">
                  Get Pro
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            Ready to find your next <span className="text-red-500">winning product?</span>
          </h2>
          <p className="text-gray-400 mb-8">Join 10,000+ sellers using SellDrop to build profitable stores.</p>
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-red-700 transition-all"
          >
            Start for Free
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <SellDropLogo size={24} />
            <span className="text-sm font-bold text-gray-900">SellDrop</span>
          </div>
          <div className="text-xs text-gray-400">© 2026 SellDrop. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

function Check({ size, className }: { size: number; className: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12" /></svg>;
}
