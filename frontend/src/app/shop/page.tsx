'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Leaf, Star, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../../features/cart/cartStore';

// Herbal Tea specific products with rich data for filtering
const PRODUCTS = [
  { id: 1, name: "Premium Herbal Blend", price: 450.00, originalPrice: 500, discount: 10, img: "/home/img1.jpg", rating: 4.5, reviews: 124, category: "Wellness Blends", type: "Herbal", weight: "100g" },
  { id: 2, name: "Calming Chamomile", price: 350.00, originalPrice: 400, discount: 12, img: "/home/img2.jpg", rating: 4.0, reviews: 89, category: "Loose Leaf", type: "Decaf", weight: "50g" },
  { id: 3, name: "Morning Matcha", price: 850.00, originalPrice: 1000, discount: 15, img: "/home/img3.jpg", rating: 4.8, reviews: 342, category: "Matcha", type: "Caffeinated", weight: "250g" },
  { id: 4, name: "Detox Green Wellness", price: 400.00, originalPrice: 500, discount: 20, img: "/home/img4.jpg", rating: 4.1, reviews: 56, category: "Wellness Blends", type: "Caffeinated", weight: "100g" },
  { id: 5, name: "Sleepy Time Essence", price: 300.00, originalPrice: 350, discount: 14, img: "/home/img5.jpg", rating: 4.7, reviews: 210, category: "Tea Bags", type: "Herbal", weight: "50g" },
  { id: 6, name: "Energy Boost Root", price: 600.00, originalPrice: 750, discount: 20, img: "/home/img6.jpg", rating: 4.3, reviews: 112, category: "Loose Leaf", type: "Caffeinated", weight: "250g" },
  { id: 7, name: "Immunity Shield", price: 550.00, originalPrice: 650, discount: 15, img: "/home/img7.jpg", rating: 4.9, reviews: 420, category: "Wellness Blends", type: "Herbal", weight: "100g" },
  { id: 8, name: "Focus & Clarity", price: 750.00, originalPrice: 850, discount: 11, img: "/home/img8.jpg", rating: 4.6, reviews: 175, category: "Matcha", type: "Caffeinated", weight: "100g" },
  { id: 9, name: "Digestive Soothe", price: 380.00, originalPrice: 420, discount: 9, img: "/home/herbal.jpg", rating: 4.2, reviews: 93, category: "Tea Bags", type: "Herbal", weight: "50g" },
];

const CATEGORIES = ['All', 'Loose Leaf', 'Tea Bags', 'Matcha', 'Wellness Blends'];
const TEA_TYPES = ['All', 'Caffeinated', 'Decaf', 'Herbal'];
const WEIGHTS = ['All', '50g', '100g', '250g'];

