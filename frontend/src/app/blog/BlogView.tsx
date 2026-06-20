'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Leaf, Smile, Apple, Microscope, Coffee, Sun, Sprout, Calendar, Clock } from 'lucide-react';
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

const TOPICS = [
  { name: 'All', icon: Leaf },
  { name: 'Wellness', icon: Smile },
  { name: 'Nutrition', icon: Apple },
  { name: 'Research', icon: Microscope },
  { name: 'Recipes', icon: Coffee },
  { name: 'Lifestyle', icon: Sun },
  { name: 'Ingredients', icon: Sprout }
];

const ARTICLES = [
  {
    id: 1,
    tag: "RESEARCH",
    title: "What Science Says About Hibiscus Tea",
    desc: "Studies suggest hibiscus may support healthy blood pressure and heart wellness.",
    author: "Ananya Sharma",
    authorImg: "https://i.pravatar.cc/150?img=32",
    date: "May 18, 2025",
    readTime: "6 min read",
    img: "/blog/blog1.png"
  },
  {
    id: 2,
    tag: "NUTRITION",
    title: "Antioxidants In Everyday Wellness",
    desc: "Understanding antioxidants and how they protect your cells naturally.",
    author: "Kavya Menon",
    authorImg: "https://i.pravatar.cc/150?img=5",
    date: "May 14, 2025",
    readTime: "5 min read",
    img: "/blog/blog2.png"
  },
  {
    id: 3,
    tag: "LIFESTYLE",
    title: "Creating A Tea Ritual For Better Sleep",
    desc: "Simple bedtime tea rituals to calm your mind and improve sleep quality.",
    author: "Ananya Sharma",
    authorImg: "https://i.pravatar.cc/150?img=32",
    date: "May 12, 2025",
    readTime: "6 min read",
    img: "/blog/blog_3.png"
  },
  {
    id: 4,
    tag: "INGREDIENTS",
    title: "Moringa Benefits Explained",
    desc: "The supergreen with incredible nutritional and healing properties.",
    author: "Kavya Menon",
    authorImg: "https://i.pravatar.cc/150?img=5",
    date: "May 10, 2025",
    readTime: "6 min read",
    img: "/blog/blog_4.png"
  },
  {
    id: 5,
    tag: "WELLNESS",
    title: "Stress Relief Through Herbal Blends",
    desc: "Herbal ingredients that help your body relax and manage daily stress.",
    author: "Ananya Sharma",
    authorImg: "https://i.pravatar.cc/150?img=32",
    date: "May 8, 2025",
    readTime: "6 min read",
    img: "/blog/blog_5.png"
  },
  {
    id: 6,
    tag: "RECIPES",
    title: "Golden Herbal Latte Recipe",
    desc: "A soothing turmeric latte recipe to nourish your body and mind.",
    author: "Kavya Menon",
    authorImg: "https://i.pravatar.cc/150?img=5",
    date: "May 6, 2025",
    readTime: "4 min read",
    img: "/blog/blog_6.png"
  }
];

export default function BlogPage() {
  const router = useRouter();
  const [activeTopic, setActiveTopic] = useState('All');

  const filteredArticles = activeTopic === 'All' 
    ? ARTICLES 
    : ARTICLES.filter(article => article.tag.toLowerCase() === activeTopic.toLowerCase());

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

      {/* Browse By Topic Section */}
      <section className="bg-transparent pb-6 md:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="browse-by-topic" className="text-[26px] md:text-[32px] font-bold text-[#2c4a35] mb-8 scroll-mt-24" style={{ fontFamily: 'Playfair Display, serif' }}>
            Browse By Topic
          </h2>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {TOPICS.map((topic, idx) => {
              const Icon = topic.icon;
              const isActive = topic.name === activeTopic;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTopic(topic.name)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full border transition-all duration-300 ${
                    isActive
                      ? 'bg-[#1c2e24] border-[#1c2e24] text-white shadow-md'
                      : 'bg-white border-[#e8e5de] text-[#0F3D2E] hover:border-[#8cb73d]/50 hover:shadow-sm'
                  }`}
                >
                  <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-[#d6a524]' : 'text-[#5e8b42]'}`} strokeWidth={2.5} />
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
                  <Link href={`/blog/${article.id}`} className="text-[13px] font-bold text-[#2c4a35] flex items-center gap-1.5 hover:text-[#5e8b42] transition-colors mt-2">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </Link>

                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

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
