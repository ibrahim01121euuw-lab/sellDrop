import React, { useState } from 'react';
import { Search, Bookmark, LayoutDashboard, User, LogOut, Menu, X, ChevronRight, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SellDropLogo from './SellDropLogo';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'search', label: 'Product Search', icon: Search },
  { id: 'saved', label: 'Saved Products', icon: Bookmark },
  { id: 'pricing', label: 'Pricing', icon: Zap },
];

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const { profile, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const planBadge = profile?.plan === 'pro'
    ? 'bg-red-600 text-white'
    : profile?.plan === 'enterprise'
    ? 'bg-black text-white'
    : 'bg-gray-100 text-gray-600';

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-gray-100">
        <SellDropLogo size={28} />
        <span className="text-xl font-bold text-gray-900 tracking-tight">SellDrop</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = currentPage === id;
          return (
            <button
              key={id}
              onClick={() => { onNavigate(id); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={18} className={active ? 'text-white' : 'text-gray-400'} />
              {label}
              {active && <ChevronRight size={14} className="ml-auto text-red-200" />}
            </button>
          );
        })}
      </nav>

      {/* Plan badge */}
      {profile && (
        <div className="px-3 pb-2">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 font-medium">Current Plan</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase ${planBadge}`}>
                {profile.plan}
              </span>
            </div>
            {profile.plan === 'free' && (
              <>
                <div className="text-xs text-gray-500 mb-1.5">
                  {profile.searches_used} / 30 searches used
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                  <div
                    className="bg-red-500 h-1.5 rounded-full transition-all"
                    style={{ width: `${Math.min((profile.searches_used / 30) * 100, 100)}%` }}
                  />
                </div>
                <button
                  onClick={() => { onNavigate('pricing'); setMobileOpen(false); }}
                  className="w-full text-xs bg-red-600 text-white py-1.5 rounded-md font-medium hover:bg-red-700 transition-colors"
                >
                  Upgrade to Pro
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* User footer */}
      <div className="px-3 pb-4 border-t border-gray-100 pt-3">
        <button
          onClick={() => { onNavigate('profile'); setMobileOpen(false); }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-0.5 ${
            currentPage === 'profile' ? 'bg-red-600 text-white' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <User size={13} className="text-red-600" />
          </div>
          <span className="truncate">{profile?.full_name || profile?.email || 'Profile'}</span>
        </button>
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all"
        >
          <LogOut size={18} className="text-gray-400" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-60 flex-shrink-0 bg-white border-r border-gray-100 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SellDropLogo size={24} />
          <span className="text-lg font-bold text-gray-900">SellDrop</span>
        </div>
        <button onClick={() => setMobileOpen(true)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 bg-white h-full shadow-2xl flex flex-col">
            <button
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"
              onClick={() => setMobileOpen(false)}
            >
              <X size={18} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
