'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#2a3f30] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="bg-[#F8F5EE] rounded-full p-1.5 flex items-center justify-center">
                <img src="/home/herbal_logo.png" alt="HerbalTea Logo" className="h-8 w-8 object-contain" />
              </div>
              <h3 className="text-md font-semibold tracking-wider uppercase text-[#c49d56]" style={{ fontFamily: 'Playfair Display, serif' }}>Herbal Tea</h3>
            </div>
            <p className="text-[13px] text-white/80 leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              Curating premium, high-altitude herbal tea powders and holistic wellness botanical remedies to nurture your mind, body, and spirit.
            </p>
            <div className="flex gap-4 pt-1">
              <a href="#" className="text-white/70 hover:text-[#d7b56d] transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="text-white/70 hover:text-[#d7b56d] transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="text-white/70 hover:text-[#d7b56d] transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#c49d56] mb-5">Quick Links</h4>
            <ul className="space-y-3 text-[13px] text-white/80">
              <li><a href="/" className="hover:text-[#d7b56d] transition-colors">Home</a></li>
              <li><a href="/blog" className="hover:text-[#d7b56d] transition-colors">Blog</a></li>
              <li><a href="/about" className="hover:text-[#d7b56d] transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-[#d7b56d] transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#c49d56] mb-5">Information</h4>
            <ul className="space-y-3 text-[13px] text-white/80">
              <li><a href="#" className="hover:text-[#d7b56d] transition-colors">Our Sourcing</a></li>
              <li><a href="#" className="hover:text-[#d7b56d] transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-[#d7b56d] transition-colors">FAQS</a></li>
              <li><a href="#" className="hover:text-[#d7b56d] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#c49d56]">Subscribe</h4>
            <p className="text-[13px] text-white/80">Join our newsletter to receive tea blends updates, recipes, and private sales.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex pt-2">
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-l-md border-0 bg-white/10 px-4 py-2.5 text-[13px] text-white placeholder-white/50 focus:ring-1 focus:ring-[#c49d56] outline-none"
              />
              <button
                type="submit"
                className="rounded-r-md bg-[#c49d56] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#b08b49] transition-colors cursor-pointer"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-[12px] text-white/50">
          <p>© {new Date().getFullYear()} Herbal Tea. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-[#d7b56d] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#d7b56d] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
