'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useCartStore } from '../features/cart/cartStore';
import { Star, Flame, Sparkles, HeartPulse, ShieldAlert, ArrowRight, Leaf, Globe, Sprout, Heart, Wind, ShieldCheck, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface MockProduct {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  priceCents: number;
  category: string;
  rating: number;
}


const PRODUCTS: MockProduct[] = [
  {
    id: "prod-1",
    sku: "MATCH-ORG-100",
    name: "Ceremonial Organic Matcha",
    slug: "ceremonial-organic-matcha",
    description: "Stone-ground, shade-grown high-altitude ceremonial grade green tea powder with natural sweetness.",
    priceCents: 3800,
    category: "Matcha",
    rating: 4.9
  },
  {
    id: "prod-2",
    sku: "CHAM-BLND-050",
    name: "Royal Chamomile Sleep Infusion",
    slug: "royal-chamomile-sleep",
    description: "Calming Egyptian chamomile flower heads blended with organic lavender buds and fresh mint leaves.",
    priceCents: 2400,
    category: "Herbal Blends",
    rating: 4.8
  },
  {
    id: "prod-3",
    sku: "CHAI-SPIC-080",
    name: "Golden Turmeric Herbal Chai",
    slug: "golden-turmeric-herbal-chai",
    description: "A restorative, warming blend of premium organic ginger roots, wild cardamoms, cinnamon, and turmeric.",
    priceCents: 2800,
    category: "Restorative",
    rating: 4.7
  },
  {
    id: "prod-4",
    sku: "HIBI-ROSE-060",
    name: "Hibiscus Rose Glow Nectar",
    slug: "hibiscus-rose-glow-nectar",
    description: "Antioxidant-rich organic hibiscus petals, wild rosehips, and elderberries for cellular regeneration.",
    priceCents: 2600,
    category: "Wellness",
    rating: 4.9
  }
];

interface CategoryItem {
  name: string;
  tag: string;
  image: string;
  description: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    name: "Ceremonial Matcha",
    tag: "01 / Stone-Ground",
    image: "/home/img1.jpg",
    description: "Stone-ground, shade-grown high-altitude green tea powders rich in L-theanine and antioxidants."
  },
  {
    name: "Herbal Infusions",
    tag: "02 / Caffeine-Free",
    image: "/home/img2.jpg",
    description: "Naturally caffeine-free calming botanical blends featuring chamomile, lavender, and mint."
  },
  {
    name: "Restorative Spices",
    tag: "03 / Wellness Blends",
    image: "/home/img3.jpg",
    description: "Restorative warming spices including organic ginger, cinnamon, cardamom, and turmeric."
  },
  {
    name: "Daily Wellness",
    tag: "04 / Organic Roots",
    image: "/home/img4.jpg",
    description: "Nutrient-rich hibiscus and rosehip blends designed to support immune defense and daily vitality."
  }
];

