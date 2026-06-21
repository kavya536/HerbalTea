'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Leaf, Smile, Apple, Microscope, Coffee, Sun, Sprout, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import SharedArticleGrid from '../../components/SharedArticleGrid';

const CATEGORIES = [
  "Herbal Tea",
  "Wellness",
  "Ingredients",
  "Lifestyle",
  "Nutrition",
  "Healthy Living"
];

export { TOPICS, ARTICLES } from './articlesData';

export default function BlogPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f5f0e6]">
      
      {/* Featured Article Banner / Hero */}
      <section className="w-full">
        <Link href="/blog/4" className="relative block w-full min-h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden group">
          {/* Background Image */}
          <div className="absolute inset-0 bg-[#111]">
            <img 
              src="/blog/blog hero.png" 
              alt="The Power Of Herbal Tea" 
              className="w-full h-full object-cover object-right"
            />
          </div>

          {/* Text Content overlaying the left side */}
          <div className="relative h-full w-full max-w-7xl mx-auto flex flex-col justify-center px-6 py-10 md:px-10 lg:px-16 z-10">
            <div className="max-w-xl">
              <h2 className="text-[34px] md:text-[38px] lg:text-[46px] font-bold text-white mb-6 md:mb-8 leading-[1.15]" style={{ fontFamily: 'Playfair Display, serif' }}>
                The Power Of<br />Herbal Tea In<br />Modern Wellness
              </h2>
              
              {/* Author and Meta Info */}
              <div className="flex flex-col gap-4">
                {/* Author */}
                <div className="flex items-center gap-3">
                  <img src="https://i.pravatar.cc/150?img=32" alt="Ananya Sharma" className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/20 object-cover" />
                  <div className="flex flex-col">
                    <span className="text-white text-[13px] md:text-[14px] font-bold" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>By Ananya Sharma</span>
                    <span className="text-[#d1dcd5] text-[12px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Herbal Wellness Expert</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-5 text-white/80 mt-1">
                  {/* Date */}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" strokeWidth={2} />
                    <span className="text-[13px] font-medium tracking-wide" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>May 20, 2025</span>
                  </div>
                  
                  {/* Read Time */}
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" strokeWidth={2} />
                    <span className="text-[13px] font-medium tracking-wide" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>6 min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>

      <SharedArticleGrid basePath="/blog" />

      {/* Promotional Section */}
      <section className="w-full pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            
            {/* Left Image Area */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img 
                src="/blog/blog_left_img.png" 
                alt="Ruby Calm Tea" 
                className="max-w-full h-auto object-contain"
              />
            </div>

            {/* Right Content Area */}
            <div className="w-full md:w-1/2 flex flex-col items-start">
              <h2 className="text-[32px] md:text-[40px] font-bold text-[#0F3D2E] mb-4 leading-[1.1]" style={{ fontFamily: 'Playfair Display, serif' }}>
                Sip The Wellness<br />You Read About
              </h2>

              <p className="text-[15px] md:text-[16px] text-[#6b7b72] mb-8 leading-relaxed max-w-[450px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                Bring ancient herbal wisdom into your daily ritual with our best-selling blends. Each cup is thoughtfully crafted to nourish your body and elevate your well-being.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 mb-10">
                <div className="flex items-center gap-3">
                  <Smile className="w-5 h-5 text-[#5e8b42]" strokeWidth={2} />
                  <span className="text-[14px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Relaxation Support</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Coffee className="w-5 h-5 text-[#5e8b42]" strokeWidth={2} />
                  <span className="text-[14px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Naturally Caffeine Free</span>
                </div>

                <div className="flex items-center gap-3">
                  <Sprout className="w-5 h-5 text-[#5e8b42]" strokeWidth={2} />
                  <span className="text-[14px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Adaptogen Rich</span>
                </div>

                <div className="flex items-center gap-3">
                  <Apple className="w-5 h-5 text-[#5e8b42]" strokeWidth={2} />
                  <span className="text-[14px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Premium Ingredients</span>
                </div>
              </div>

              <Link href="/shop" className="bg-[#2c4a35] hover:bg-[#1c2e24] text-white px-8 py-3.5 rounded flex items-center gap-2 font-bold text-[14px] transition-colors shadow-sm">
                Shop Ruby Calm Tea
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full bg-[#2a4530] py-12 md:py-14">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 md:px-16 lg:px-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            
            {/* Left Content */}
            <div className="w-full md:w-1/2 flex flex-col items-start text-white">
              <h3 className="text-[24px] md:text-[28px] font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Stay Inspired Naturally
              </h3>
              <p className="text-[14px] text-[#d1dcd5] leading-relaxed max-w-[400px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                Receive herbal insights, exclusive wellness stories and new tea releases.
              </p>
            </div>

            {/* Right Form Area */}
            <div className="w-full md:w-1/2 flex flex-col w-full">
              <form className="w-full max-w-[480px] md:ml-auto" onSubmit={(e) => e.preventDefault()}>
                <div className="flex w-full rounded-[4px] overflow-hidden">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-grow px-4 py-3 md:py-3.5 text-[#0F3D2E] bg-white outline-none text-[14px] font-medium placeholder-[#8a958f]"
                    style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                  />
                  <button type="submit" className="bg-[#dcae3d] hover:bg-[#c99f36] text-white px-6 md:px-8 py-3 md:py-3.5 font-bold text-[14px] transition-colors whitespace-nowrap" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    Subscribe
                  </button>
                </div>
                <p className="text-[11px] text-[#aebbb5] mt-2.5 text-left" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  No spam, ever. Unsubscribe anytime.
                </p>
              </form>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
