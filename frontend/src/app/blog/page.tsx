'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  "Herbal Tea",
  "Wellness",
  "Ingredients",
  "Lifestyle",
  "Nutrition",
  "Healthy Living"
];

const ARTICLES = [
  {
    id: 1,
    category: "WELLNESS",
    title: "5 Herbal Teas That Support Better Sleep Naturally",
    description: "Discover how chamomile, lavender, and other botanicals can transform your nighttime routine into a calming ritual.",
    date: "May 28, 2026",
    img: "/home/img1.jpg"
  },
  {
    id: 2,
    category: "INGREDIENTS",
    title: "The Ancient Power of Turmeric in Modern Herbal Blends",
    description: "From Ayurvedic traditions to your morning cup — learn why turmeric remains one of the most valued healing spices.",
    date: "May 20, 2026",
    img: "/home/img4.jpg"
  },
  {
    id: 3,
    category: "LIFESTYLE",
    title: "Building a Daily Herbal Wellness Ritual in 10 Minutes",
    description: "Simple, actionable steps to incorporate herbal tea powders into your morning and evening routines for lasting health.",
    date: "May 12, 2026",
    img: "/home/img6.jpg"
  }
];

export default function BlogPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f5f0e6] pt-6 md:pt-8">
      
      {/* Back Button Container */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full border border-[#d1c8ba] flex items-center justify-center text-[#1c2e24] hover:bg-[#e8e3d9] transition-colors z-10"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>

      {/* Hero Section */}
      <section className="bg-transparent pt-6 pb-8 md:pt-10 md:pb-10 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#8cb73d] mb-4 sm:mb-6"
          >
            Our Journal
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[32px] sm:text-[40px] md:text-[52px] font-medium text-[#1c2e24] leading-[1.2] mb-6 uppercase"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            FROM THE BLOG
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[15px] sm:text-[17px] text-[#6b7b72] leading-[1.8] max-w-2xl mx-auto"
            style={{ fontFamily: 'Nunito Sans, sans-serif' }}
          >
            Insights, tips, and stories from the world of herbal wellness to inspire your daily routine.
          </motion.p>
        </div>
      </section>

      {/* Featured Blog Articles Section */}
      <section className="bg-transparent pt-6 pb-20 md:pt-10 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {ARTICLES.map((article, idx) => (
              <motion.article 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                key={article.id}
                className="group flex flex-col bg-white rounded-[20px] overflow-hidden shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_-10px_rgba(44,74,53,0.12)] border border-[#e8e5de] transition-all duration-500 h-full"
              >
                {/* Image Container with Zoom Effect */}
                <div className="relative aspect-[4/3] w-full overflow-hidden shrink-0 bg-gray-100">
                  <img 
                    src={article.img} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8cb73d]">
                      {article.category}
                    </span>
                    <span className="text-[12px] text-[#6b7b72]/60 font-black">•</span>
                    <span className="text-[11px] text-[#6b7b72]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                      {article.date}
                    </span>
                  </div>
                  
                  <h3 
                    className="text-[18px] md:text-[20px] font-semibold text-[#1c2e24] leading-[1.4] mb-3 group-hover:text-[#2c4a35] transition-colors line-clamp-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {article.title}
                  </h3>
                  
                  <p 
                    className="text-[14px] text-[#6b7b72] leading-[1.7] mb-6 flex-grow line-clamp-3"
                    style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                  >
                    {article.description}
                  </p>
                  
                  <Link 
                    href={`/blog/${article.id}`} 
                    className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.15em] text-[#1c2e24] hover:text-[#8cb73d] transition-colors group/link mt-auto w-fit"
                    style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                  >
                    READ MORE <ArrowRight className="h-4 w-4 stroke-[2] transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
