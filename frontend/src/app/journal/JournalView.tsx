'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, ChevronDown } from 'lucide-react';
import { JournalPost } from './types';
import SharedArticleGrid from '../../components/SharedArticleGrid';
import HeadingDecorator from '../../components/HeadingDecorator';

const journalFaqs = [
  {
    q: 'How long does delivery take?',
    a: 'Most standard orders are processed and delivered within 3–7 business days, depending on your geographical location. If you need your tea sooner, we also offer expedited shipping options at checkout.'
  },
  {
    q: 'Do you offer free shipping?',
    a: 'Yes, we are delighted to offer free standard shipping on all domestic orders that exceed our specified minimum purchase amount. The discount is automatically applied to your cart during the checkout process.'
  },
  {
    q: 'What ingredients are used in your herbal teas?',
    a: 'Our premium herbal teas are expertly crafted from a curated selection of 100% natural herbs and botanicals. Our signature blend features a soothing combination of Beetroot, Aquatic Fern, Hibiscus, Mulethi, and Moringa.'
  },
  {
    q: 'Are your products free from artificial additives?',
    a: 'Yes, purity is our priority. We focus strictly on using whole, natural ingredients, ensuring our premium herbal blends are completely free from any added sugar, artificial additives, synthetic colors, or artificial flavors.'
  },
  {
    q: 'How should I prepare the herbal tea?',
    a: 'For the perfect cup, use one sachet per cup. Pour hot water over it and let it steep for 3-4 minutes to release its full aromatic profile. You may add honey if desired. Always store your tea in a cool, dry place away from sunlight.'
  },
  {
    q: 'How often can I drink herbal tea?',
    a: 'We recommend enjoying 1-2 cups per day, and advise not to exceed the recommended usage. Please note our teas are not for medical use and are not intended to diagnose, treat, cure, or prevent any disease.'
  }
];

const FaqAccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`w-full bg-white rounded-[16px] mb-4 overflow-hidden transition-all duration-300 ${isOpen ? 'border border-[#d1decb] shadow-sm' : 'border border-transparent shadow-[0_2px_10px_rgba(0,0,0,0.02)]'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left px-6 py-5 group focus:outline-none"
      >
        <h4 
          className="text-[15px] md:text-[16px] font-medium text-[#1c2e24]" 
          style={{ fontFamily: 'Nunito Sans, sans-serif' }}
        >
          {question}
        </h4>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 ml-4 transition-all duration-300 ${isOpen ? 'bg-[#1c2e24]' : 'bg-[#f0ece4] group-hover:bg-[#e8e3d9]'}`}>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#dcae3d]' : 'text-[#4a554e]'}`} />
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-6 pt-1">
              <p className="text-[14px] text-[#0F3D2E] leading-[1.6]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface JournalViewProps {
  posts: JournalPost[];
}

