'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '../features/cart/cartStore';
import { useWishlistStore } from '../features/wishlist/wishlistStore';
import { ShoppingBag, X, Plus, Minus, Trash2, User as UserIcon, LogOut, Leaf, Search, Heart, Menu } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../providers/AuthProvider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const { items, addItem, removeItem, updateQuantity, getTotalCents, getItemCount } = useCartStore();
  const wishlistItems = useWishlistStore(state => state.items);
  const { user, logout } = useAuth();
  const router = useRouter();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted ? getItemCount() : 0;
  const wishlistCount = mounted ? wishlistItems.length : 0;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-[#f5f0e6]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Nav Links Group */}
          <div className="flex items-center gap-10">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
              <Leaf className="h-6 w-6 text-[#2c4a35] fill-[#2c4a35]/15" />
              <span className="text-xl font-bold tracking-tight text-[#2c4a35]">Herbal Tea</span>
            </div>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#2c4a35]">
              <Link href="/" className="hover:text-accent transition-colors">
                Home
              </Link>
              <Link href="/shop" className="hover:text-accent transition-colors">
                Shop
              </Link>
              <Link href="/blog" className="hover:text-accent transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="hover:text-accent transition-colors">
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative hidden lg:flex items-center bg-white border border-gray-200/80 rounded-full pl-4 pr-1 py-0.5 w-60 h-10">
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent text-xs text-foreground placeholder-gray-400 focus:outline-none w-full pr-6 py-1"
              />
              <button className="bg-[#e2b755] text-white p-2 rounded-full hover:bg-[#d4a844] transition-colors flex items-center justify-center cursor-pointer">
                <Search className="h-4 w-4 text-slate-800" />
              </button>
            </div>

            {/* Wishlist Heart */}
            <button 
              onClick={() => router.push('/wishlist')}
              className="relative bg-[#e2b755] text-white p-2.5 rounded-full hover:bg-[#d4a844] transition-colors flex items-center justify-center cursor-pointer ml-8"
              aria-label="Open wishlist"
            >
              <Heart className="h-4.5 w-4.5 text-slate-800" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => router.push('/cart')}
              className="relative bg-[#e2b755] text-white p-2.5 rounded-full hover:bg-[#d4a844] transition-colors flex items-center justify-center cursor-pointer ml-2"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-4.5 w-4.5 text-slate-800" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Auth controls */}
            {mounted && (
              <>
                {user ? (
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary ml-2">
                    <span className="hidden sm:inline-block max-w-[80px] truncate">
                      {user.displayName || user.email?.split('@')[0]}
                    </span>
                    <button
                      onClick={() => logout()}
                      className="p-1 rounded-full hover:bg-secondary text-primary hover:text-red-600 transition-all cursor-pointer"
                      title="Sign Out"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1 rounded-full border border-primary/20 hover:border-primary px-2.5 py-1 text-xs font-semibold text-primary transition-colors ml-2"
                  >
                    <UserIcon className="h-3 w-3" />
                  </Link>
                )}
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-full text-[#2c4a35] hover:bg-[#e8e5de] transition-colors ml-1 cursor-pointer"
            >
              <Menu className="h-6 w-6" />
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
                          ₹{(item.priceCents / 100).toFixed(2)}
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
                            onClick={() => {
                              if (item.quantity - 1 === 0) {
                                removeItem(item.sku);
                              } else {
                                updateQuantity(item.sku, item.quantity - 1);
                              }
                            }}
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
                    <span className="text-primary font-semibold">₹{(getTotalCents() / 100).toFixed(2)}</span>
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

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black md:hidden"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-[#f5f0e6] shadow-2xl border-r border-[#e8e5de] md:hidden"
            >
              <div className="flex items-center justify-between border-b border-[#e8e5de] p-5">
                <div className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-[#2c4a35] fill-[#2c4a35]/15" />
                  <span className="text-lg font-bold tracking-tight text-[#2c4a35]">Herbal Tea</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-full p-1.5 text-[#2c4a35] hover:bg-[#e8e5de] transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <div className="flex flex-col p-5 space-y-6 mt-4">
                <Link 
                  href="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[16px] font-semibold text-[#2c4a35] hover:text-[#c49d56] transition-colors"
                >
                  Home
                </Link>
                <Link 
                  href="/shop" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[16px] font-semibold text-[#2c4a35] hover:text-[#c49d56] transition-colors"
                >
                  Shop
                </Link>
                <Link 
                  href="/blog" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[16px] font-semibold text-[#2c4a35] hover:text-[#c49d56] transition-colors"
                >
                  Blog
                </Link>
                <Link 
                  href="/contact" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[16px] font-semibold text-[#2c4a35] hover:text-[#c49d56] transition-colors"
                >
                  Contact Us
                </Link>
              </div>

              {/* Mobile Bottom Section */}
              <div className="mt-auto border-t border-[#e8e5de] p-5">
                <p className="text-xs text-[#6b7b72] text-center" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  © 2026 Eduqra Wellness. All rights reserved.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
