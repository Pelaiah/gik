import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { DigitalTwinDemo } from './components/DigitalTwinDemo';
import { SmartFacilityVisualizer } from './components/SmartFacilityVisualizer';
import { HardwareShop } from './components/HardwareShop';
import { ArchitectureEstimator } from './components/ArchitectureEstimator';
import { FutureGamingArena } from './components/FutureGamingArena';
import { CaseStudies } from './components/CaseStudies';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ConsultationModal } from './components/ConsultationModal';
import { NavigationTab, HardwareProduct, CartItem } from './types';
import { HARDWARE_PRODUCTS } from './data/mockData';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentTab, setCurrentTab] = useState<NavigationTab>('overview');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: HARDWARE_PRODUCTS[0],
      quantity: 2
    },
    {
      product: HARDWARE_PRODUCTS[1],
      quantity: 1
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationScope, setConsultationScope] = useState('');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Cart operations
  const handleAddToCart = (product: HardwareProduct, quantity: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenConsultationWithScope = (scope?: string) => {
    setConsultationScope(scope || '');
    setIsConsultationOpen(true);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      isDark
        ? 'bg-black text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200'
        : 'bg-slate-50 text-slate-900 selection:bg-emerald-500/30 selection:text-emerald-800'
    }`}>
      
      {/* Floating Pill Navigation Island matching reference images */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenConsultation={() => {
          const contactEl = document.getElementById('contact');
          if (contactEl) {
            contactEl.scrollIntoView({ behavior: 'smooth' });
          } else {
            setConsultationScope('');
            setIsConsultationOpen(true);
          }
        }}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main View Flow */}
      <main className="flex-1">
        {currentTab === 'overview' && (
          <>
            <Hero
              onNavigate={setCurrentTab}
              onOpenConsultation={() => {
                const contactEl = document.getElementById('contact');
                if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
              }}
              theme={theme}
            />
            <ServicesSection
              onNavigate={setCurrentTab}
              onOpenConsultation={() => setIsConsultationOpen(true)}
              theme={theme}
            />
            <DigitalTwinDemo theme={theme} />
            <SmartFacilityVisualizer theme={theme} />
            <HardwareShop
              onAddToCart={handleAddToCart}
              onOpenConsultationWithScope={handleOpenConsultationWithScope}
              theme={theme}
            />
            <ArchitectureEstimator
              onOpenConsultationWithScope={handleOpenConsultationWithScope}
              theme={theme}
            />
            <CaseStudies theme={theme} />
            <FutureGamingArena theme={theme} />
            {/* FAQ Accordion Section for Client Inquiries */}
            <FAQSection
              theme={theme}
              onOpenConsultation={handleOpenConsultationWithScope}
            />
            {/* Exact Contact Form from Reference Picture 2 */}
            <ContactSection
              theme={theme}
              initialScope={consultationScope}
            />
          </>
        )}

        {currentTab === 'services' && (
          <>
            <ServicesSection
              onNavigate={setCurrentTab}
              onOpenConsultation={() => setIsConsultationOpen(true)}
              theme={theme}
            />
            <ArchitectureEstimator
              onOpenConsultationWithScope={handleOpenConsultationWithScope}
              theme={theme}
            />
            <CaseStudies theme={theme} />
            <FAQSection
              theme={theme}
              onOpenConsultation={handleOpenConsultationWithScope}
            />
            <ContactSection theme={theme} />
          </>
        )}

        {currentTab === 'predictive-ai' && (
          <>
            <DigitalTwinDemo theme={theme} />
            <CaseStudies theme={theme} />
            <ContactSection theme={theme} />
          </>
        )}

        {currentTab === 'smart-iot' && (
          <>
            <SmartFacilityVisualizer theme={theme} />
            <HardwareShop
              onAddToCart={handleAddToCart}
              onOpenConsultationWithScope={handleOpenConsultationWithScope}
              theme={theme}
            />
            <ContactSection theme={theme} />
          </>
        )}

        {currentTab === 'hardware-shop' && (
          <>
            <HardwareShop
              onAddToCart={handleAddToCart}
              onOpenConsultationWithScope={handleOpenConsultationWithScope}
              theme={theme}
            />
            <ContactSection theme={theme} />
          </>
        )}

        {currentTab === 'estimator' && (
          <>
            <ArchitectureEstimator
              onOpenConsultationWithScope={handleOpenConsultationWithScope}
              theme={theme}
            />
            <ContactSection theme={theme} initialScope={consultationScope} />
          </>
        )}

        {currentTab === 'gaming-future' && (
          <>
            <FutureGamingArena theme={theme} />
            <ContactSection theme={theme} />
          </>
        )}
      </main>

      {/* Cart & Hardware Procurement Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Quick Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialScope={consultationScope}
      />

      {/* Footer */}
      <Footer
        onSelectTab={setCurrentTab}
        onOpenConsultation={() => {
          const contactEl = document.getElementById('contact');
          if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
        }}
        theme={theme}
      />

    </div>
  );
}