export default function JournalView({ posts }: JournalViewProps) {

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f5f0e6]">
      {/* Hero Section */}
      <section className="relative w-full min-h-[450px] md:min-h-[600px] flex items-center bg-[#f2f4ed] overflow-hidden mb-8 md:mb-10">
        
        {/* Background Image Container */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src="/journal/journal1.png" 
            alt="Wellness Journal" 
            className="w-full h-full object-cover object-[center_60%]"
          />
        </div>

        {/* Gradient Overlay for Text Readability */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none" 
          style={{ background: 'linear-gradient(to right, rgba(198,200,190,0.95) 0%, rgba(198,200,190,0.8) 25%, transparent 45%)' }}
        ></div>

        {/* Content Area */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 flex flex-col justify-center">
          <div className="w-full md:w-[55%] lg:w-[45%] flex flex-col items-start text-[#0F3D2E]">
            <h1 className="text-[42px] md:text-[56px] lg:text-[72px] font-bold leading-[1.05] tracking-tight text-[#0F3D2E]" style={{ fontFamily: 'Playfair Display, serif' }}>
              Wellness<br />Journal
            </h1>
            <HeadingDecorator align="left" />
            
            <p className="text-[15px] md:text-[16px] text-[#556358] leading-[1.8] mb-8 max-w-[360px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              Insights, rituals, and natural wellness guides crafted to support your daily health journey.
            </p>
            
            <button 
              onClick={() => document.getElementById('browse-by-topic')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#1c2e24] hover:bg-[#2a3f30] text-white px-8 py-3.5 rounded-[4px] font-bold text-[14px] transition-colors shadow-sm inline-flex items-center tracking-wide" 
              style={{ fontFamily: 'Nunito Sans, sans-serif' }}
            >
              Explore Articles
            </button>
          </div>
        </div>
      </section>

      {/* Featured Article Section */}
      <section className="w-full pt-16 md:pt-24 px-4 sm:px-6 lg:px-8 max-w-[1000px] mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Left Image */}
          <div className="w-full md:w-1/2">
            <img 
              src="/journal/flwr.png" 
              alt="Benefits of Hibiscus Tea" 
              className="w-full h-auto aspect-square object-cover rounded-[16px] shadow-sm"
            />
          </div>

          {/* Right Content */}
          <div className="w-full md:w-1/2 flex flex-col items-start">
            <div className="flex items-center mb-4">
              <span className="bg-[#cd5c4b] text-white px-3.5 py-1 rounded-[20px] text-[11px] font-bold tracking-wide" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                Wellness
              </span>
              <span className="text-[#0F3D2E] text-[11px] font-bold ml-4 tracking-wider uppercase" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                7 Min Read
              </span>
            </div>

            <h2 className="text-[36px] md:text-[44px] lg:text-[48px] font-bold text-[#0F3D2E] leading-[1.15] tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              Benefits of<br />Hibiscus Tea
            </h2>
            <HeadingDecorator align="left" />

            <p className="text-[15px] md:text-[16px] text-[#556358] mb-8 leading-[1.8] max-w-[380px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              Benefits, rituals, and natural wellness guides crafted to support your daily health journey. Discover how this vibrant crimson flower can naturally lower blood pressure, improve your immune system, and bring a moment of calm to your busy everyday life.
            </p>

            <Link 
              href="/journal/1"
              className="bg-[#2c4a35] hover:bg-[#1c2e24] text-white px-8 py-3 rounded-[4px] font-bold text-[14px] transition-colors shadow-sm inline-flex items-center"
            >
              Read Article
            </Link>
          </div>
        </div>
      </section>



      <SharedArticleGrid basePath="/journal" topicHeading="ARTICLE CATEGORIES" />

      {/* WELLNESS TIPS SECTION */}
      <section className="bg-transparent pb-20 md:pb-32" style={{ zoom: 0.9 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[26px] md:text-[32px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Playfair Display, serif' }}>
              Wellness Tips
            </h2>
            <HeadingDecorator align="center" />
            <p className="text-[15px] md:text-[16px] text-[#556358] max-w-2xl mx-auto leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              Embrace a healthier lifestyle with our carefully curated wellness tips. Simple, mindful adjustments to your daily routine can naturally elevate both your physical vitality and mental clarity.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {[
              { title: 'Stay Hydrated', icon: '/journal/icon_1.png' },
              { title: 'Improve Sleep Quality', icon: '/journal/icon_2.png' },
              { title: 'Daily Herbal Ritual', icon: '/journal/logo_3.png' },
              { title: 'Mindful Living', icon: '/journal/icon_4.png' },
              { title: 'Natural Stress Relief', icon: '/journal/icon_5.png' },
            ].map((tip, i) => {
              return (
                <div key={i} className="group bg-white rounded-[16px] p-6 flex flex-col items-center justify-center text-center shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-[#f0eee9] hover:shadow-[0_8px_24px_-8px_rgba(44,74,53,0.15)] transition-all duration-300 cursor-pointer">
                  <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-5 text-[#1b3b2b] rounded-[16px] group-hover:bg-[#1c2e24] transition-all duration-300 p-2">
                    <img src={tip.icon} alt={tip.title} className={`w-full h-full object-contain ${i === 0 || i === 3 ? 'scale-[1.7]' : 'scale-[1.4]'} group-hover:brightness-0 group-hover:invert transition-all duration-300`} />
                  </div>
                  <h4 className="text-[14px] font-bold text-[#0F3D2E] transition-colors duration-300 leading-[1.3]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    {tip.title}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full bg-[#2a4530] py-12 md:py-14">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 md:px-16 lg:px-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            
            {/* Left Content */}
            <div className="w-full md:w-1/2 flex flex-col items-start text-white">
              <h3 className="text-[24px] md:text-[28px] font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                Stay Inspired Naturally
              </h3>
              <HeadingDecorator align="left" />
              <p className="text-[15px] md:text-[16px] text-[#d1dcd5] leading-[1.8] max-w-[400px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
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

      {/* FAQ Section */}
      <section className="w-full bg-[#f5f0e6] py-16 md:py-24">
        <div className="max-w-[850px] mx-auto px-6 sm:px-10">
          <div className="text-center mb-12">
            <h2 className="text-[36px] md:text-[44px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Playfair Display, serif' }}>
              Frequently Asked Questions
            </h2>
            <HeadingDecorator align="center" />
            <p className="text-[15px] md:text-[16px] text-[#556358] max-w-[650px] mx-auto leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              Everything you need to know about our herbal blends, sourcing, and brewing process. Can't find your answer? Reach out to our herbalist team.
            </p>
          </div>
          
          <div className="flex flex-col">
            {journalFaqs.map((faq, idx) => (
              <FaqAccordionItem key={idx} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
