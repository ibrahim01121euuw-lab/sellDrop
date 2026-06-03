import React, { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import { supabase, SavedProduct } from './supabase';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import SearchPage from './pages/SearchPage';
import ProductDetails from './pages/ProductDetails';
import SavedProducts from './pages/SavedProducts';
import PricingPage from './pages/PricingPage';
import ProfilePage from './pages/ProfilePage';
import Sidebar from './Sidebar';
import SellDropLogo from './SellDropLogo';

type Page = 'landing' | 'auth' | 'dashboard' | 'search' | 'product' | 'saved' | 'pricing' | 'profile';

function AppShell() {
  const { session, profile, loading } = useAuth();
  const [page, setPage] = useState<Page>('landing');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([]);
  const [savedProductIds, setSavedProductIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!loading) {
      if (session) {
        setPage('dashboard');
      } else {
        setPage('landing');
      }
    }
  }, [session, loading]);

  useEffect(() => {
    if (profile) loadSavedProducts();
  }, [profile]);

  async function loadSavedProducts() {
    if (!profile) return;
    const { data } = await supabase
      .from('saved_products')
      .select('*')
      .eq('user_id', profile.id)
      .order('created_at', { ascending: false });
    const products = data ?? [];
    setSavedProducts(products);
    setSavedProductIds(new Set(products.map((p) => p.product_id)));
  }

  function navigate(p: string, productId?: string) {
    setPage(p as Page);
    if (productId) setSelectedProductId(productId);
  }

  async function handleSave(product: Product) {
    if (!profile) return;
    await supabase.from('saved_products').upsert({
      user_id: profile.id,
      product_id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      image_url: product.image_url,
      category: product.category,
      source: product.source,
      rating: product.rating,
      reviews_count: product.reviews_count,
      trend_score: product.trend_score,
    });
    await loadSavedProducts();
  }

  async function handleUnsave(productId: string) {
    if (!profile) return;
    await supabase.from('saved_products').delete().eq('user_id', profile.id).eq('product_id', productId);
    await loadSavedProducts();
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 text-red-600 animate-pulse">
            <SellDropLogo size={40} />
          </div>
          <span className="text-sm text-gray-400">Loading SellDrop...</span>
        </div>
      </div>
    );
  }

  if (!session) {
    if (page === 'auth') return <AuthPage onNavigate={navigate} />;
    return <LandingPage onGetStarted={() => setPage('auth')} />;
  }

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard onNavigate={navigate} />;
      case 'search':
        return (
          <SearchPage
            onNavigate={navigate}
            savedProductIds={savedProductIds}
            onSave={handleSave}
            onUnsave={handleUnsave}
          />
        );
      case 'product':
        return selectedProductId ? (
          <ProductDetails
            productId={selectedProductId}
            isSaved={savedProductIds.has(selectedProductId)}
            onSave={handleSave}
            onUnsave={handleUnsave}
            onBack={() => setPage('search')}
          />
        ) : null;
      case 'saved':
        return <SavedProducts savedProducts={savedProducts} onUnsave={handleUnsave} onNavigate={navigate} />;
      case 'pricing':
        return <PricingPage onNavigate={navigate} />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <Dashboard onNavigate={navigate} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage={page} onNavigate={navigate} />
      <main className="flex-1 overflow-y-auto md:pt-0 pt-14">
        {renderPage()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}