export default function ShopPage() {
  const router = useRouter();

  // Dynamic States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedWeight, setSelectedWeight] = useState('All');
  const [priceValue, setPriceValue] = useState(1020); // Default to max

  // Powerful Filtering Logic
  const filteredProducts = PRODUCTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchType = selectedType === 'All' || p.type === selectedType;
    const matchWeight = selectedWeight === 'All' || p.weight === selectedWeight;
    const matchPrice = p.price <= priceValue;

    return matchSearch && matchCategory && matchType && matchWeight && matchPrice;
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f5f0e6]">
      {/* Background Image Hero Section */}
      <div 
        className="relative w-full h-[60vh] md:h-[80vh] flex flex-col justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/home/shop.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c2e24]/80 via-[#1c2e24]/50 to-transparent" /> 
        
        <div className="absolute top-6 md:top-8 left-4 sm:left-6 lg:left-8 z-20">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-left max-w-xl"
          >
            <h1 className="text-[40px] md:text-[64px] font-semibold text-white tracking-widest uppercase mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Our Shop
            </h1>
            <p className="text-[16px] md:text-[20px] text-white/95 font-light tracking-wide leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Discover our premium collection of herbal wellness blends.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Shop Content Area */}
      <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Products Grid (3 columns) */}
          <div className="w-full lg:w-3/4 order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
              {filteredProducts.map(product => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  key={product.id} 
                  onClick={() => router.push(`/shop/${product.id}`)}
                  className="flex flex-col group cursor-pointer bg-white rounded-lg border border-[#e8e5de] p-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Product Image */}
                  <div className="relative aspect-[4/5] bg-[#f9f8f6] rounded-md overflow-hidden mb-4">
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                    />
                  </div>
                  
                  {/* Product Details (Title, Prices, Reviews) matching Image 1 */}
                  <div className="flex flex-col px-1 pb-2">
                    <h4 className="font-medium text-gray-500 text-[14px] truncate mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {product.name}
                    </h4>
                    
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="font-bold text-[#1c2e24] text-[20px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-400 text-[13px] line-through decoration-gray-300">
                          ₹{product.originalPrice}
                        </span>
                      )}
                      {product.discount && (
                        <span className="text-[#008c5a] font-bold text-[13px]">
                          {product.discount}% off
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mt-auto">
                      <div className="bg-[#008c5a] text-white text-[12px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        {product.rating.toFixed(1)} <Star className="w-3 h-3 fill-white" />
                      </div>
                      <span className="text-gray-500 text-[12px] font-medium">
                        {product.reviews} Reviews
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-12 text-center text-[#6b7b72]">
                  No products found matching your filters. Try adjusting the price or categories.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sidebar Filters */}
          <div className="w-full lg:w-1/4 order-1 lg:order-2 flex flex-col gap-10 sticky top-28">
            
            {/* Search */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-[#2c4a35] fill-[#2c4a35]" />
                <h3 className="font-semibold text-[#1c2e24] text-[16px]" style={{ fontFamily: 'Poppins, sans-serif' }}>Search by Products</h3>
              </div>
              <div className="flex shadow-sm rounded-full bg-white">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-y border-l border-[#e8e5de] rounded-l-full px-5 py-2.5 w-full focus:outline-none focus:border-[#e2b755] text-[14px] text-[#1c2e24] placeholder:text-[#8b9992] transition-colors" 
                />
                <button className="bg-[#e2b755] text-[#1c2e24] px-6 py-2.5 rounded-r-full font-semibold text-[14px] hover:bg-[#d4a844] transition-colors border-y border-r border-[#e2b755]">
                  Search
                </button>
              </div>
            </div>

            {/* Product Categories */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-[#2c4a35] fill-[#2c4a35]" />
                <h3 className="font-semibold text-[#1c2e24] text-[16px]" style={{ fontFamily: 'Poppins, sans-serif' }}>Product Categories</h3>
              </div>
              <div className="flex flex-col gap-3">
                 {CATEGORIES.map(cat => (
                   <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                     <div className="relative flex items-center justify-center">
                       <input 
                         type="radio" 
                         name="category" 
                         checked={selectedCategory === cat}
                         onChange={() => setSelectedCategory(cat)}
                         className="peer appearance-none w-4 h-4 rounded-full border border-[#d1c8ba] checked:border-[#2c4a35] transition-colors" 
                       />
                       <div className="absolute w-2 h-2 rounded-full bg-[#2c4a35] opacity-0 peer-checked:opacity-100 transition-opacity" />
                     </div>
                     <span className={`text-[14px] transition-colors ${selectedCategory === cat ? 'text-[#1c2e24] font-medium' : 'text-[#6b7b72] group-hover:text-[#1c2e24]'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                       {cat}
                     </span>
                   </label>
                 ))}
              </div>
            </div>

            {/* Plant Type (Tea Type) */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-[#2c4a35] fill-[#2c4a35]" />
                <h3 className="font-semibold text-[#1c2e24] text-[16px]" style={{ fontFamily: 'Poppins, sans-serif' }}>Tea Type</h3>
              </div>
              <div className="flex flex-col gap-3">
                 {TEA_TYPES.map(type => (
                   <label key={type} className="flex items-center gap-3 cursor-pointer group">
                     <div className="relative flex items-center justify-center">
                       <input 
                         type="radio" 
                         name="teaType" 
                         checked={selectedType === type}
                         onChange={() => setSelectedType(type)}
                         className="peer appearance-none w-4 h-4 rounded-full border border-[#d1c8ba] checked:border-[#2c4a35] transition-colors" 
                       />
                       <div className="absolute w-2 h-2 rounded-full bg-[#2c4a35] opacity-0 peer-checked:opacity-100 transition-opacity" />
                     </div>
                     <span className={`text-[14px] transition-colors ${selectedType === type ? 'text-[#1c2e24] font-medium' : 'text-[#6b7b72] group-hover:text-[#1c2e24]'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                       {type}
                     </span>
                   </label>
                 ))}
              </div>
            </div>

            {/* Weight */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-[#2c4a35] fill-[#2c4a35]" />
                <h3 className="font-semibold text-[#1c2e24] text-[16px]" style={{ fontFamily: 'Poppins, sans-serif' }}>Weight</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                 {WEIGHTS.map(w => (
                   <button 
                     key={w} 
                     onClick={() => setSelectedWeight(w)}
                     className={`px-4 py-2 rounded-full border text-[13px] font-medium transition-colors ${selectedWeight === w ? 'bg-[#2c4a35] text-white border-[#2c4a35]' : 'bg-transparent text-[#6b7b72] border-[#d1c8ba] hover:border-[#2c4a35] hover:text-[#1c2e24]'}`}
                     style={{ fontFamily: 'Inter, sans-serif' }}
                   >
                     {w}
                   </button>
                 ))}
              </div>
            </div>

            {/* Filter by Price */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-[#2c4a35] fill-[#2c4a35]" />
                <h3 className="font-semibold text-[#1c2e24] text-[16px]" style={{ fontFamily: 'Poppins, sans-serif' }}>Filter by Price</h3>
              </div>
              <div className="px-1 flex flex-col">
                <input 
                  type="range" 
                  min="4" 
                  max="1020" 
                  value={priceValue}
                  onChange={(e) => setPriceValue(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#d1c8ba] rounded-full appearance-none outline-none cursor-pointer accent-[#2c4a35] mb-3"
                />
                <div className="flex justify-between text-[13px] text-[#1c2e24] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <span>₹4</span>
                  <span className="text-[#8cb73d] font-bold">Max: ₹{priceValue}</span>
                  <span>₹1020</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
