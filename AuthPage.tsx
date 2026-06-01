import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SellDropLogo from '../components/SellDropLogo';

interface AuthPageProps {
  onNavigate: (page: string) => void;
}

export default function AuthPage({ onNavigate }: AuthPageProps) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (mode === 'signup') {
      const { error } = await signUp(email, password, fullName);
      if (error) setError(error.message);
    } else {
      const { error } = await signIn(email, password);
      if (error) setError(error.message);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-black flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-2.5">
            <SellDropLogo size={36} />
            <span className="text-2xl font-bold text-white tracking-tight">SellDrop</span>
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">
            Discover trending<br />products before<br />
            <span className="text-red-500">your competitors do.</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Real-time product analytics, profit margin calculators, and competition scoring — all in one place.
          </p>
          <div className="flex flex-col gap-3">
            {['50,000+ products analyzed daily', 'Real-time trend scoring', 'Profit margin calculator'].map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                </div>
                <span className="text-gray-300 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-gray-600 text-sm">
          © 2026 SellDrop. All rights reserved.
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <SellDropLogo size={32} />
            <span className="text-2xl font-bold text-gray-900">SellDrop</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="text-gray-500 text-sm">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
                className="text-red-600 font-medium hover:text-red-700"
              >
                {mode === 'login' ? 'Sign up free' : 'Sign in'}
              </button>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Smith"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {mode === 'login' && (
            <div className="mt-4 text-center">
              <button className="text-sm text-gray-400 hover:text-gray-600">Forgot your password?</button>
            </div>
          )}

          {mode === 'signup' && (
            <p className="mt-4 text-xs text-gray-400 text-center">
              By creating an account you agree to our Terms of Service and Privacy Policy.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
