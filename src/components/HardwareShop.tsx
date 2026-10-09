import React, { useState } from 'react';
import { Search, Plus, Check, ShoppingBag, Eye, Cpu, Radio, ShieldCheck, Zap } from 'lucide-react';
import { HARDWARE_PRODUCTS } from '../data/mockData';
import { HardwareProduct } from '../types';

interface HardwareShopProps {
  onAddToCart: (product: HardwareProduct, quantity: number) => void;
  onOpenConsultationWithScope: (rfqSummary: string) => void;
  theme?: 'dark' | 'light';
}

export const HardwareShop: React.FC<HardwareShopProps> = ({
  onAddToCart,
  onOpenConsultationWithScope,
  theme = 'dark'
}) => {
  const isDark = theme === 'dark';
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProtocol, setSelectedProtocol] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<HardwareProduct | null>(null);
  const [modalQty, setModalQty] = useState<number>(1);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const categories = ['All', 'Sensors', 'Industrial Controllers', 'Automation Hardware', 'IoT Gateways', 'Prototyping'];
  const protocols = ['All', 'MQTT', 'Modbus', 'Matter', 'LoRaWAN', 'CAN bus'];

  const filteredProducts = HARDWARE_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesProtocol = selectedProtocol === 'All' || product.protocol.toLowerCase().includes(selectedProtocol.toLowerCase());
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesProtocol && matchesSearch;
  });

  const handleQuickAdd = (product: HardwareProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setAddedNotice(product.id);
    setTimeout(() => setAddedNotice(null), 2000);
  };

  const handleOpenDetail = (product: HardwareProduct) => {
    setSelectedProduct(product);
    setModalQty(1);
  };

  const handleModalAdd = () => {
    if (selectedProduct) {
      onAddToCart(selectedProduct, modalQty);
      setSelectedProduct(null);
    }
  };

  const handleRequestRFQ = (product: HardwareProduct) => {
    setSelectedProduct(null);
    onOpenConsultationWithScope(`B2B Volume RFQ for: ${product.name} (SKU: ${product.sku}) - Quantity requested: ${modalQty > 1 ? modalQty : 25}+ units`);
  };

  return (
    <section className={`py-24 border-b transition-colors duration-300 ${
      isDark ? 'bg-black text-white border-white/10' : 'bg-slate-50 text-slate-900 border-slate-200'
    }`}>
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md mb-4 ${
              isDark
                ? 'bg-white/[0.04] border-white/10 text-slate-300'
                : 'bg-white/80 border-slate-200 text-slate-700 shadow-sm'
            }`}>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Gikspot Vendor Shop</span>
            </div>
            <h2
              className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
              style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}
            >
              Certified Hardware, Controllers &amp; Smart Sensors
            </h2>
            <p className={`text-sm sm:text-base mt-2 max-w-2xl ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Factory-calibrated DIN-rail PLCs, vibration telemetry pods, Matter-compatible gateways, and high-reliability automation relays for industrial and facility deployments.
            </p>
          </div>

          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs backdrop-blur-xl ${
            isDark ? 'bg-white/[0.04] border-white/10 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
          }`}>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>2-Year Industrial Warranty &amp; CE/UL Certified</span>
          </div>
        </div>

        {/* Featured Hardware Hero Banner */}
        <div className={`mb-12 rounded-3xl overflow-hidden border p-6 sm:p-8 backdrop-blur-2xl shadow-2xl transition-all ${
          isDark ? 'bg-slate-900/30 border-white/10' : 'bg-white/85 border-slate-200 shadow-slate-200'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-slate-800 aspect-[4/3] bg-slate-950">
              <img
                src="/src/assets/images/hardware_sensor_controller_1791225125643.jpg"
                alt="Gikspot Edge Controller and Modular Sensor Hub"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-300 flex items-center justify-between">
                <span className="font-mono text-[11px] text-cyan-300">SKU: GS-PLC-800 &amp; GS-VIB-980</span>
                <span className="text-slate-400">DIN 35mm Standard</span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                Direct Vendor Hardware Catalog
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Engineered for harsh industrial envelopes &amp; mission-critical uptime.
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Every unit in our vendor shop is flashed with open, secure firmware, hardened against electromagnetic interference, and thoroughly tested in our laboratory before shipment. We provide direct API integration libraries in Python, Rust, and TypeScript.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-1 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Cpu className="h-4 w-4 text-cyan-400" />
                  <span>ARM Cortex &amp; RISC-V Cores</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Radio className="h-4 w-4 text-cyan-400" />
                  <span>LoRaWAN, Thread &amp; RS-485</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-cyan-400" />
                  <span>Sub-Millisecond I/O Latency</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => setSelectedCategory('Industrial Controllers')}
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
                >
                  View Industrial Controllers
                </button>
                <button
                  onClick={() => setSelectedCategory('Sensors')}
                  className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  View Telemetry Sensors
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sensors, PLCs, SKUs..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              >
              </input>
            </div>

            {/* Protocol Sub-filter */}
            <div className="flex items-center gap-2 self-start md:self-auto text-xs text-slate-400">
              <span>Protocol:</span>
              <div className="flex items-center gap-1 p-0.5 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto">
                {protocols.map((prot) => (
                  <button
                    key={prot}
                    onClick={() => setSelectedProtocol(prot)}
                    className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      selectedProtocol === prot ? 'bg-slate-800 text-cyan-300 font-semibold' : 'hover:text-white'
                    }`}
                  >
                    {prot}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-800 text-cyan-300 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleOpenDetail(product)}
              className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 hover:border-slate-700 transition-all duration-200 p-5 cursor-pointer"
            >
              <div>
                {/* Header Metadata (Clean unboxed text, no pills) */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="uppercase tracking-wider font-mono text-[11px] text-cyan-400">
                    {product.category}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">
                    SKU: {product.sku}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {product.name}
                </h3>

                <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                  {product.shortDesc}
                </p>

                {/* Technical Protocol line */}
                <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <span className="text-slate-500">Bus:</span> {product.protocol}
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold font-mono text-white tabular-nums">
                    ${product.price} <span className="text-xs font-normal text-slate-400">USD</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-medium">
                    {product.inStock ? `${product.stockCount} in stock` : 'Factory Backorder'}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDetail(product);
                    }}
                    aria-label="Inspect Specs"
                    className="p-2 rounded-lg border border-slate-700/80 bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(product, e)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors shadow-sm"
                  >
                    {addedNotice === product.id ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-3.5 w-3.5" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 text-slate-400 text-sm">
            No hardware items match your current filter criteria.
          </div>
        )}

      </div>

      {/* Product Specification & RFQ Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  {selectedProduct.category} · {selectedProduct.sku}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {selectedProduct.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedProduct.shortDesc}
            </p>

            {/* Key Features */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Engineering Highlights
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedProduct.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-3.5 w-3.5 text-cyan-400 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Datasheet Specs */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Datasheet Specifications
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {Object.entries(selectedProduct.specs).map(([k, v]) => (
                  <div key={k} className="p-2.5 rounded-lg border border-slate-800 bg-slate-950">
                    <div className="text-[10px] text-slate-500 uppercase">{k}</div>
                    <div className="text-slate-200 mt-0.5">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing & Checkout action */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-2xl font-bold font-mono text-white tabular-nums">
                  ${selectedProduct.price * modalQty} <span className="text-xs font-normal text-slate-400">USD</span>
                </div>
                <div className="text-xs text-slate-500">
                  Unit price: ${selectedProduct.price} · {selectedProduct.stockCount} in stock
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-slate-700 rounded-lg bg-slate-800">
                  <button
                    onClick={() => setModalQty(Math.max(1, modalQty - 1))}
                    className="px-2.5 py-1.5 text-slate-300 hover:text-white cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-2 font-mono text-xs text-white tabular-nums font-bold">
                    {modalQty}
                  </span>
                  <button
                    onClick={() => setModalQty(modalQty + 1)}
                    className="px-2.5 py-1.5 text-slate-300 hover:text-white cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleModalAdd}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Add to Order</span>
                </button>

                <button
                  onClick={() => handleRequestRFQ(selectedProduct)}
                  className="flex-1 sm:flex-none px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Enterprise RFQ
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
