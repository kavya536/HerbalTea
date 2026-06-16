'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Leaf, Star, Heart, Search } from 'lucide-react';
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
            <h1 className="text-[40px] md:text-[64px] font-semibold text-white tracking-widest uppercase mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Our Shop
            </h1>
            <p className="text-[16px] md:text-[20px] text-white/95 font-light tracking-wide leading-relaxed" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              Discover our premium collection of herbal wellness blends.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Special Herbal Discounts Section */}
      <div className="w-full relative z-20">
        <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-0 lg:pt-12 lg:pb-0 relative">
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
            {/* Left Content */}
            <div className="lg:w-1/3 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center lg:items-start"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-5 h-5 text-[#2c4a35] fill-[#2c4a35]" />
                  <span className="text-[#2c4a35] font-semibold tracking-widest text-[13px] uppercase" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Exclusive Offers</span>
                </div>
                <h2 className="text-3xl md:text-4xl text-[#1c2e24] font-medium mb-3 leading-none" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Nature's Best,<br /> For Less.
                </h2>
                <p className="text-[#6b7b72] text-sm md:text-base leading-relaxed" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  Enhance your holistic health journey with our premium wellness blends. Enjoy up to 20% off on our handpicked herbal selections.
                </p>
              </motion.div>
            </div>
            
            {/* Right Content - Discounted Products */}
            <div className="lg:w-2/3 w-full flex flex-col sm:flex-row gap-5 justify-center lg:justify-end">
              {PRODUCTS.filter(p => p.discount && p.discount >= 15).slice(0, 3).map((product, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  key={`discount-offer-${product.id}`} 
                  onClick={() => router.push(`/shop/${product.id}`)}
                  className="relative aspect-square w-full sm:w-[180px] lg:w-[200px] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.2)] group cursor-pointer border border-[#2c4a35]/60"
                >
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                  <div className="absolute top-3 right-3 bg-[#e2b755] text-[#1c2e24] text-[13px] font-bold px-3 py-1 rounded-md shadow-md">
                    {product.discount}% OFF
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
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
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  key={product.id} 
                  onClick={() => router.push(`/shop/${product.id}`)}
                  className="flex flex-col group cursor-pointer bg-white rounded-[20px] border border-[#e8e5de] overflow-hidden shadow-[0_4px_20px_-6px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_32px_-8px_rgba(28,46,36,0.12)] hover:-translate-y-1.5 transition-all duration-300 aspect-[3/4]"
                >
                  {/* Product Image 70% */}
                  <div className="relative h-[70%] w-full bg-[#f9f8f6] overflow-hidden">
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className={`w-full h-full object-cover transition-transform duration-700 ease-in-out ${product.id === 1 ? 'scale-[1.35] group-hover:scale-[1.45]' : 'group-hover:scale-110'}`} 
                    />
                  </div>
                  
                  {/* Product Details 30% */}
                  <div className="flex flex-col justify-between h-[30%] p-4">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-semibold text-[#1c2e24] text-[18px] line-clamp-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {product.name}
                      </h4>
                      {/* Rating Badge & Reviews */}
                      <div className="flex flex-col items-end gap-1 shrink-0 mt-0.5">
                        <div className="bg-[#e2b755] text-white text-[11px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-sm">
                          {product.rating.toFixed(1)} <Star className="w-2.5 h-2.5 fill-white text-white" />
                        </div>
                        <span className="text-[#6b7b72] text-[10px] font-medium whitespace-nowrap">
                          {product.reviews} reviews
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-baseline gap-2 mt-auto">
                      <span className="font-bold text-[#1c2e24] text-[18px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-400 text-[13px] line-through decoration-gray-300">
                          ₹{product.originalPrice}
                        </span>
                      )}
                      {product.discount && (
                        <span className="text-[#8cb73d] font-bold text-[12px] ml-1">
                          {product.discount}% off
                        </span>
                      )}
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
                <h3 className="font-semibold text-[#1c2e24] text-[16px]" style={{ fontFamily: 'Playfair Display, serif' }}>Search by Products</h3>
              </div>
              <div className="relative flex items-center bg-white border border-[#e8e5de] rounded-full pl-5 pr-1.5 py-1.5 w-full shadow-sm focus-within:border-[#e2b755] focus-within:ring-1 focus-within:ring-[#e2b755] transition-all">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-[16px] text-[#1c2e24] placeholder:text-[#8b9992] focus:outline-none w-full pr-4 py-2.5" 
                />
                <button className="bg-[#e2b755] text-white p-3 rounded-full hover:bg-[#d4a844] transition-colors flex items-center justify-center cursor-pointer shrink-0">
                  <Search className="h-5 w-5 text-slate-800" />
                </button>
              </div>
            </div>

            {/* Product Categories */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-[#2c4a35] fill-[#2c4a35]" />
                <h3 className="font-semibold text-[#1c2e24] text-[16px]" style={{ fontFamily: 'Playfair Display, serif' }}>Product Categories</h3>
              </div>
              <div className="flex flex-col gap-3">
                 {CATEGORIES.map(cat => (
                   <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                     <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                       <input 
                         type="radio" 
                         name="category" 
                         checked={selectedCategory === cat}
                         onChange={() => setSelectedCategory(cat)}
                         className="peer appearance-none w-4 h-4 rounded-full border border-[#d1c8ba] checked:border-[#2c4a35] transition-colors" 
                       />
                       <div className="absolute w-2 h-2 rounded-full bg-[#2c4a35] opacity-0 peer-checked:opacity-100 transition-opacity duration-300 scale-50 peer-checked:scale-100" />
                     </div>
                     <span className={`text-[14px] transition-colors ${selectedCategory === cat ? 'text-[#1c2e24] font-medium' : 'text-[#6b7b72] group-hover:text-[#1c2e24]'}`} style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
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
                <h3 className="font-semibold text-[#1c2e24] text-[16px]" style={{ fontFamily: 'Playfair Display, serif' }}>Tea Type</h3>
              </div>
              <div className="flex flex-col gap-3">
                 {TEA_TYPES.map(type => (
                   <label key={type} className="flex items-center gap-3 cursor-pointer group">
                     <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                       <input 
                         type="radio" 
                         name="teaType" 
                         checked={selectedType === type}
                         onChange={() => setSelectedType(type)}
                         className="peer appearance-none w-4 h-4 rounded-full border border-[#d1c8ba] checked:border-[#2c4a35] transition-colors" 
                       />
                       <div className="absolute w-2 h-2 rounded-full bg-[#2c4a35] opacity-0 peer-checked:opacity-100 transition-opacity duration-300 scale-50 peer-checked:scale-100" />
                     </div>
                     <span className={`text-[14px] transition-colors ${selectedType === type ? 'text-[#1c2e24] font-medium' : 'text-[#6b7b72] group-hover:text-[#1c2e24]'}`} style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
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
                <h3 className="font-semibold text-[#1c2e24] text-[16px]" style={{ fontFamily: 'Playfair Display, serif' }}>Weight</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                 {WEIGHTS.map(w => (
                   <button 
                     key={w} 
                     onClick={() => setSelectedWeight(w)}
                     className={`px-4 py-2 rounded-full border text-[13px] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm ${selectedWeight === w ? 'bg-[#2c4a35] text-white border-[#2c4a35] shadow-md' : 'bg-transparent text-[#6b7b72] border-[#d1c8ba] hover:border-[#2c4a35] hover:text-[#1c2e24]'}`}
                     style={{ fontFamily: 'Nunito Sans, sans-serif' }}
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
                <h3 className="font-semibold text-[#1c2e24] text-[16px]" style={{ fontFamily: 'Playfair Display, serif' }}>Filter by Price</h3>
              </div>
              <div className="px-1 flex flex-col">
                <input 
                  type="range" 
                  min="200" 
                  max="1020" 
                  value={priceValue}
                  onChange={(e) => setPriceValue(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#d1c8ba] rounded-full appearance-none outline-none cursor-pointer accent-[#2c4a35] mb-3"
                />
                <div className="flex justify-between text-[13px] text-[#1c2e24] font-medium" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  <span>₹200</span>
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
