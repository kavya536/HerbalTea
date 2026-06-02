'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../../features/cart/cartStore';
import { placeOrder } from '../../lib/api';
import { ArrowLeft, CreditCard, Lock, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../providers/AuthProvider';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalCents, clearCart } = useCartStore();
  const { user, idToken, loading: authLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Prepopulate authenticated user information when loaded
  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      setFullName(user.displayName || '');
    }
  }, [user]);

  const subtotalCents = getTotalCents();
  const shippingCents = subtotalCents > 5000 ? 0 : 500;
  const totalCents = subtotalCents + shippingCents;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setErrorMsg('Your cart is empty. Add items to checkout.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const addressObject = {
      fullName,
      address,
      city,
      state: stateName,
      postalCode,
      country: 'USA'
    };

    const addressJson = JSON.stringify(addressObject);

    try {
      const response = await placeOrder({
        userId: user?.uid || email, // Prefer authenticated Firebase UID
        totalCents: totalCents,
        discountCents: 0,
        shippingAddressJson: addressJson,
        billingAddressJson: addressJson,
        items: items.map(item => ({
          sku: item.sku,
          quantity: item.quantity,
          unitPriceCents: item.priceCents
        }))
      }, idToken); // Securely pass the ID token

      clearCart();
      router.push(`/checkout/success?orderId=${response.data?.id || ''}`);
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-xs font-medium text-muted">
        Verifying user credentials...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <button
        onClick={() => router.push('/')}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted hover:text-primary mb-8 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Shop
      </button>

      <h1 className="text-3xl font-light tracking-tight text-primary mb-10">Checkout</h1>

      {errorMsg && (
        <div className="mb-8 flex items-center gap-3 rounded-md bg-red-50 p-4 text-xs font-medium text-red-800 border border-red-200">
          <ShieldAlert className="h-5 w-5 shrink-0 text-red-600" />
          <p>{errorMsg}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form Column */}
        <div className="lg:col-span-7 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-md font-semibold uppercase tracking-wider text-primary border-b border-border/40 pb-2 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-foreground mb-1.5">Email address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    readOnly={!!user} // Locked down if logged in
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded border border-border bg-background px-3 py-2 text-xs text-foreground focus:ring-1 focus:ring-accent outline-none read-only:bg-secondary/20 read-only:text-muted"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-foreground mb-1.5">Full name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded border border-border bg-background px-3 py-2 text-xs text-foreground focus:ring-1 focus:ring-accent outline-none"
                    placeholder="Jane Doe"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-md font-semibold uppercase tracking-wider text-primary border-b border-border/40 pb-2 mb-4">Shipping Details</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-xs font-medium text-foreground mb-1.5">Street Address</label>
                  <input
                    type="text"
                    id="address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded border border-border bg-background px-3 py-2 text-xs text-foreground focus:ring-1 focus:ring-accent outline-none"
                    placeholder="123 Wellness Way"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-xs font-medium text-foreground mb-1.5">City</label>
                    <input
                      type="text"
                      id="city"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded border border-border bg-background px-3 py-2 text-xs text-foreground focus:ring-1 focus:ring-accent outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-xs font-medium text-foreground mb-1.5">State</label>
                    <input
                      type="text"
                      id="state"
                      required
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                      className="w-full rounded border border-border bg-background px-3 py-2 text-xs text-foreground focus:ring-1 focus:ring-accent outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="postal-code" className="block text-xs font-medium text-foreground mb-1.5">Postal Code</label>
                    <input
                      type="text"
                      id="postal-code"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full rounded border border-border bg-background px-3 py-2 text-xs text-foreground focus:ring-1 focus:ring-accent outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-md font-semibold uppercase tracking-wider text-primary border-b border-border/40 pb-2 mb-4">Payment Method</h2>
              <div className="rounded border border-border bg-secondary/10 p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-xs font-semibold text-primary">Simulated Secure Checkout</p>
                    <p className="text-[10px] text-muted">Stripe & Razorpay simulated execution.</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">
                  <Lock className="h-3 w-3" /> Secure
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className="w-full rounded bg-primary py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-primary/95 transition-all shadow active:scale-[0.98] disabled:bg-muted disabled:scale-100 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? 'Processing Order...' : 'Place Order'}
            </button>
          </form>
        </div>

        {/* Summary Column */}
        <div className="lg:col-span-5">
          <div className="rounded-lg border border-border bg-secondary/10 p-6 space-y-6">
            <h2 className="text-md font-semibold uppercase tracking-wider text-primary">Order Summary</h2>

            <div className="divide-y divide-border/40 max-h-80 overflow-y-auto pr-2 space-y-4">
              {items.length === 0 ? (
                <p className="text-xs text-muted">No items in your cart.</p>
              ) : (
                items.map((item) => (
                  <div key={item.sku} className="flex justify-between items-start text-xs pt-4 first:pt-0">
                    <div className="space-y-0.5">
                      <p className="font-semibold text-primary">{item.name}</p>
                      <p className="text-muted">Quantity: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-primary">${((item.priceCents * item.quantity) / 100).toFixed(2)}</span>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-border/60 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span>${(subtotalCents / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Shipping</span>
                <span>{shippingCents === 0 ? 'Free' : `$${(shippingCents / 100).toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-primary pt-2 border-t border-border/40">
                <span>Total</span>
                <span>${(totalCents / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
