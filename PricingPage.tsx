import React, { useState } from 'react';
import { Check, Zap, Building2, Sparkles, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface PricingPageProps {
  onNavigate: (page: string) => void;
}

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Perfect for getting started',
    icon: Sparkles,
    features: [
      '3 tools access',
      '30 searches per month',
      'Basic product analytics',
      'Save up to 10 products',
      'Email support',
    ],
    limitations: [
      'No advanced analytics',
      'No bulk export',
      'Limited trend history',
    ],
    cta: 'Current Plan',
    highlight: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    description: 'For serious drop shippers',
    icon: Zap,
    features: [
      'Unlimited searches',
      'All tools access',
      'Advanced product analytics',
      'Unlimited saved products',
      'Profit margin calculator',
      'Competition analysis',
      'Trend history (12 months)',
      'CSV export',
      'Priority support',
    ],
    limitations: [],
    cta: 'Upgrade to Pro',
    highlight: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    description: 'For teams and agencies',
    icon: Building2,
    features: [
      'Everything in Pro',
      'Team collaboration (5 seats)',
      'API access',
      'Custom integrations',
      'White-label reports',
      'Dedicated account manager',
      'Custom analytics dashboards',
      'SLA guarantee',
    ],
    limitations: [],
    cta: 'Contact Sales',
    highlight: false,
  },
];

export default function PricingPage({ onNavigate }: PricingPageProps) {
  const { profile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);
  const [success, setSuccess] = useState('');

  async function handleUpgrade(planId: string) {
    if (!profile) return;
    if (planId === 'enterprise') {
      window.open('mailto:sales@selldrop.io', '_blank');
      return;
    }
    setLoading(planId);
    await new Promise((r) => setTimeout(r, 800));
    await supabase.from('profiles').update({ plan: planId }).eq('id', profile.id);
    await refreshProfile();
    setSuccess(planId);
    setLoading(null);
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Simple, Transparent Pricing</h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Start free, upgrade when you're ready. No hidden fees, no contracts.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isCurrent = profile?.plan === plan.id;
          const isHigher = plans.findIndex((p) => p.id === plan.id) > plans.findIndex((p) => p.id === profile?.plan);

          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl border-2 p-6 flex flex-col transition-all ${
                plan.highlight
                  ? 'border-red-500 bg-white shadow-lg shadow-red-100'
                  : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</span>
                </div>
              )}

              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${plan.highlight ? 'bg-red-600' : 'bg-gray-100'}`}>
                <Icon size={20} className={plan.highlight ? 'text-white' : 'text-gray-600'} />
              </div>

              <div className="mb-2">
                <div className="text-lg font-bold text-gray-900">{plan.name}</div>
                <div className="text-sm text-gray-500">{plan.description}</div>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-400 text-sm">/month</span>
              </div>

              <div className="flex-1 space-y-2.5 mb-6">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.highlight ? 'bg-red-100' : 'bg-green-100'}`}>
                      <Check size={10} className={plan.highlight ? 'text-red-600' : 'text-green-600'} />
                    </div>
                    <span className="text-sm text-gray-600">{f}</span>
                  </div>
                ))}
                {plan.limitations.map((f) => (
                  <div key={f} className="flex items-start gap-2.5 opacity-40">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-100">
                      <X size={10} className="text-gray-400" />
                    </div>
                    <span className="text-sm text-gray-400">{f}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  if (isCurrent) return;
                  handleUpgrade(plan.id);
                }}
                disabled={isCurrent || loading === plan.id || success === plan.id}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  isCurrent || success === plan.id
                    ? 'bg-gray-100 text-gray-400 cursor-default'
                    : plan.highlight
                    ? 'bg-red-600 text-white hover:bg-red-700 shadow-sm'
                    : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {loading === plan.id ? (
                  <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                ) : success === plan.id || isCurrent ? (
                  <><Check size={14} /> {isCurrent ? 'Current Plan' : 'Upgraded!'}</>
                ) : (
                  plan.cta
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* FAQ section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your subscription at any time with no cancellation fees.' },
            { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise.' },
            { q: 'Is there a free trial for Pro?', a: 'Yes! New users get a 7-day free trial of Pro features automatically.' },
            { q: 'Can I switch plans mid-month?', a: 'Absolutely. Upgrades take effect immediately; downgrades apply at next billing cycle.' },
          ].map(({ q, a }) => (
            <div key={q}>
              <div className="text-sm font-semibold text-gray-900 mb-1">{q}</div>
              <div className="text-sm text-gray-500 leading-relaxed">{a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