const FAQS = [
  { question: "Are your herbal teas 100% natural and organic?", answer: "Yes, we are committed to providing only the highest quality herbal teas. All our blends use 100% natural, ethically sourced botanical ingredients with absolutely no artificial additives, colors, or flavors." },
  { question: "How should I store my loose leaf tea to keep it fresh?", answer: "To preserve the potency and flavor of your herbal tea, store it in a cool, dark, and dry place. Keep it in an airtight container away from direct sunlight, moisture, and strong odors." },
  { question: "How many cups of herbal tea can I drink daily?", answer: "While herbal teas are generally safe and gentle, we recommend 2 to 3 cups a day for optimal wellness benefits. However, if you are pregnant, nursing, or taking medication, please consult your healthcare provider first." },
  { question: "Are your tea blends caffeine-free?", answer: "The vast majority of our herbal blends (tisanes) are naturally 100% caffeine-free, making them perfect for any time of day, including before bed. Any blend containing caffeine (like Matcha or Yerba Mate) is clearly labeled." },
  { question: "Do you test your herbs for heavy metals and pesticides?", answer: "Absolutely. Safety is our top priority. Every single batch of our herbs undergoes rigorous third-party lab testing for purity, heavy metals, pesticides, and microbial contaminants before it reaches your cup." },
  { question: "How long should I steep the herbal blends?", answer: "For the best flavor and maximum health benefits, we recommend steeping most of our herbal blends in boiling water (212°F) for 5 to 7 minutes. Some robust roots and berries can even be steeped longer!" }
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#f4f2ee] py-14 lg:py-16 relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 lg:mb-12 max-w-2xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8cb73d] mb-4 block">Got Questions?</span>
          <h2 className="text-[28px] md:text-[36px] font-medium text-[#1c2e24] leading-[1.3] uppercase tracking-wide mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Frequently Asked<br/>Questions
          </h2>
          <p className="text-[14px] text-[#6b7b72] leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            Everything you need to know about our herbal blends, sourcing, and brewing process. Can't find your answer? Reach out to our herbalist team.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-[800px] mx-auto space-y-3">
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className="bg-[#fdfcf9] rounded-[20px] border border-[#e8e5de] hover:border-[#8cb73d]/30 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_-6px_rgba(44,74,53,0.08)] transition-all duration-300 overflow-hidden"
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none group"
              >
                <span className="text-[15px] md:text-[16px] font-semibold text-[#1c2e24] group-hover:text-[#2c4a35] transition-colors pr-6" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{faq.question}</span>
                <div className={`flex items-center justify-center w-9 h-9 rounded-full shrink-0 transition-all duration-400 ease-in-out ${openIndex === index ? 'rotate-180 bg-[#1c2e24] text-[#c49d56]' : 'bg-[#f4f2ee] text-[#6b7b72] group-hover:bg-[#e8f2e1] group-hover:text-[#6b9933]'}`}>
                  <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-5 pb-5 pt-0 text-[14px] text-[#6b7b72] leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

export default function Home() {
  const addItem = useCartStore((state) => state.addItem);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    const scrollContainer = scrollRef.current;
    let scrollPos = scrollContainer ? scrollContainer.scrollLeft : 0;

    const scrollStep = () => {
      if (scrollContainer && !isHovered) {
        // Sync if user manually scrolled while hovering or interacting
        if (Math.abs(scrollContainer.scrollLeft - scrollPos) > 1) {
          scrollPos = scrollContainer.scrollLeft;
        }
        scrollPos += 0.5; // Slower scroll speed
        
        // Snap back to start when reaching the middle (for duplicated infinite list)
        if (scrollPos >= scrollContainer.scrollWidth / 2) {
          scrollPos = 0;
        }
        scrollContainer.scrollLeft = scrollPos;
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full z-0 bg-transparent">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setVideoLoaded(true)}
            className="w-full h-full object-cover"
          >
            <source src="/home/video_.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Content Container */}
        <div className="relative z-20 w-full h-full flex items-center px-[5%] md:px-[8%]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.15
                }
              }
            }}
            className="w-[90%] md:w-[80%] lg:w-full lg:max-w-[800px] text-center md:text-left mx-auto md:mx-0 flex flex-col items-center md:items-start"
          >
            {/* Heading */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="font-bold text-[32px] sm:text-[38px] md:text-[52px] lg:text-[64px] leading-[1.1] tracking-[-0.02em] text-[#fbfaf7] mb-[24px] max-w-full"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              <span className="block whitespace-nowrap">One Herbal Solution</span>
              <span className="block whitespace-nowrap">for Everyday Wellness</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="font-normal text-[16px] md:text-[18px] lg:text-[20px] leading-[1.7] text-[#e8e2d7]/90 mb-[36px]"
              style={{ fontFamily: 'Nunito Sans, sans-serif' }}
            >
              Naturally crafted herbal tea powders designed to support respiratory health, women's wellness, immunity, and daily well-being.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/shop"
                className="inline-flex items-center justify-center font-semibold text-[15px] lg:text-[16px] text-[#1c2e24] bg-[#c49d56] hover:bg-[#d8b066] py-[16px] px-[32px] rounded-full transition-all duration-300 shadow-lg hover:shadow-accent/20 cursor-pointer"
                style={{ fontFamily: 'Nunito Sans, sans-serif' }}
              >
                Shop Collection
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="bg-white py-24 border-b border-border/20 overflow-hidden">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4 px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-3xl font-bold tracking-tight text-[#1c2e24] sm:text-4xl uppercase"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Popular Categories
          </h2>
          <p className="text-sm md:text-base text-muted leading-relaxed">
            Explore our curated selection of premium organic herbal teas and botanical remedies, crafted to support your daily wellness journey.
          </p>
        </div>

        {/* Cards Marquee */}
        <div className="flex overflow-hidden group pb-8 w-full">
          {[...Array(3)].map((_, groupIdx) => (
            <div key={groupIdx} className="flex gap-6 shrink-0 animate-marquee group-hover:[animation-play-state:paused] pr-6" aria-hidden={groupIdx !== 0}>
              {CATEGORIES.map((cat, idx) => (
                <div
                  key={`${groupIdx}-${idx}`}
                  className="group/card relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(44,74,53,0.12)] border border-black/5 hover:scale-[1.02] hover:z-10 transition-all duration-500 h-full w-[260px] sm:w-[280px] md:w-[300px] lg:w-[320px] flex-shrink-0"
                >
                  <div className="flex flex-col">
                    {/* Full-bleed Image Container */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary/10">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="p-6 text-left flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-[#1c2e24] mb-2.5">
                        {cat.name}
                      </h3>
                      <p className="text-[13.5px] leading-[165%] text-[#4a5e51] mb-6">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  {/* Shop Now Button Container */}
                  <div className="px-6 pb-6 flex items-center justify-start mt-auto relative z-10">
                    <Link
                      href="/shop"
                      className="group/btn inline-flex items-center gap-2.5 rounded-full bg-[#2c4a35] hover:bg-[#e2b755] text-white hover:text-[#1c2e24] px-5 py-3 text-xs font-semibold tracking-wider transition-all duration-300 shadow active:scale-[0.98] cursor-pointer"
                    >
                      <span>Shop Now</span>
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[#2c4a35] group-hover/btn:bg-[#2c4a35] group-hover/btn:text-white transition-colors duration-300">
                        <ArrowRight className="h-3 w-3 stroke-[2.5]" />
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Our Herbal Wellness Journey Section */}
      <section className="bg-[#f4f2ee] py-14 lg:py-20 border-b border-border/20 overflow-hidden">
        <div className="mx-auto max-w-[1024px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-10">
            
            {/* Left Side: 45% Image + Floating Card */}
            <div className="w-full sm:w-[72%] md:w-[54%] lg:w-[45%] mx-auto lg:mx-0 relative flex-shrink-0">
              <div className="relative aspect-square lg:aspect-square rounded-[22px] lg:rounded-[28px] overflow-hidden shadow-2xl shadow-black/10">
                <img
                  src="/home/herbal.jpg"
                  alt="Herbal Wellness Journey"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Glassmorphism Card */}
              <div className="absolute -bottom-5 -right-3 sm:-bottom-7 sm:-right-7 lg:-bottom-9 lg:-right-9 w-[225px] sm:w-[252px] rounded-xl bg-white/70 backdrop-blur-xl border border-white/40 p-5 shadow-[0_18px_45px_-10px_rgba(0,0,0,0.1)] z-10">
                <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-[0.15em] text-[#2c4a35] uppercase mb-2.5">
                  <Sparkles className="w-3 h-3 text-[#8cb73d]" /> Herbal Wellness
                </div>
                <h4 className="text-[15px] font-bold text-[#1c2e24] mb-1.5" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Supporting Everyday Health
                </h4>
                <p className="text-[12px] text-[#6b7b72] mb-3.5 leading-relaxed" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  Crafted from carefully selected herbal ingredients inspired by traditional wellness practices.
                </p>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5 text-[12px] text-[#1c2e24] font-medium" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    <div className="flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#e8f2e1] text-[#6b9933] shrink-0">
                      <svg className="w-[9px] h-[9px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    Natural Ingredients
                  </div>
                  <div className="flex items-center gap-2.5 text-[12px] text-[#1c2e24] font-medium" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    <div className="flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#e8f2e1] text-[#6b9933] shrink-0">
                      <svg className="w-[9px] h-[9px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    Daily Wellness Support
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Content */}
            <div className="w-full lg:w-[55%] flex flex-col justify-center mt-14 lg:mt-0 lg:pl-10">
              <h2 
                className="text-[20px] md:text-[24px] lg:text-[27px] font-medium text-[#1c2e24] leading-[1.4] mb-5 tracking-wide uppercase" 
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Rooted In Tradition,<br/>Crafted For Today
              </h2>
              <p 
                className="text-[13px] md:text-[14px] text-[#6b7b72] leading-[1.8] mb-9" 
                style={{ fontFamily: 'Nunito Sans, sans-serif' }}
              >
                Inspired by generations of herbal knowledge, our blends are thoughtfully crafted using premium natural ingredients. We believe wellness should be simple, accessible, and part of everyday life. Every herbal tea powder is prepared with care to help you embrace a healthier daily routine.
              </p>

              {/* Button */}
              <Link
                href="#shop"
                className="inline-flex items-center justify-center self-start bg-[#1c2e24] hover:bg-[#2c4a35] text-white px-8 py-3.5 text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 shadow-sm"
                style={{ fontFamily: 'Nunito Sans, sans-serif' }}
              >
                Know More
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="bg-[#1c2e24] py-20 border-b border-border/20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#f4f2ee] uppercase">
              Botanical Best Sellers
            </h2>
            <Link href="#shop" className="text-xs sm:text-sm font-semibold tracking-widest text-[#c49d56] hover:text-[#e2b755] transition-colors uppercase">
              Shop All &rarr;
            </Link>
          </div>

          {/* Carousel */}
          <div 
            ref={scrollRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex overflow-x-auto gap-6 pb-8 no-scrollbar"
          >
            {[
              { img: '/home/img1.jpg', title: 'Organic Chamomile Blend', oldPrice: 'Rs. 450', newPrice: 'Rs. 350.00' },
              { img: '/home/img2.jpg', title: 'Green Tea Detox', oldPrice: 'Rs. 500', newPrice: 'Rs. 420.00', scaleClass: 'scale-[1.3] group-hover:scale-[1.35]' },
              { img: '/home/img3.jpg', title: 'Lemongrass Citrus', oldPrice: 'Rs. 400', newPrice: 'Rs. 320.00' },
              { img: '/home/img4.jpg', title: 'Spiced Ginger Chai', oldPrice: 'Rs. 550', newPrice: 'Rs. 480.00' },
              { img: '/home/img5.jpg', title: 'Peppermint Relief', oldPrice: 'Rs. 400', newPrice: 'Rs. 300.00' },
              { img: '/home/img6.jpg', title: 'Jasmine Blossoms', oldPrice: 'Rs. 600', newPrice: 'Rs. 520.00' },
              { img: '/home/img7.jpg', title: 'Hibiscus Berry', oldPrice: 'Rs. 480', newPrice: 'Rs. 380.00' },
              { img: '/home/img8.jpg', title: 'Tulsi Holy Basil', oldPrice: 'Rs. 500', newPrice: 'Rs. 450.00', scaleClass: 'scale-[1.3] group-hover:scale-[1.35]' },
              // Duplicate the array for infinite smooth scrolling
              { img: '/home/img1.jpg', title: 'Organic Chamomile Blend', oldPrice: 'Rs. 450', newPrice: 'Rs. 350.00' },
              { img: '/home/img2.jpg', title: 'Green Tea Detox', oldPrice: 'Rs. 500', newPrice: 'Rs. 420.00', scaleClass: 'scale-[1.3] group-hover:scale-[1.35]' },
              { img: '/home/img3.jpg', title: 'Lemongrass Citrus', oldPrice: 'Rs. 400', newPrice: 'Rs. 320.00' },
              { img: '/home/img4.jpg', title: 'Spiced Ginger Chai', oldPrice: 'Rs. 550', newPrice: 'Rs. 480.00' },
              { img: '/home/img5.jpg', title: 'Peppermint Relief', oldPrice: 'Rs. 400', newPrice: 'Rs. 300.00' },
              { img: '/home/img6.jpg', title: 'Jasmine Blossoms', oldPrice: 'Rs. 600', newPrice: 'Rs. 520.00' },
              { img: '/home/img7.jpg', title: 'Hibiscus Berry', oldPrice: 'Rs. 480', newPrice: 'Rs. 380.00' },
              { img: '/home/img8.jpg', title: 'Tulsi Holy Basil', oldPrice: 'Rs. 500', newPrice: 'Rs. 450.00', scaleClass: 'scale-[1.3] group-hover:scale-[1.35]' },
            ].map((product, idx) => (
              <div key={idx} className="flex-none w-[240px] sm:w-[250px] bg-[#f4f2ee] rounded-xl shadow-lg border border-white/10 overflow-hidden group">
                <div className="aspect-square overflow-hidden relative">
                  <img src={product.img} alt={product.title} className={`w-full h-full object-cover transition-transform duration-700 ${product.scaleClass || 'group-hover:scale-105'}`} />
                </div>
                <div className="p-5 flex flex-col items-center text-center">
                  <h3 className="text-sm font-bold text-[#1c2e24] mb-3 truncate w-full">{product.title}</h3>
                  <div className="flex items-center justify-center gap-3 w-full mb-6">
                    <span className="text-[13px] text-[#6b7b72] line-through opacity-70">{product.oldPrice}</span>
                    <div className="h-3 w-px bg-[#6b7b72]/40" />
                    <span className="text-[13px] font-bold text-[#1c2e24]">{product.newPrice}</span>
                  </div>
                  <div className="flex gap-2 w-full">
                    <button className="flex-1 border border-black/10 hover:bg-[#2c4a35] hover:text-white hover:border-[#2c4a35] text-[#2c4a35] text-[10px] sm:text-xs font-bold py-2.5 uppercase tracking-widest transition-colors rounded-sm">
                      Add to Cart
                    </button>
                    <button className="w-10 h-10 flex-none border border-black/10 hover:bg-[#2c4a35] hover:text-white hover:border-[#2c4a35] text-[#2c4a35] flex items-center justify-center transition-colors rounded-sm group/btn">
                      <Heart className="w-4 h-4 group-hover/btn:fill-white transition-colors" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-[#f4f2ee] py-20 border-b border-border/20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8cb73d]">Our Journal</span>
            <h2 
              className="text-[26px] md:text-[32px] font-medium text-[#1c2e24] leading-[1.3] tracking-wide uppercase"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              From The Blog
            </h2>
            <p className="text-[14px] text-[#6b7b72] leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              Insights, tips, and stories from the world of herbal wellness to inspire your daily routine.
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                img: '/home/img1.jpg',
                date: 'May 28, 2026',
                category: 'Wellness',
                title: '5 Herbal Teas That Support Better Sleep Naturally',
                excerpt: 'Discover how chamomile, lavender, and other botanicals can transform your nighttime routine into a calming ritual.',
              },
              {
                img: '/home/img4.jpg',
                date: 'May 20, 2026',
                category: 'Ingredients',
                title: 'The Ancient Power of Turmeric in Modern Herbal Blends',
                excerpt: 'From Ayurvedic traditions to your morning cup — learn why turmeric remains one of the most valued healing spices.',
              },
              {
                img: '/home/img6.jpg',
                date: 'May 12, 2026',
                category: 'Lifestyle',
                title: 'Building a Daily Herbal Wellness Ritual in 10 Minutes',
                excerpt: 'Simple, actionable steps to incorporate herbal tea powders into your morning and evening routines for lasting health.',
              },
            ].map((post, idx) => (
              <article 
                key={idx} 
                className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_36px_-6px_rgba(44,74,53,0.12)] border border-black/5 transition-all duration-500 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden">
                  <img 
                    src={post.img} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8cb73d]">{post.category}</span>
                    <span className="w-1 h-1 rounded-full bg-[#6b7b72]/40" />
                    <span className="text-[11px] text-[#6b7b72]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{post.date}</span>
                  </div>
                  <h3 
                    className="text-[17px] font-bold text-[#1c2e24] leading-[1.4] mb-3 group-hover:text-[#2c4a35] transition-colors"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {post.title}
                  </h3>
                  <p 
                    className="text-[13px] text-[#6b7b72] leading-[1.7] mb-5 flex-grow"
                    style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                  >
                    {post.excerpt}
                  </p>
                  <Link 
                    href="#" 
                    className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#2c4a35] hover:text-[#8cb73d] transition-colors group/link"
                    style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                  >
                    Read More
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-white py-20 border-b border-border/20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left Side: Image */}
            <div className="group/about w-full sm:w-[80%] md:w-[60%] lg:w-[45%] mx-auto lg:mx-0 relative flex-shrink-0 cursor-pointer">
              <motion.div 
                className="relative rounded-[22px] lg:rounded-[28px] overflow-hidden shadow-2xl shadow-black/10 transition-transform duration-500 ease-out group-hover/about:scale-[1.04]"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src="/home/img3.jpg"
                  alt="About Our Herbal Journey"
                  className="w-full h-full object-cover aspect-[4/3]"
                />
                {/* Decorative overlay accent */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c2e24]/30 via-transparent to-transparent" />
              </motion.div>
              
            </div>

            {/* Right Side: Content */}
            <div className="w-full lg:w-[55%] flex flex-col justify-center mt-10 lg:mt-0">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8cb73d] mb-4">About Us</span>
              <h2 
                className="text-[22px] md:text-[28px] lg:text-[32px] font-medium text-[#1c2e24] leading-[1.35] mb-6 tracking-wide uppercase"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Our Story, Steeped<br/>In Purpose
              </h2>
              <p 
                className="text-[14px] md:text-[15px] text-[#6b7b72] leading-[1.85] mb-8"
                style={{ fontFamily: 'Nunito Sans, sans-serif' }}
              >
                Rooted in traditional herbal wisdom, we craft premium blends from nature's purest ingredients to help you live healthier, one cup at a time.
              </p>

              {/* Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: <Leaf className="w-4 h-4" />, title: '100% Natural', desc: 'Pure botanical ingredients with zero artificial additives.', animation: 'group-hover/card:rotate-[360deg]' },
                  { icon: <ShieldCheck className="w-4 h-4" />, title: 'Lab Tested', desc: 'Every batch tested for purity, potency, and safety.', animation: 'group-hover/card:rotate-[360deg]' },
                  { icon: <Globe className="w-4 h-4" />, title: 'Sustainably Sourced', desc: 'Ethically harvested herbs from trusted organic farms.', animation: 'group-hover/card:rotate-[360deg]' },
                  { icon: <HeartPulse className="w-4 h-4" />, title: 'Wellness First', desc: 'Formulated to support real health outcomes daily.', animation: 'group-hover/card:rotate-[360deg]' },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    className="group/card relative flex items-start gap-3.5 p-4 rounded-[20px] bg-white border border-[#f0eee9] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] hover:border-[#8cb73d]/20 hover:shadow-[0_12px_40px_-10px_rgba(140,183,61,0.2)] transition-all duration-500 cursor-default overflow-hidden z-10"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                  >
                    {/* Subtle Hover Glow */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#8cb73d]/10 rounded-full blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />

                    <div className={`relative z-10 flex items-center justify-center w-[40px] h-[40px] rounded-[12px] bg-gradient-to-br from-[#f7f9f4] to-[#e8eedd] border border-white shadow-[0_2px_10px_-2px_rgba(107,153,51,0.15)] text-[#5a8028] shrink-0 transition-transform duration-700 ease-in-out ${item.animation}`}>
                      {item.icon}
                    </div>
                    
                    <div className="relative z-10 pt-0.5">
                      <h4 className="text-[14px] font-bold text-[#1c2e24] mb-1 tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>{item.title}</h4>
                      <p className="text-[12px] text-[#6b7b72] leading-[1.6]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
