import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'success'>('cart');
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    shippingAddress: '',
    poNumber: ''
  });
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 45;
  const total = subtotal + shipping;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrder = `GS-PO-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrder);
    setCheckoutStep('success');
  };

  const handleFinish = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md border-l border-slate-800 bg-slate-900 shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white">Hardware Order Dispatch</h2>
              <p className="text-xs text-slate-400">Gikspot Direct Equipment Procurement</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            
            {checkoutStep === 'cart' && (
              <>
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center text-slate-400">
                    <p className="text-sm font-medium">Your hardware cart is empty</p>
                    <p className="text-xs text-slate-500 mt-1">Browse our sensors and PLCs to configure your deployment</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between gap-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="text-[10px] font-mono text-cyan-400 uppercase">
                              {item.product.category} · {item.product.sku}
                            </div>
                            <h4 className="text-xs font-bold text-white truncate mt-0.5">
                              {item.product.name}
                            </h4>
                            <div className="text-[11px] text-slate-400 mt-1 font-mono">
                              ${item.product.price} each
                            </div>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                            title="Remove"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-850 pt-2.5">
                          <div className="flex items-center border border-slate-800 rounded bg-slate-900 text-xs">
                            <button
                              onClick={() => onUpdateQty(item.product.id, -1)}
                              className="px-2 py-0.5 text-slate-300 hover:text-white cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-2 font-mono font-bold text-white tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQty(item.product.id, 1)}
                              className="px-2 py-0.5 text-slate-300 hover:text-white cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-sm font-mono font-bold text-white tabular-nums">
                            ${item.product.price * item.quantity}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {checkoutStep === 'details' && (
              <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Company &amp; Delivery Information
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">Company / Entity Name *</label>
                  <input
                    required
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Acme Industrial Systems Ltd."
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">Procurement Officer Name *</label>
                  <input
                    required
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="Alex Morgan"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">Corporate Email Address *</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="a.morgan@acme-industrial.com"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">Facility Receiving Address *</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.shippingAddress}
                    onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                    placeholder="Dock 4, Industrial Logistics Center, 100 Technology Pkwy"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">Purchase Order (PO) Number (Optional)</label>
                  <input
                    type="text"
                    value={formData.poNumber}
                    onChange={(e) => setFormData({ ...formData, poNumber: e.target.value })}
                    placeholder="PO-2027-0899"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950 text-[11px] text-slate-400 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>B2B Net 30 invoicing available upon verified D&amp;B credit check.</span>
                </div>
              </form>
            )}

            {checkoutStep === 'success' && (
              <div className="text-center py-8 space-y-4">
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-bold text-white">Order Confirmed</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your purchase requisition <span className="font-mono text-cyan-400 font-bold">{orderNumber}</span> has been routed to Gikspot Hardware Fulfillment.
                </p>

                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-left text-xs font-mono space-y-1.5">
                  <div className="text-slate-400">Recipient: <span className="text-white">{formData.companyName}</span></div>
                  <div className="text-slate-400">Attention: <span className="text-white">{formData.contactName}</span></div>
                  <div className="text-slate-400">Total Charged: <span className="text-cyan-400 font-bold">${total} USD</span></div>
                  <div className="text-slate-400">Dispatch SLA: <span className="text-emerald-400">Within 24-48 Hours</span></div>
                </div>

                <button
                  onClick={handleFinish}
                  className="w-full py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            )}

          </div>

          {/* Drawer Footer with Subtotals */}
          {checkoutStep !== 'success' && items.length > 0 && (
            <div className="border-t border-slate-800 px-6 py-4 space-y-3 bg-slate-950">
              <div className="space-y-1 text-xs text-slate-400 font-mono">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums text-white">${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Industrial Freight</span>
                  <span className="tabular-nums text-white">
                    {shipping === 0 ? 'Complimentary' : `$${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-850">
                  <span>Total</span>
                  <span className="tabular-nums text-cyan-400">${total} USD</span>
                </div>
              </div>

              {checkoutStep === 'cart' ? (
                <button
                  onClick={() => setCheckoutStep('details')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  <span>Proceed to Dispatch Details</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white border border-slate-800 rounded-lg cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    form="checkout-form"
                    className="flex-1 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer shadow-sm"
                  >
                    Confirm Purchase Order
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
