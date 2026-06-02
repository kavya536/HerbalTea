'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary/20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold tracking-wider uppercase text-accent">Eduqra Wellness</h3>
            <p className="text-xs text-primary-foreground/70 leading-relaxed">
              Curating premium, high-altitude herbal tea powders and holistic wellness botanical remedies to nurture your mind, body, and spirit.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Shop Collections</h4>
            <ul className="space-y-2 text-xs text-primary-foreground/80">
              <li><a href="#" className="hover:text-accent transition-colors">Matcha Powders</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Herbal Infusions</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Gift Sets</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Teaware</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Information</h4>
            <ul className="space-y-2 text-xs text-primary-foreground/80">
              <li><a href="#" className="hover:text-accent transition-colors">Our Sourcing</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">FAQS</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-accent">Subscribe</h4>
            <p className="text-xs text-primary-foreground/70">Join our newsletter to receive tea blends updates, recipes, and private sales.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-l-md border-0 bg-primary-foreground/10 px-3.5 py-2 text-xs text-primary-foreground placeholder-primary-foreground/50 focus:ring-1 focus:ring-accent outline-none"
              />
              <button
                type="submit"
                className="rounded-r-md bg-accent px-4 py-2 text-xs font-semibold text-background hover:bg-accent/90 transition-colors cursor-pointer"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Eduqra Wellness. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-accent">Privacy Policy</a>
            <a href="#" className="hover:text-accent">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
