'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutUsSection() {
  return (
    <section className="bg-[#f4f1e6] py-12 relative overflow-hidden border-b border-border/20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-8 items-center mb-12">
          {/* Left Image */}
          <div className="w-full lg:w-1/2 relative flex justify-center items-start">
            <div 
              className="relative w-full max-w-[550px] rounded-[30px] overflow-hidden bg-[#f4f1e6]" 
              style={{ aspectRatio: '1.15' }}
            >
              <img 
                src="/home/about_us.png" 
                alt="Herbal Wellness Tea" 
                className="absolute top-0 left-0 w-full h-auto" 
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-1/2 space-y-7">
            <div className="flex items-center gap-3">
              <span className="text-[13px] font-bold uppercase tracking-[0.25em] text-[#4a6b3d]">About Us</span>
            </div>
            
            <h2 className="text-[28px] md:text-[36px] font-bold text-[#2c4a35] capitalize" style={{ fontFamily: 'Playfair Display, serif' }}>
              Rooted in Nature.<br />Inspired by Wellness.
            </h2>
            
            <p className="text-[15px] md:text-[17px] text-[#4a5c51] leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              At Herbal Wellness Tea, we believe that true wellness begins with nature. Our herbal teas are carefully crafted using handpicked, 100% natural ingredients to support your body, calm your mind, and uplift your everyday life.
            </p>
            
            <p className="text-[15px] md:text-[17px] text-[#4a5c51] leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              From calming blends to immunity boosters, every cup is made with love, purity and a promise of better well-being.
            </p>
            
            <div className="pt-2">
              <Link href="/about" className="inline-flex items-center gap-2 bg-[#4a6b3d] hover:bg-[#3b5930] text-white px-8 py-4 rounded-xl font-semibold text-[15px] transition-all shadow-[0_8px_20px_-6px_rgba(74,107,61,0.4)] hover:-translate-y-1">
                Learn More About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
