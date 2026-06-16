'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useCartStore } from '../features/cart/cartStore';
import { Star, Flame, Sparkles, HeartPulse, ShieldAlert, ArrowRight, Leaf, Globe, Sprout, Heart, Wind, ShieldCheck, ChevronDown, X, Clock, ShoppingBag, ShoppingCart, CreditCard, Coffee, ClipboardCheck, Quote, ChevronLeft, ChevronRight, Award, Smile } from 'lucide-react';
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

const WELLNESS_CARDS = [
  {
    id: "womens-wellness",
    title: "Women's Wellness Support",
    cardImage: "/home/womens wellness.png",
    imageClass: "object-cover",
    modalImage: "/home/womens wellness.png",
    subtitle: "A nurturing blend crafted to support hormonal balance and daily tranquility.",
    benefits: [
      {
        title: "Emotional Equilibrium",
        desc: "Specifically formulated to soothe stress and emotional fatigue.",
        icon: <Leaf className="w-5 h-5 text-[#2c4a35]" />
      },
      {
        title: "Cellular Protection",
        desc: "Rich in organic antioxidants for long-term restorative health.",
        icon: <Sparkles className="w-5 h-5 text-[#2c4a35]" />
      }
    ],
    ingredients: [
      { type: "FLOWER", name: "Rose Petals" },
      { type: "HERB", name: "Holy Basil" },
      { type: "LEAF", name: "Lemon Balm" },
      { type: "ROOT", name: "Shatavari" }
    ],
    ritual: "Steep 1 generous teaspoon in freshly boiled water for 5-7 minutes. Inhale the botanical aromas before enjoying daily as a grounding ritual."
  },
  {
    id: "immunity-support",
    title: "Maximum Immunity Guard",
    cardImage: "/home/immunity support.png",
    imageClass: "object-cover",
    modalImage: "/home/immunity support.png",
    subtitle: "Fortify your body's natural defenses with concentrated botanical power.",
    benefits: [
      {
        title: "Immune Boosting",
        desc: "Packed with vitamin C and antioxidants to support natural defenses.",
        icon: <ShieldAlert className="w-5 h-5 text-[#2c4a35]" />
      },
      {
        title: "Cellular Protection",
        desc: "Rich in organic antioxidants for long-term restorative health.",
        icon: <Sparkles className="w-5 h-5 text-[#2c4a35]" />
      }
    ],
    ingredients: [
      { type: "FLOWER", name: "Elderflower" },
      { type: "HERB", name: "Echinacea" },
      { type: "ROOT", name: "Ginger" },
      { type: "BERRY", name: "Rosehip" }
    ],
    ritual: "Steep 1 generous teaspoon in freshly boiled water for 5-7 minutes. Inhale the botanical aromas before enjoying daily as a grounding ritual."
  },
  {
    id: "respiratory-wellness",
    title: "Clear Respiratory Relief",
    cardImage: "/home/respiratory wellness.png",
    imageClass: "object-cover",
    modalImage: "/home/respiratory wellness.png",
    subtitle: "Breathe easier with our soothing blend of lung-supporting herbs.",
    benefits: [
      {
        title: "Airway Clearing",
        desc: "Helps to clear congestion and soothe respiratory pathways.",
        icon: <Wind className="w-5 h-5 text-[#2c4a35]" />
      },
      {
        title: "Throat Soothing",
        desc: "Coats and comforts scratchy, irritated throats.",
        icon: <Leaf className="w-5 h-5 text-[#2c4a35]" />
      }
    ],
    ingredients: [
      { type: "LEAF", name: "Peppermint" },
      { type: "HERB", name: "Thyme" },
      { type: "BARK", name: "Slippery Elm" },
      { type: "ROOT", name: "Licorice" }
    ],
    ritual: "Steep 1 generous teaspoon in freshly boiled water for 5-7 minutes. Inhale the botanical aromas before enjoying daily as a grounding ritual."
  },
  {
    id: "digestive-wellness",
    title: "Gentle Digestive Balance",
    cardImage: "/home/digestive wellness.png",
    imageClass: "object-cover",
    modalImage: "/home/digestive wellness.png",
    subtitle: "Support gut health and ease discomfort with this calming botanical blend.",
    benefits: [
      {
        title: "Gut Soothing",
        desc: "Relieves bloating, gas, and occasional indigestion.",
        icon: <Sprout className="w-5 h-5 text-[#2c4a35]" />
      },
      {
        title: "Microbiome Support",
        desc: "Promotes a healthy environment for beneficial gut flora.",
        icon: <Sparkles className="w-5 h-5 text-[#2c4a35]" />
      }
    ],
    ingredients: [
      { type: "SEED", name: "Fennel" },
      { type: "ROOT", name: "Ginger" },
      { type: "LEAF", name: "Peppermint" },
      { type: "HERB", name: "Chamomile" }
    ],
    ritual: "Steep 1 generous teaspoon in freshly boiled water for 5-7 minutes. Inhale the botanical aromas before enjoying daily as a grounding ritual."
  }
];

