'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Leaf, Star, Heart, Search, ShoppingBasket } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../../features/cart/cartStore';

// Herbal Tea specific products with rich data for filtering
const PRODUCTS = [
  { id: 1, name: "Premium Herbal Blend", price: 450.00, originalPrice: 500, discount: 10, img: "/shop/red_tea.png", rating: 4.5, reviews: 124, category: "Wellness Blends", type: "Herbal", weight: "15 Packets", benefit: "Relaxation", ingredient: "Mint" },
  { id: 2, name: "Calming Chamomile", price: 350.00, originalPrice: 400, discount: 12, img: "/shop/green_tea.png", rating: 4.0, reviews: 89, category: "Loose Leaf", type: "Decaf", weight: "10 Packets", benefit: "Relaxation", ingredient: "Chamomile" },
  { id: 3, name: "Morning Matcha", price: 850.00, originalPrice: 1000, discount: 15, img: "/shop/blue.png", rating: 4.8, reviews: 342, category: "Matcha", type: "Caffeinated", weight: "30 Packets", benefit: "Energy", ingredient: "Matcha" },
  { id: 4, name: "Detox Green Wellness", price: 400.00, originalPrice: 500, discount: 20, img: "/shop/ruby_detox.png", rating: 4.1, reviews: 56, category: "Wellness Blends", type: "Caffeinated", weight: "15 Packets", benefit: "Digestion", ingredient: "Mint" },
  { id: 5, name: "Sleepy Time Essence", price: 300.00, originalPrice: 350, discount: 14, img: "/shop/blue_tea1.png", rating: 4.7, reviews: 210, category: "Tea Bags", type: "Herbal", weight: "10 Packets", benefit: "Relaxation", ingredient: "Chamomile" },
  { id: 6, name: "Energy Boost Root", price: 600.00, originalPrice: 750, discount: 20, img: "/shop/red_tea.png", rating: 4.3, reviews: 112, category: "Loose Leaf", type: "Caffeinated", weight: "20 Packets", benefit: "Energy", ingredient: "Ginger" },
  { id: 7, name: "Immunity Shield", price: 550.00, originalPrice: 650, discount: 15, img: "/shop/green_tea.png", rating: 4.9, reviews: 420, category: "Wellness Blends", type: "Herbal", weight: "20 Packets", benefit: "Immunity", ingredient: "Ginger" },
  { id: 8, name: "Focus & Clarity", price: 750.00, originalPrice: 850, discount: 11, img: "/shop/ruby_detox.png", rating: 4.6, reviews: 175, category: "Matcha", type: "Caffeinated", weight: "30 Packets", benefit: "Energy", ingredient: "Matcha" },
  { id: 9, name: "Digestive Soothe", price: 380.00, originalPrice: 420, discount: 9, img: "/shop/blue_tea1.png", rating: 4.2, reviews: 93, category: "Tea Bags", type: "Herbal", weight: "10 Packets", benefit: "Digestion", ingredient: "Ginger" },
];

const CATEGORIES = ['All', 'Loose Leaf', 'Tea Bags', 'Matcha', 'Wellness Blends'];
const BENEFITS = ['All', 'Relaxation', 'Energy', 'Immunity', 'Digestion'];
const INGREDIENTS = ['All', 'Chamomile', 'Matcha', 'Ginger', 'Mint'];
const RATINGS = ['All', '4 Stars & Up', '3 Stars & Up'];

