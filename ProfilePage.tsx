import React, { useState } from 'react';
import { User, Mail, Shield, CreditCard, Check, Camera, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function ProfilePage() {
  const { profile, refreshProfile } = useAuth();
  const [fullName, setFullName] = useState(profile?.full_name ?? '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    setError('');
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName, updated_at: new Date().toISOString() })
      .eq('id', profile.id);
    if (error) {
      setError(error.message);
    } else {
      await refreshProfile();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
    setSaving(false);
  }

  const planColor = profile?.plan === 'pro' ? 'bg-red-600 text-white' : profile?.plan === 'enterprise' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600';
  const memberSince = profile ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '';

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Your Profile</h1>
        <p className="text-gray-500 text-sm">Manage your account details and subscription.</p>
      </div>

      {/* Profile header card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 flex items-center gap-5">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {(profile?.full_name || profile?.email || 'U')[0].toUpperCase()}
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
            <Camera size={13} className="text-gray-500" />
          </button>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-lg font-bold text-gray-900 truncate">{profile?.full_name || 'Your Name'}</div>
          <div className="text-sm text-gray-500 truncate">{profile?.email}</div>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase ${planColor}`}>
              {profile?.plan} plan
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar size={11} />
              Member since {memberSince}
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Edit profile form */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-5">
            <User size={18} className="text-gray-700" />
            <h2 className="font-semibold text-gray-900">Personal Information</h2>
          </div>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={profile?.email ?? ''}
                  disabled
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-gray-200 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
            </div>
            {error && (
              <div className="text-xs text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">{error}</div>
            )}
            <button
              type="submit"
              disabled={saving}
              className="w-full py-2.5 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {saving ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : saved ? (
                <><Check size={14} /> Saved!</>
              ) : (
                'Save Changes'
              )}
            </button>
          </form>
        </div>

        {/* Subscription info */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard size={18} className="text-gray-700" />
              <h2 className="font-semibold text-gray-900">Subscription</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Current Plan</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase ${planColor}`}>
                  {profile?.plan}
                </span>
              </div>
              {profile?.plan === 'free' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-500">Searches Used</span>
                    <span className="text-sm font-semibold text-gray-900">{profile.searches_used} / 30</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-red-500 h-1.5 rounded-full"
                      style={{ width: `${Math.min((profile.searches_used / 30) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
              {profile?.plan === 'pro' && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check size={14} className="text-green-500" />
                  Unlimited searches
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={18} className="text-gray-700" />
              <h2 className="font-semibold text-gray-900">Security</h2>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-gray-600">Password</span>
                <button className="text-xs text-red-600 font-medium hover:text-red-700">Change</button>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-gray-600">Two-factor auth</span>
                <span className="text-xs text-gray-400">Not enabled</span>
              </div>
              <div className="flex items-center justify-between py-1 border-t border-gray-50 pt-3">
                <span className="text-sm text-red-500">Delete Account</span>
                <button className="text-xs text-red-500 font-medium hover:text-red-700">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