const FEATURED_PRODUCTS = [
  {
    id: "fp-1",
    name: "Ruby Calm Tea",
    badge: "Women's Wellness Blend",
    description: "A soothing blend to help you relax and find your inner calm.",
    price: 399,
    originalPrice: 499,
    image: "/home/img1.jpg",
    bestseller: true
  },
  {
    id: "fp-2",
    name: "Golden Armor Tea",
    badge: "Immunity Support",
    description: "Powerful herbs that support your body's natural defenses.",
    price: 449,
    originalPrice: 599,
    image: "/home/img2.jpg",
    bestseller: true
  },
  {
    id: "fp-3",
    name: "Breathe Easy Tea",
    badge: "Respiratory Wellness",
    description: "A refreshing blend that supports easy breathing and clarity.",
    price: 349,
    originalPrice: 449,
    image: "/home/img3.jpg",
    bestseller: true
  },
  {
    id: "fp-4",
    name: "Gentle Flow Tea",
    badge: "Digestive Wellness",
    description: "Supports healthy digestion and promotes a light, comfortable feel.",
    price: 399,
    originalPrice: 499,
    image: "/home/img4.jpg",
    bestseller: true
  }
];

function FeaturedProductCard({ product, index }: { product: any, index?: number }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      sku: `PACK-${product.id}-1`,
      name: `${product.name} (1 Packet)`,
      priceCents: product.price * 100,
      image: product.image
    });
  };

  return (
    <div className="group bg-[#fdfcf9] rounded-[24px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-black/5">
      {/* Top Section: Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-transform duration-700 ${index === 0 ? 'scale-[1.4] group-hover:scale-[1.5]' : 'group-hover:scale-110'}`} 
        />
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-[20px] font-bold text-[#1c2e24] leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            {product.name}
          </h3>
        </div>
        
        <p className="text-[13px] text-[#6b7b72] mb-6 leading-relaxed flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-end gap-2 mb-6 w-full mt-auto">
          <span className="text-[18px] font-bold text-[#1c2e24] leading-none tracking-tight">₹{product.price}</span>
          <span className="text-[12px] font-bold text-[#a4aca7] line-through leading-none mb-[2px]">₹{product.originalPrice}</span>
        </div>

        <button 
          onClick={handleAddToCart}
          className="w-full bg-[#1c2e24] hover:bg-[#2c4a35] text-white py-3 rounded-lg text-[12px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-xl hover:-translate-y-0.5"
          style={{ fontFamily: 'Nunito Sans, sans-serif' }}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}


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
          <h2 className="text-[28px] md:text-[36px] font-bold text-[#2c4a35] capitalize mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
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

function HowItWorksSection() {
  const steps = [
    {
      num: 1,
      title: "CHOOSE BLEND",
      desc: "Explore our range of herbal blends and choose your favorite.",
      Icon: ShoppingBag,
      color: "from-[#f2f7ed] to-[#e4eed7]",
      iconColor: "text-[#5e8b42]",
      badgeColor: "bg-[#5e8b42]"
    },
    {
      num: 2,
      title: "ADD TO CART",
      desc: "Add your selected products to the cart with ease.",
      Icon: ShoppingCart,
      color: "from-[#fff5ed] to-[#ffe5cf]",
      iconColor: "text-[#d97746]",
      badgeColor: "bg-[#d97746]"
    },
    {
      num: 3,
      title: "CHECKOUT",
      desc: "Review your order and choose a safe & secure payment method.",
      Icon: ClipboardCheck,
      color: "from-[#f0f8ff] to-[#d6efff]",
      iconColor: "text-[#4b8aa3]",
      badgeColor: "bg-[#4b8aa3]"
    },
    {
      num: 4,
      title: "ENJOY YOUR TEA",
      desc: "Relax, unwind and enjoy the goodness of herbal wellness.",
      Icon: Coffee,
      color: "from-[#fffce8] to-[#fff4ba]",
      iconColor: "text-[#d6a524]",
      badgeColor: "bg-[#d6a524]"
    }
  ];

  return (
    <section className="bg-white pt-24 pb-12 relative overflow-hidden border-b border-border/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-4">
            <h2 className="text-[28px] md:text-[36px] font-bold text-[#2c4a35] capitalize" style={{ fontFamily: 'Playfair Display, serif' }}>
              How It Works
            </h2>
          </div>
          <p className="text-[16px] md:text-[18px] text-[#6b7b72] tracking-wide" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            Your journey to a healthier you is simple
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-6 lg:gap-10 relative mb-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.num}>
              {/* Step */}
              <div className="group flex flex-col items-center text-center max-w-[170px] hover:-translate-y-3 transition-all duration-500 cursor-default">
                <div className="relative mb-5">
                  {/* Circle background */}
                  <div className={`w-32 h-32 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${step.color} border-4 border-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:scale-105`}>
                     {/* Inner faint ring */}
                     <div className="absolute inset-2.5 rounded-full border border-black/5 opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
                     <step.Icon className={`w-8 h-8 md:w-10 md:h-10 ${step.iconColor} group-hover:scale-110 transition-transform duration-500 z-10`} />
                  </div>
                  {/* Number Badge */}
                  <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-7 h-7 md:w-8 md:h-8 rounded-full ${step.badgeColor} text-white flex items-center justify-center text-[12px] md:text-[14px] font-bold shadow-md group-hover:-translate-y-1 group-hover:shadow-lg transition-all duration-500`} style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    {step.num}
                  </div>
                </div>
                <h3 className={`text-[13px] md:text-[14px] font-bold ${step.iconColor} uppercase tracking-wider mb-2 transition-colors duration-300`} style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  {step.title}
                </h3>
                <p className="text-[11px] md:text-[12px] text-[#6b7b72] leading-relaxed group-hover:text-[#4a5c51] transition-colors duration-300" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  {step.desc}
                </p>
              </div>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center mt-12 md:mt-16">
                  <ArrowRight className="w-4 h-4 text-[#a4aca7] opacity-60" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [currentPage, setCurrentPage] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Yoga Instructor",
      text: "These herbal teas have become a part of my daily routine. I feel more energetic, calm and healthy. Absolutely love the taste!",
      avatar: "https://i.pravatar.cc/150?img=32",
    },
    {
      id: 2,
      name: "Neha Verma",
      role: "IT Professional",
      text: "The quality is exceptional! You can truly taste the purity and freshness in every sip. My go-to tea for wellness.",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 3,
      name: "Rahul Mehta",
      role: "Entrepreneur",
      text: "I was struggling with bloating and indigestion. Digestive Wellness Tea has been a game changer for me. Highly recommended!",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    {
      id: 4,
      name: "Amit Desai",
      role: "Fitness Coach",
      text: "The Immunity Support blend has kept me feeling 100% all year round. The natural ingredients and rich aroma are simply unbeatable.",
      avatar: "https://i.pravatar.cc/150?img=60",
    },
    {
      id: 5,
      name: "Kavita Reddy",
      role: "Wellness Blogger",
      text: "I have tried many herbal brands, but this one stands out. The respiratory blend really helped soothe my throat during the cold season.",
      avatar: "https://i.pravatar.cc/150?img=44",
    },
    {
      id: 6,
      name: "Sneha Kapoor",
      role: "Nutritionist",
      text: "I recommend these blends to all my clients. The natural herbs offer fantastic digestive benefits without any artificial additives.",
      avatar: "https://i.pravatar.cc/150?img=47",
    }
  ];

  // We show 3 testimonials per page
  const cardsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / cardsPerPage);
  const visibleCards = testimonials.slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage);

  const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages);
  const prevPage = () => setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));

  return (
    <section className="bg-[#fdfbf6] py-14 relative overflow-hidden">
      {/* Decorative leaf motifs background (abstracted as subtle blobs) */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-[#e8f2e1]/40 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-[#e8f2e1]/40 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-[28px] md:text-[36px] font-bold text-[#2c4a35] capitalize" style={{ fontFamily: 'Playfair Display, serif' }}>
            What Our Customers Say
          </h2>
          <p className="text-[14px] md:text-[15px] text-[#7a6c5b]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            Real stories. Real people. Real wellness.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative flex flex-col items-center justify-center">
          
          <div className="flex items-center justify-between w-full">
            {/* Left Arrow */}
            <button onClick={prevPage} className="hidden md:flex absolute -left-4 lg:-left-10 z-20 w-9 h-9 rounded-full bg-[#5e8b42] text-white items-center justify-center hover:bg-[#4a6b3d] transition-colors shadow-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Cards */}
            <div className="overflow-hidden w-full px-1 py-3">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 w-full"
                >
                  {visibleCards.map((t) => (
                    <div key={t.id} className="bg-white rounded-[24px] p-6 md:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.04)] flex flex-col items-center text-center border border-black/5 hover:-translate-y-1.5 transition-transform duration-300">
                      <Quote className="w-9 h-9 text-[#5e8b42] mb-4 fill-current opacity-80" />
                      
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-[#f5a623] fill-current" />
                        ))}
                      </div>

                      <p className="text-[#4a5c51] text-[13px] md:text-[14px] leading-[1.75] flex-1" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                        {t.text}
                      </p>

                      <div className="w-full flex items-center justify-center gap-3 my-5">
                        <div className="flex-1 h-[1px] bg-[#e8e5de]"></div>
                        <Leaf className="w-3.5 h-3.5 text-[#5e8b42]" />
                        <div className="flex-1 h-[1px] bg-[#e8e5de]"></div>
                      </div>

                      <div className="flex items-center gap-3">
                        <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover shadow-sm border-2 border-white" />
                        <div className="text-left">
                          <h4 className="text-[14px] font-bold text-[#2c4a35]" style={{ fontFamily: 'Playfair Display, serif' }}>{t.name}</h4>
                          <p className="text-[12px] text-[#7a6c5b]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{t.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Arrow */}
            <button onClick={nextPage} className="hidden md:flex absolute -right-4 lg:-right-10 z-20 w-9 h-9 rounded-full bg-[#5e8b42] text-white items-center justify-center hover:bg-[#4a6b3d] transition-colors shadow-lg">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2.5 mt-6">
          {[...Array(totalPages)].map((_, i) => (
            <div 
              key={i} 
              onClick={() => setCurrentPage(i)}
              className={`w-2 h-2 rounded-full ${currentPage === i ? 'bg-[#5e8b42]' : 'bg-[#d8e0c8]'} cursor-pointer hover:bg-[#8cb73d] transition-colors`}
            ></div>
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
  const [selectedWellness, setSelectedWellness] = useState<typeof WELLNESS_CARDS[0] | null>(null);

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

      {/* Wellness Starts with the Right Blend */}
      <section className="bg-white py-24 border-b border-border/20 overflow-hidden relative">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-5">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8cb73d] block">Explore Our Blends</span>
            <h2 className="text-[28px] md:text-[36px] font-bold text-[#2c4a35] capitalize" style={{ fontFamily: 'Playfair Display, serif' }}>
              Wellness Starts with the Right Blend
            </h2>
            <p className="text-[15px] md:text-[17px] text-[#6b7b72] leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              Find the herbal tea that aligns with your wellness journey and explore how each blend can become part of your daily routine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WELLNESS_CARDS.map((card: any, index: number) => (
              <motion.div
                key={card.id}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedWellness(card)}
                className="group cursor-pointer rounded-3xl overflow-hidden shadow-[0_8px_30px_-6px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-10px_rgba(44,74,53,0.15)] transition-all duration-500 bg-white relative border border-gray-100"
              >
                <div className="aspect-square relative overflow-hidden bg-white">
                  <img
                    src={card.cardImage}
                    alt={card.title}
                    className={`w-full h-full object-cover transition-transform duration-700 block ${index === 3 ? 'scale-[1.1] translate-y-[2%]' : 'scale-[1.05]'} group-hover:scale-[1.15]`}
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-500" />
                  
                  <div className="absolute inset-x-0 bottom-3 flex justify-center">
                    <div className="inline-flex items-center gap-2 text-[#1c2e24] bg-white/95 hover:bg-white px-5 py-2.5 rounded-full text-[13px] font-bold tracking-wider uppercase shadow-md border border-gray-100 transition-all duration-300">
                      Explore Blend <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Collection */}
      <section className="bg-[#f4f1e6] py-20 border-b border-black/5 overflow-hidden relative">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-center relative mb-14 gap-6">
            <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3">
              <h2 className="text-[28px] md:text-[36px] font-bold text-[#2c4a35] capitalize" style={{ fontFamily: 'Playfair Display, serif' }}>
                Our Herbal Tea Collection
              </h2>
              <p className="text-[14px] md:text-[15px] text-[#6b7b72] leading-[1.7] max-w-2xl" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                Discover our carefully crafted herbal tea blends designed to support your daily wellness journey naturally.
              </p>
            </div>
            <Link href="#shop" className="md:absolute md:right-0 md:bottom-2 text-[13px] font-bold tracking-[0.15em] text-[#e2b755] hover:text-[#f2c765] transition-colors uppercase shrink-0">
              Shop All &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_PRODUCTS.map((product, idx) => (
              <FeaturedProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </div>
      </section>

      <HowItWorksSection />
      <TestimonialsSection />



      {/* About Us Section */}
      <section className="bg-[#f4f1e6] py-24 relative overflow-hidden border-b border-border/20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
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
                <Link href="#about" className="inline-flex items-center gap-2 bg-[#4a6b3d] hover:bg-[#3b5930] text-white px-8 py-4 rounded-xl font-semibold text-[15px] transition-all shadow-[0_8px_20px_-6px_rgba(74,107,61,0.4)] hover:-translate-y-1">
                  Learn More About Us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Features Bar */}
          <div className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 md:divide-x divide-black/[0.08]">
              {[
                { title: "Natural Ingredients", desc: "We use the finest herbs and botanicals, carefully selected for purity and maximum benefits.", icon: <Leaf className="w-6 h-6" /> },
                { title: "Premium Quality", desc: "Our teas are crafted with high-quality ingredients and the highest standards.", icon: <Award className="w-6 h-6" /> },
                { title: "Wellness Focused", desc: "Every blend is designed to support your health, harmony and holistic well-being.", icon: <Coffee className="w-6 h-6" /> },
                { title: "Made with Care", desc: "Blended with love and passion to bring you the best nature has to offer.", icon: <Heart className="w-6 h-6" /> },
                { title: "Sustainable & Ethical", desc: "We care for the planet as much as we care for your wellness.", icon: <Globe className="w-6 h-6" /> }
              ].map((f, i) => (
                <div key={i} className="group flex flex-col items-center text-center px-4 first:pl-0 last:pr-0 cursor-default">
                  <div className="w-14 h-14 bg-[#e8eedd] rounded-full flex items-center justify-center text-[#4a6b3d] mb-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] group-hover:scale-110 group-hover:-translate-y-2 group-hover:bg-[#8cb73d] group-hover:text-white transition-all duration-300 ease-out">
                    {f.icon}
                  </div>
                  <h4 className="font-bold text-[#1c2e24] mb-3 text-[16px] group-hover:text-[#4a6b3d] transition-colors duration-300" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{f.title}</h4>
                  <p className="text-[13px] text-[#6b7b72] leading-relaxed max-w-[200px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
          


        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Wellness Modal */}
      <AnimatePresence>
        {selectedWellness && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 md:px-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedWellness(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#fcfbf9] rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              <div className="overflow-y-auto no-scrollbar pb-8">
                {/* Header Image Area */}
                <div className="relative aspect-[4/3] w-full bg-[#1c2e24]">
                  <img src={selectedWellness.modalImage} alt={selectedWellness.title} className="w-full h-full object-cover opacity-80" />
                  
                  {/* Close button */}
                  <button 
                    onClick={() => setSelectedWellness(null)}
                    className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-[#1c2e24] hover:bg-white/40 transition-colors z-20"
                  >
                    <X className="w-5 h-5" />
                  </button>



                  {/* Title */}
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#fcfbf9] via-[#fcfbf9]/90 to-transparent pt-20">
                    <h3 className="text-2xl font-bold text-[#1c2e24] leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {selectedWellness.title}
                    </h3>
                  </div>
                </div>

                {/* Content Area */}
                <div className="px-6 space-y-8 mt-2">
                  {/* Subtitle */}
                  <p className="text-[15px] italic text-[#6b7b72] border-l-2 border-[#8cb73d]/30 pl-4 py-1" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    {selectedWellness.subtitle}
                  </p>

                  {/* Therapeutic Benefits */}
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8cb73d] mb-4 border-b border-black/5 pb-2">Therapeutic Benefits</h4>
                    <div className="space-y-3">
                      {selectedWellness.benefits.map((benefit: any, idx: number) => (
                        <div key={idx} className="bg-[#f4f2ee] p-4 rounded-xl flex items-start gap-4">
                          <div className="mt-0.5">{benefit.icon}</div>
                          <div>
                            <h5 className="text-[14px] font-bold text-[#1c2e24] mb-1">{benefit.title}</h5>
                            <p className="text-[12.5px] text-[#6b7b72] leading-relaxed">{benefit.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Ingredients */}
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8cb73d] mb-4 border-b border-black/5 pb-2">Active Ingredients</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedWellness.ingredients.map((ing: any, idx: number) => (
                        <div key={idx} className="bg-[#f4f2ee] p-4 rounded-xl flex flex-col items-center justify-center text-center gap-1.5 border border-transparent hover:border-[#8cb73d]/20 transition-colors">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-[#6b7b72]">{ing.type}</span>
                          <span className="text-[15px] font-semibold text-[#1c2e24]" style={{ fontFamily: 'Playfair Display, serif' }}>{ing.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ritual */}
                  <div className="bg-[#f4f2ee] p-6 rounded-2xl border border-black/5 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 text-[#8cb73d]/10">
                      <Clock className="w-24 h-24" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 text-[#2c4a35] font-semibold text-[13px] tracking-widest uppercase mb-3">
                        <Clock className="w-4 h-4" /> The Ritual
                      </div>
                      <p className="text-[14px] text-[#6b7b72] leading-[1.8]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                        {selectedWellness.ritual}
                      </p>
                    </div>
                  </div>

                  {/* Action */}
                  <Link href="/shop" className="w-full py-4 bg-[#0a1811] hover:bg-[#1c2e24] text-white rounded-full font-bold text-[13px] tracking-[0.15em] uppercase transition-colors flex items-center justify-center gap-2 group shadow-xl">
                    Explore Collection
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
