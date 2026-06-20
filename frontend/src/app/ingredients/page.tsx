'use client';

import React, { useState } from 'react';
import { 
  Leaf, HeartHandshake, ShieldCheck, Globe, Droplet, Heart, 
  Sparkles, Activity, Shield, Zap, Plus, Minus, ArrowRight,
  CheckCircle2, ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function IngredientsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { q: "Are your ingredients 100% natural?", a: "Yes, all our ingredients are completely natural with no artificial additives." },
    { q: "Where do you source your ingredients from?", a: "We source globally from trusted farms in India, Egypt, and Southeast Asia." },
    { q: "Are your herbs organic?", a: "We prioritize organic farming practices and work closely with certified organic farmers." },
    { q: "Do your teas contain any artificial additives?", a: "No, we never use artificial flavors, colors, or preservatives." },
    { q: "How do you ensure ingredient quality?", a: "Every batch undergoes rigorous 3rd party testing for purity and potency." }
  ];

  return (
    <main className="min-h-screen bg-[#fcfbf9]">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#fcfbf9] min-h-[85vh] flex items-center">
        {/* Right Side Background Image (Desktop) */}
        <div 
          className="absolute inset-y-0 right-0 w-full lg:w-[65%] bg-no-repeat bg-cover bg-center lg:bg-[90%_center] opacity-30 lg:opacity-100 z-0"
          style={{ backgroundImage: `url('/assets/Ingredients-hero.png')` }}
        >
           <div className="hidden lg:block absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#fcfbf9] to-transparent"></div>
        </div>

        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 xl:px-8 py-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[48%] space-y-8"
          >
            <h1 className="text-[44px] md:text-[56px] lg:text-[64px] font-bold text-[#1c2e24] leading-[1.1] tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              Nature's Finest <br />
              <span className="text-[#cda434]">Wellness Ingredients</span>
            </h1>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-[2px] bg-[#cda434]"></div>
              <Leaf className="w-5 h-5 text-[#cda434]" fill="currentColor" />
              <div className="w-12 h-[2px] bg-[#cda434]"></div>
            </div>
            
            <p className="text-[16px] md:text-[18px] text-[#556358] max-w-md leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              Discover the carefully selected herbs, flowers, roots and botanicals that make every blend naturally effective and deeply nourishing.
            </p>

            <motion.div 
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.15 } }
              }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 max-w-xl"
            >
              {[
                { icon: <Leaf className="w-6 h-6" />, label: 'Pure &\nNatural' },
                { icon: <HeartHandshake className="w-6 h-6" />, label: 'Handpicked\nWith Care' },
                { icon: <ShieldCheck className="w-6 h-6" />, label: 'No Artificial\nAdditives' },
                { icon: <Globe className="w-6 h-6" />, label: 'Sustainably\nSourced' }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4 } }
                  }}
                  className="flex flex-col items-center text-center space-y-4 group"
                >
                  <div className="w-14 h-14 bg-white shadow-sm border border-[#ece8dc] rounded-full flex items-center justify-center text-[#2c4a35] group-hover:scale-110 group-hover:-translate-y-1 group-hover:bg-[#f6f2e6] transition-all duration-300">
                    {item.icon}
                  </div>
                  <span className="text-[12px] font-bold text-[#556358] uppercase tracking-wider whitespace-pre-line group-hover:text-[#1c2e24] transition-colors">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Explore Our Botanical Collection */}
      <section className="py-16 lg:py-20 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8">
          
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-[36px] md:text-[44px] font-bold text-[#1c2e24] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Explore Our Botanical Collection
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-[2px] bg-[#cda434]"></div>
              <Leaf className="w-4 h-4 text-[#cda434]" fill="currentColor" />
              <div className="w-12 h-[2px] bg-[#cda434]"></div>
            </div>
          </motion.div>

          {/* Grid */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { title: 'Flowers', desc: 'Hibiscus, Rose,\nChamomile & more', img: '/home/img1.jpg', icon: <Sparkles className="w-5 h-5" /> },
              { title: 'Herbs', desc: 'Tulsi, Mint,\nAshwagandha & more', img: '/home/img2.jpg', icon: <Leaf className="w-5 h-5" /> },
              { title: 'Roots', desc: 'Mulethi, Ginger,\nAshwagandha & more', img: '/home/img3.jpg', icon: <Activity className="w-5 h-5" /> },
              { title: 'Citrus', desc: 'Lemon Peel,\nOrange Peel & more', img: '/home/img4.jpg', icon: <Droplet className="w-5 h-5" /> }
            ].map((col, idx) => (
              <motion.div 
                key={idx} 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.3 } }
                }}
                className="bg-[#fcfbf9] rounded-[24px] overflow-hidden border border-[#ece8dc] shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-[220px] relative overflow-hidden">
                  <img src={col.img} alt={col.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="relative pt-12 pb-8 px-6 text-center bg-white">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center border border-[#ece8dc] shadow-sm text-[#cda434]">
                    {col.icon}
                  </div>
                  <h3 className="text-[22px] font-bold text-[#1c2e24] mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>{col.title}</h3>
                  <p className="text-[14px] text-[#556358] whitespace-pre-line leading-[1.6]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    {col.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Signature Ingredients */}
      <section className="py-16 lg:py-20 bg-[#fcfbf9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[36px] md:text-[44px] font-bold text-[#1c2e24] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Signature Ingredients
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-[2px] bg-[#cda434]"></div>
              <Leaf className="w-4 h-4 text-[#cda434]" fill="currentColor" />
              <div className="w-12 h-[2px] bg-[#cda434]"></div>
            </div>
          </div>

          <div className="space-y-12 md:space-y-16 relative">
            {/* Item 1: Hibiscus */}
            <div className="sticky top-[10vh] z-10 bg-white rounded-[32px] overflow-hidden shadow-[0_15px_40px_rgb(0,0,0,0.08)] border border-[#ece8dc] flex flex-col md:flex-row transition-all duration-500">
              <div className="w-full md:w-1/2 h-[300px] md:h-auto relative">
                <img src="/home/hibiscus.png" alt="Hibiscus" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-[#fdfbf6]">
                <span className="text-[#cda434] text-[13px] font-bold uppercase tracking-[0.2em] mb-4">HIBISCUS FLOWER</span>
                <h3 className="text-[32px] md:text-[40px] font-bold text-[#1c2e24] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>The Jewel Of Wellness</h3>
                <p className="text-[#556358] text-[16px] leading-[1.8] mb-10" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  Rich in antioxidants and naturally cooling, hibiscus helps support heart health, maintain healthy skin and boost overall vitality.
                </p>
                <div className="flex items-center justify-between gap-4 max-w-sm">
                  {[
                    { icon: <Droplet className="w-5 h-5"/>, text: "Antioxidant Rich" },
                    { icon: <Heart className="w-5 h-5"/>, text: "Supports Vitality" },
                    { icon: <Sparkles className="w-5 h-5"/>, text: "Women's Wellness" }
                  ].map((f, i) => (
                    <div key={i} className="flex flex-col items-center text-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white border border-[#ece8dc] flex items-center justify-center text-[#4a6b3d] shadow-sm">{f.icon}</div>
                      <span className="text-[12px] font-bold text-[#1c2e24] leading-tight">{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Item 2: Tulsi */}
            <div className="sticky top-[13vh] z-20 bg-white rounded-[32px] overflow-hidden shadow-[0_15px_40px_rgb(0,0,0,0.08)] border border-[#ece8dc] flex flex-col-reverse md:flex-row transition-all duration-500">
              <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-[#fdfbf6]">
                <span className="text-[#cda434] text-[13px] font-bold uppercase tracking-[0.2em] mb-4">TULSI (HOLY BASIL)</span>
                <h3 className="text-[32px] md:text-[40px] font-bold text-[#1c2e24] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>The Sacred Healer</h3>
                <p className="text-[#556358] text-[16px] leading-[1.8] mb-10" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  Revered in Ayurveda for centuries, Tulsi helps the body adapt to stress while supporting immunity and overall wellbeing.
                </p>
                <div className="flex items-center justify-between gap-4 max-w-sm">
                  {[
                    { icon: <Shield className="w-5 h-5"/>, text: "Stress Support" },
                    { icon: <ShieldCheck className="w-5 h-5"/>, text: "Immunity Booster" },
                    { icon: <Leaf className="w-5 h-5"/>, text: "Natural Detoxifier" }
                  ].map((f, i) => (
                    <div key={i} className="flex flex-col items-center text-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white border border-[#ece8dc] flex items-center justify-center text-[#4a6b3d] shadow-sm">{f.icon}</div>
                      <span className="text-[12px] font-bold text-[#1c2e24] leading-tight">{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/2 h-[300px] md:h-auto relative">
                <img src="/home/img5.jpg" alt="Tulsi" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>

            {/* Item 3: Ashwagandha */}
            <div className="sticky top-[16vh] z-30 bg-white rounded-[32px] overflow-hidden shadow-[0_15px_40px_rgb(0,0,0,0.08)] border border-[#ece8dc] flex flex-col md:flex-row transition-all duration-500">
              <div className="w-full md:w-1/2 h-[300px] md:h-auto relative">
                <img src="/home/img6.jpg" alt="Ashwagandha" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-[#fdfbf6]">
                <span className="text-[#cda434] text-[13px] font-bold uppercase tracking-[0.2em] mb-4">ASHWAGANDHA</span>
                <h3 className="text-[32px] md:text-[40px] font-bold text-[#1c2e24] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Strength From Within</h3>
                <p className="text-[#556358] text-[16px] leading-[1.8] mb-10" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  A powerful adaptogen known to help reduce stress, improve energy levels and support overall strength and balance.
                </p>
                <div className="flex items-center justify-between gap-4 max-w-sm">
                  {[
                    { icon: <Activity className="w-5 h-5"/>, text: "Stress Relief" },
                    { icon: <Zap className="w-5 h-5"/>, text: "Boosts Energy" },
                    { icon: <Heart className="w-5 h-5"/>, text: "Enhances Stamina" }
                  ].map((f, i) => (
                    <div key={i} className="flex flex-col items-center text-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white border border-[#ece8dc] flex items-center justify-center text-[#4a6b3d] shadow-sm">{f.icon}</div>
                      <span className="text-[12px] font-bold text-[#1c2e24] leading-tight">{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Why These Ingredients Matter */}
      <section className="py-16 lg:py-20 bg-white border-y border-[#ece8dc]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h2 className="text-[36px] md:text-[44px] font-bold text-[#1c2e24] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Why These Ingredients Matter
            </h2>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-[#cda434]"></div>
              <Leaf className="w-4 h-4 text-[#cda434]" fill="currentColor" />
              <div className="w-12 h-[2px] bg-[#cda434]"></div>
            </div>
            <p className="text-[16px] md:text-[18px] text-[#556358] leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              Every herb, root, and flower in our collection is carefully selected not just for its flavor, but for its profound functional benefits. We believe that true wellness starts from within, which is why our ingredients work synergistically to support your body's natural balance, enhance your daily energy, and provide holistic care.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15 } }
            }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
          >
            {[
              { icon: <Leaf />, title: "Natural\nWellness", desc: "Ingredients that work with your body" },
              { icon: <Droplet />, title: "Daily\nDetox", desc: "Helps eliminate toxins and supports cleansing" },
              { icon: <ShieldCheck />, title: "Boosts\nImmunity", desc: "Strengthens your body's natural defense" },
              { icon: <Zap />, title: "Enhances\nEnergy", desc: "Nourishes the body for all-day energy" },
              { icon: <Activity />, title: "Supports\nBalance", desc: "Promotes harmony of mind and body" },
              { icon: <Heart />, title: "Holistic\nCare", desc: "Rooted in nature, backed by tradition" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.3 } }
                }}
                className="flex flex-col items-center text-center group relative"
              >
                {/* Vertical Divider for Desktop */}
                {i < 5 && (
                  <div className="hidden lg:block absolute -right-4 top-[10%] bottom-[10%] w-[1px] bg-[#cda434]/30"></div>
                )}
                <div className="w-[80px] h-[80px] rounded-full border border-[#ece8dc] bg-[#fcfbf9] flex items-center justify-center text-[#4a6b3d] mb-5 shadow-sm group-hover:-translate-y-2 group-hover:shadow-md transition-all duration-300">
                  {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
                </div>
                <div className="flex items-center justify-center gap-[6px] mb-4">
                  <div className="w-4 h-[1px] bg-[#cda434]"></div>
                  <div className="w-[4px] h-[4px] rounded-full bg-[#cda434]"></div>
                  <div className="w-4 h-[1px] bg-[#cda434]"></div>
                </div>
                <h4 className="text-[16px] font-bold text-[#1c2e24] mb-3 whitespace-pre-line leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>{item.title}</h4>
                <p className="text-[13px] text-[#556358] leading-[1.6]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-[#f4f2ee] py-10 lg:py-12 relative">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
          
          <div className="text-center mb-10 lg:mb-12 max-w-2xl mx-auto">
            <h2 className="text-[28px] md:text-[36px] font-bold text-[#2c4a35] capitalize mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Frequently Asked<br/>Questions
            </h2>
            <p className="text-[14px] text-[#6b7b72] leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              Everything you need to know about our herbal ingredients, sourcing, and benefits. Can't find your answer? Reach out to our herbalist team.
            </p>
          </div>

          {/* Accordion List */}
          <div className="max-w-[800px] mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-[#fdfcf9] rounded-[20px] border border-[#e8e5de] hover:border-[#8cb73d]/30 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_-6px_rgba(44,74,53,0.08)] transition-all duration-300 overflow-hidden"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none group"
                >
                  <span className="text-[15px] md:text-[16px] font-semibold text-[#1c2e24] group-hover:text-[#2c4a35] transition-colors pr-6" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{faq.q}</span>
                  <div className={`flex items-center justify-center w-9 h-9 rounded-full shrink-0 transition-all duration-400 ease-in-out ${openFaq === index ? 'rotate-180 bg-[#1c2e24] text-[#cda434]' : 'bg-[#f4f2ee] text-[#6b7b72] group-hover:bg-[#e8f2e1] group-hover:text-[#6b9933]'}`}>
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </button>
                
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-5 pb-5 pt-0 text-[14px] text-[#6b7b72] leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          
        </div>
      </section>
    </main>
  );
}
