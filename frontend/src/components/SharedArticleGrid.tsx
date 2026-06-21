'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TOPICS, ARTICLES } from '../app/blog/BlogView';

export default function SharedArticleGrid({ basePath = '/blog', topicHeading = 'Browse By Topic' }: { basePath?: string, topicHeading?: string }) {
  const [activeTopic, setActiveTopic] = useState('All');
  
  const filteredArticles = activeTopic === 'All' 
    ? ARTICLES 
    : ARTICLES.filter(article => article.tag.toLowerCase() === activeTopic.toLowerCase());

  return (
    <>
      {/* Browse By Topic Section */}
      <section className="bg-transparent pt-12 md:pt-20 pb-6 md:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="browse-by-topic" className="text-[26px] md:text-[32px] font-bold text-[#2c4a35] mb-8 scroll-mt-24" style={{ fontFamily: 'Playfair Display, serif' }}>
            {topicHeading}
          </h2>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {TOPICS.map((topic, idx) => {
              const Icon = topic.icon;
              const isActive = topic.name === activeTopic;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTopic(topic.name)}
                  className={`flex items-center justify-center px-6 py-2.5 rounded-full border transition-all duration-300 ${
                    isActive
                      ? 'bg-[#1c2e24] border-[#1c2e24] text-white shadow-md'
                      : 'bg-white border-[#e8e5de] text-[#0F3D2E] hover:border-[#8cb73d]/50 hover:shadow-sm'
                  }`}
                >
                  <span className={`text-[14px] md:text-[15px] font-bold`} style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    {topic.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Blog Articles Section */}
      <section className="bg-transparent pt-6 pb-20 md:pt-10 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredArticles.map((article, idx) => (
              <motion.article 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                key={article.id}
                className="group flex flex-col bg-white rounded-[12px] overflow-hidden shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_-8px_rgba(44,74,53,0.1)] border border-[#f0eee9] transition-all duration-300 h-full"
              >
                {/* Image Container */}
                <div className="relative h-[200px] w-full overflow-hidden shrink-0">
                  <img 
                    src={article.img} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>

                {/* Content */}
                <div className="p-5 md:p-6 flex flex-col flex-grow bg-white relative">
                  
                  {/* Tag Overlay */}
                  <div className="absolute -top-[14px] left-5 bg-white px-3 py-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] z-10 rounded-[2px]">
                    <span className="text-[10px] font-bold text-[#d6a524] uppercase tracking-wider" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                      {article.tag}
                    </span>
                  </div>

                  <h3 
                    className="text-[17px] md:text-[19px] font-bold text-[#0F3D2E] leading-[1.3] mt-2 mb-2 group-hover:text-[#2c4a35] transition-colors line-clamp-2 min-h-[48px]"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {article.title}
                  </h3>

                  <p className="text-[13px] text-[#6b7b72] mb-5 leading-[1.6] line-clamp-2 min-h-[42px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    {article.desc}
                  </p>
                  
                  {/* Author & Meta */}
                  <div className="flex items-center gap-3 mb-4">
                    <img src={article.authorImg} alt={article.author} className="w-8 h-8 rounded-full object-cover shadow-sm" />
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{article.author}</span>
                      <span className="text-[11px] text-[#8a958f]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                        {article.date} &nbsp;&bull;&nbsp; {article.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Read Article Link */}
                  <Link href={`${basePath}/${article.id}`} className="text-[13px] font-bold text-[#2c4a35] flex items-center gap-1.5 hover:text-[#5e8b42] transition-colors mt-2">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </Link>

                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
