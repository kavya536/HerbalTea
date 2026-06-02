'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '../features/cart/cartStore';
import { ShoppingBag, X, Plus, Minus, Trash2, User as UserIcon, LogOut } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../providers/AuthProvider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const { items, addItem, removeItem, updateQuantity, getTotalCents, getItemCount } = useCartStore();
  const { user, logout } = useAuth();
  const router = useRouter();
  
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted ? getItemCount() : 0;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
            <span className="text-xl font-semibold tracking-wider text-primary">EDUQRA</span>
            <span className="text-xs uppercase tracking-widest text-accent font-medium">Wellness</span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
            <Link href="/" className="hover:text-primary transition-colors">Shop</Link>
            <a href="#" className="hover:text-primary transition-colors">Our Blend</a>
            <a href="#" className="hover:text-primary transition-colors">Subscriptions</a>
            <a href="#" className="hover:text-primary transition-colors">About Us</a>
          </nav>

          {/* User Controls and Cart */}
          <div className="flex items-center gap-4">
            {mounted && (
              <>
                {user ? (
                  <div className="flex items-center gap-3 text-xs font-semibold text-primary">
                    <span className="hidden sm:inline-block max-w-[120px] truncate">
                      Hi, {user.displayName || user.email?.split('@')[0]}
                    </span>
                    <button
                      onClick={() => logout()}
                      className="p-2 rounded-full hover:bg-secondary text-primary hover:text-red-600 transition-all cursor-pointer"
                      title="Sign Out"
                    >
                      <LogOut className="h-4.5 w-4.5" />
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 hover:border-primary px-3 py-1.5 text-xs font-semibold text-primary transition-colors"
                  >
                    <UserIcon className="h-3.5 w-3.5" /> Sign In
                  </Link>
                )}
              </>
            )}

            {/* Cart Trigger */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center justify-center p-2 text-primary hover:text-accent transition-colors cursor-pointer"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-6 w-6 stroke-[1.5]" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-background animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-background shadow-2xl border-l border-border"
            >
              <div className="flex items-center justify-between border-b border-border p-5">
                <h2 className="text-lg font-semibold text-primary">Your Selection ({totalItems})</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1.5 text-foreground/60 hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {!mounted || items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <ShoppingBag className="h-12 w-12 text-muted mb-4 stroke-[1]" />
                    <p className="text-sm text-foreground/75 font-medium">Your cart is empty</p>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="mt-4 text-xs font-semibold uppercase tracking-widest text-accent hover:underline cursor-pointer"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.sku} className="flex gap-4 border-b border-border/40 pb-4 last:border-0 last:pb-0">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-foreground">{item.name}</h3>
                        <p className="text-xs text-muted mt-0.5">SKU: {item.sku}</p>
                        <p className="text-sm font-semibold text-primary mt-2">
                          ${(item.priceCents / 100).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.sku)}
                          className="text-muted hover:text-red-600 transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4 stroke-[1.5]" />
                        </button>
                        <div className="flex items-center gap-2.5 rounded-full border border-border bg-background px-2.5 py-1">
                          <button
                            onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                            className="text-foreground/70 hover:text-primary cursor-pointer"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => addItem(item)}
                            className="text-foreground/70 hover:text-primary cursor-pointer"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Summary */}
              {mounted && items.length > 0 && (
                <div className="border-t border-border bg-secondary/30 p-5 space-y-4">
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span className="text-foreground/70">Subtotal</span>
                    <span className="text-primary font-semibold">${(getTotalCents() / 100).toFixed(2)}</span>
                  </div>
                  <p className="text-[11px] text-muted">Shipping and discounts calculated at checkout.</p>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      router.push('/checkout');
                    }}
                    className="w-full rounded-md bg-primary py-3 text-center text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-primary/95 transition-all shadow-md active:scale-[0.98] cursor-pointer"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