export default function ShopPage() {
  const router = useRouter();

  // Dynamic States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBenefit, setSelectedBenefit] = useState('All');
  const [selectedIngredient, setSelectedIngredient] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [priceValue, setPriceValue] = useState(1020); // Default to max

  // Powerful Filtering Logic
  const filteredProducts = PRODUCTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchBenefit = selectedBenefit === 'All' || p.benefit === selectedBenefit;
    const matchIngredient = selectedIngredient === 'All' || p.ingredient === selectedIngredient;
    let matchRating = true;
    if (selectedRating === '4 Stars & Up') matchRating = p.rating >= 4.0;
    if (selectedRating === '3 Stars & Up') matchRating = p.rating >= 3.0;
    const matchPrice = p.price <= priceValue;

    return matchSearch && matchCategory && matchBenefit && matchIngredient && matchRating && matchPrice;
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f5f0e6]">
      {/* Background Image Hero Section */}
      <div 
        className="relative w-full h-[60vh] md:h-[80vh] flex flex-col justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/shop/shop_hero.png)' }}
      >
        
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
                  className="flex flex-col group cursor-pointer bg-white rounded-3xl border border-[#e8e5de] hover:border-[#ffc107] p-5 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="relative w-full h-[280px] mb-2 flex items-center justify-center rounded-t-3xl pt-2 px-1">
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className={`w-full h-full object-contain drop-shadow-sm transition-transform duration-700 ease-in-out ${product.img.endsWith('/blue.png') ? 'scale-[1.4] translate-y-1' : (product.img.endsWith('/ruby_detox.png') || product.img.endsWith('/blue_tea1.png') ? 'scale-[1.3] translate-y-2' : '')}`} 
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex flex-col flex-1">
                    {/* Rating (5 Stars) */}
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                         <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-[#ffc107] text-[#ffc107]' : 'fill-[#e8e5de] text-[#e8e5de]'}`} />
                      ))}
                    </div>

                    <h4 className="font-bold text-[#0F3D2E] group-hover:text-[#4caf50] text-[18px] leading-tight mb-2 transition-colors duration-300" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                      {product.name}
                    </h4>
                    
                    <span className="text-[#8b9992] text-[13px] font-medium mb-4 uppercase">
                      {product.category} {product.weight}
                    </span>
                    
                    <div className="flex items-center justify-between mt-auto gap-3">
                      <div className="flex flex-col shrink-0">
                        <span className="font-bold text-[#0F3D2E] text-[20px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                          ₹{product.price.toFixed(2)}
                        </span>
                      </div>
                      
                      {/* Add To Cart Button */}
                      <button 
                        onClick={(e) => { e.stopPropagation(); router.push(`/shop/${product.id}`); }}
                        className="relative group/btn flex items-center justify-end h-10 w-10 group-hover:w-[135px] cursor-pointer transition-all duration-300"
                      >
                        {/* Expanding text pill */}
                        <div className="absolute right-4 h-[26px] flex items-center rounded-l-full bg-[#4caf50] text-white overflow-hidden transition-all duration-300 w-0 group-hover:w-[115px] group-hover/btn:!bg-[#ffc107] group-hover/btn:!text-[#0F3D2E] z-0">
                          <span className="whitespace-nowrap font-bold text-[13px] pl-3">
                            Add To Cart
                          </span>
                        </div>
                        {/* Fixed yellow circle */}
                        <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-[#ffc107] text-[#0F3D2E] shrink-0">
                          <ShoppingBasket className="w-5 h-5" />
                        </div>
                      </button>
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
                <h3 className="font-semibold text-[#0F3D2E] text-[16px]" style={{ fontFamily: 'Playfair Display, serif' }}>Search by Products</h3>
              </div>
              <div className="relative flex items-center bg-white border border-[#e8e5de] rounded-full pl-5 pr-1.5 py-1.5 w-full shadow-sm focus-within:border-[#e2b755] focus-within:ring-1 focus-within:ring-[#e2b755] transition-all">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-[16px] text-[#0F3D2E] placeholder:text-[#8b9992] focus:outline-none w-full pr-4 py-2.5" 
                />
                <button className="bg-[#e2b755] text-white p-3 rounded-full hover:bg-[#d4a844] transition-colors flex items-center justify-center cursor-pointer shrink-0">
                  <Search className="h-5 w-5 text-slate-800" />
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-[#2c4a35] fill-[#2c4a35]" />
                <h3 className="font-semibold text-[#0F3D2E] text-[16px]" style={{ fontFamily: 'Playfair Display, serif' }}>Benefits</h3>
              </div>
              <div className="flex flex-col gap-3">
                 {BENEFITS.map(ben => (
                   <label key={ben} className="flex items-center gap-3 cursor-pointer group">
                     <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                       <input 
                         type="radio" 
                         name="benefit" 
                         checked={selectedBenefit === ben}
                         onChange={() => setSelectedBenefit(ben)}
                         className="peer appearance-none w-4 h-4 rounded-full border border-[#d1c8ba] checked:border-[#2c4a35] transition-colors" 
                       />
                       <div className="absolute w-2 h-2 rounded-full bg-[#2c4a35] opacity-0 peer-checked:opacity-100 transition-opacity duration-300 scale-50 peer-checked:scale-100" />
                     </div>
                     <span className={`text-[14px] transition-colors ${selectedBenefit === ben ? 'text-[#0F3D2E] font-medium' : 'text-[#6b7b72] group-hover:text-[#0F3D2E]'}`} style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                       {ben}
                     </span>
                   </label>
                 ))}
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-[#2c4a35] fill-[#2c4a35]" />
                <h3 className="font-semibold text-[#0F3D2E] text-[16px]" style={{ fontFamily: 'Playfair Display, serif' }}>Ingredients</h3>
              </div>
              <div className="flex flex-col gap-3">
                 {INGREDIENTS.map(ing => (
                   <label key={ing} className="flex items-center gap-3 cursor-pointer group">
                     <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                       <input 
                         type="radio" 
                         name="ingredient" 
                         checked={selectedIngredient === ing}
                         onChange={() => setSelectedIngredient(ing)}
                         className="peer appearance-none w-4 h-4 rounded-full border border-[#d1c8ba] checked:border-[#2c4a35] transition-colors" 
                       />
                       <div className="absolute w-2 h-2 rounded-full bg-[#2c4a35] opacity-0 peer-checked:opacity-100 transition-opacity duration-300 scale-50 peer-checked:scale-100" />
                     </div>
                     <span className={`text-[14px] transition-colors ${selectedIngredient === ing ? 'text-[#0F3D2E] font-medium' : 'text-[#6b7b72] group-hover:text-[#0F3D2E]'}`} style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                       {ing}
                     </span>
                   </label>
                 ))}
              </div>
            </div>

            {/* Product Categories */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-[#2c4a35] fill-[#2c4a35]" />
                <h3 className="font-semibold text-[#0F3D2E] text-[16px]" style={{ fontFamily: 'Playfair Display, serif' }}>Category</h3>
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
                     <span className={`text-[14px] transition-colors ${selectedCategory === cat ? 'text-[#0F3D2E] font-medium' : 'text-[#6b7b72] group-hover:text-[#0F3D2E]'}`} style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                       {cat}
                     </span>
                   </label>
                 ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-[#2c4a35] fill-[#2c4a35]" />
                <h3 className="font-semibold text-[#0F3D2E] text-[16px]" style={{ fontFamily: 'Playfair Display, serif' }}>Rating</h3>
              </div>
              <div className="flex flex-col gap-3">
                 {RATINGS.map(rate => (
                   <label key={rate} className="flex items-center gap-3 cursor-pointer group">
                     <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                       <input 
                         type="radio" 
                         name="rating" 
                         checked={selectedRating === rate}
                         onChange={() => setSelectedRating(rate)}
                         className="peer appearance-none w-4 h-4 rounded-full border border-[#d1c8ba] checked:border-[#2c4a35] transition-colors" 
                       />
                       <div className="absolute w-2 h-2 rounded-full bg-[#2c4a35] opacity-0 peer-checked:opacity-100 transition-opacity duration-300 scale-50 peer-checked:scale-100" />
                     </div>
                     <span className={`text-[14px] transition-colors flex items-center gap-1 ${selectedRating === rate ? 'text-[#0F3D2E] font-medium' : 'text-[#6b7b72] group-hover:text-[#0F3D2E]'}`} style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                       {rate} {rate !== 'All' && <Star className="w-3 h-3 fill-[#e2b755] text-[#e2b755]" />}
                     </span>
                   </label>
                 ))}
              </div>
            </div>

            {/* Filter by Price */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-[#2c4a35] fill-[#2c4a35]" />
                <h3 className="font-semibold text-[#0F3D2E] text-[16px]" style={{ fontFamily: 'Playfair Display, serif' }}>Filter by Price</h3>
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
                <div className="flex justify-between text-[13px] text-[#0F3D2E] font-medium" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
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
