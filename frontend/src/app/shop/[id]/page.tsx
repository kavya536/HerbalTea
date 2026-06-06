'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Share2, ChevronLeft, ChevronRight, ArrowLeft, Check } from 'lucide-react';
import { useCartStore } from '../../../features/cart/cartStore';

// Temporary mock data. In a real app, this would be fetched based on the ID.
const PRODUCTS = [
  { id: 1, name: "Premium Herbal Blend", price: 450.00, originalPrice: 500, discount: 10, img: "/home/img1.jpg", rating: 4.5, reviews: 124, category: "Wellness Blends", type: "Herbal", weight: "100g", description: "Elementum eu facilisis sed odio morbi quis commodo odio. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Arcu felis bibendum ut tristique et egestas. Id semper risus in hendrerit gravida rutrum." },
  { id: 2, name: "Calming Chamomile", price: 350.00, originalPrice: 400, discount: 12, img: "/home/img2.jpg", rating: 4.0, reviews: 89, category: "Loose Leaf", type: "Decaf", weight: "50g", description: "Elementum eu facilisis sed odio morbi quis commodo odio. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque." },
  { id: 3, name: "Morning Matcha", price: 850.00, originalPrice: 1000, discount: 15, img: "/home/img3.jpg", rating: 4.8, reviews: 342, category: "Matcha", type: "Caffeinated", weight: "250g", description: "Id semper risus in hendrerit gravida rutrum. Elementum eu facilisis sed odio morbi quis commodo odio." },
  { id: 4, name: "Detox Green Wellness", price: 400.00, originalPrice: 500, discount: 20, img: "/home/img4.jpg", rating: 4.1, reviews: 56, category: "Wellness Blends", type: "Caffeinated", weight: "100g", description: "Mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Arcu felis bibendum ut tristique et egestas." },
  { id: 5, name: "Sleepy Time Essence", price: 300.00, originalPrice: 350, discount: 14, img: "/home/img5.jpg", rating: 4.7, reviews: 210, category: "Tea Bags", type: "Herbal", weight: "50g", description: "Elementum eu facilisis sed odio morbi quis commodo odio. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque." },
  { id: 6, name: "Energy Boost Root", price: 600.00, originalPrice: 750, discount: 20, img: "/home/img6.jpg", rating: 4.3, reviews: 112, category: "Loose Leaf", type: "Caffeinated", weight: "250g", description: "Arcu felis bibendum ut tristique et egestas. Id semper risus in hendrerit gravida rutrum." },
  { id: 7, name: "Immunity Shield", price: 550.00, originalPrice: 650, discount: 15, img: "/home/img7.jpg", rating: 4.9, reviews: 420, category: "Wellness Blends", type: "Herbal", weight: "100g", description: "Elementum eu facilisis sed odio morbi quis commodo odio. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque." },
  { id: 8, name: "Focus & Clarity", price: 750.00, originalPrice: 850, discount: 11, img: "/home/img8.jpg", rating: 4.6, reviews: 175, category: "Matcha", type: "Caffeinated", weight: "100g", description: "Mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Arcu felis bibendum ut tristique et egestas." },
  { id: 9, name: "Digestive Soothe", price: 380.00, originalPrice: 420, discount: 9, img: "/home/herbal.jpg", rating: 4.2, reviews: 93, category: "Tea Bags", type: "Herbal", weight: "50g", description: "Elementum eu facilisis sed odio morbi quis commodo odio. Id semper risus in hendrerit gravida rutrum." },
];

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem, items, updateQuantity, removeItem } = useCartStore();
  
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  // Find product by ID from URL params
  const productId = Number(params.id);
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

  const sku = `sku-${product.id}`;
  const cartItem = items.find(i => i.sku === sku);
  const currentQuantity = cartItem?.quantity || 0;

  // Mock gallery images
  const gallery = [product.img, "/home/img2.jpg", "/home/img4.jpg", "/home/herbal.jpg"];

  const handleAddToCart = () => {
    if (!cartItem) {
      addItem({
        sku,
        name: product.name,
        priceCents: product.price * 100
      });
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000);
  };

  const increaseQuantity = () => {
    if (cartItem) updateQuantity(sku, currentQuantity + 1);
  };
  
  const decreaseQuantity = () => {
    if (currentQuantity === 1) {
      removeItem(sku);
    } else if (currentQuantity > 1) {
      updateQuantity(sku, currentQuantity - 1);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fdfcfa]">
      <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* Back Navigation */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-[#6b7b72] hover:text-[#1c2e24] transition-colors mb-8 text-[14px] font-medium"
          style={{ fontFamily: 'Nunito Sans, sans-serif' }}
        >
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left Column: Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            {/* Main Large Image */}
            <div className="relative aspect-[4/3] bg-[#f5f0e6] rounded-2xl overflow-hidden flex items-center justify-center">
              <img
                src={gallery[mainImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Carousel Arrows */}
              <button
                onClick={() => setMainImageIndex(prev => (prev === 0 ? gallery.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-[#1c2e24] hover:bg-white shadow-sm transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMainImageIndex(prev => (prev === gallery.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-[#1c2e24] hover:bg-white shadow-sm transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImageIndex(idx)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${mainImageIndex === idx ? 'border-[#8cb73d]' : 'border-transparent hover:border-[#d1c8ba]'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>


          {/* Right Column: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col pt-2 relative"
          >
            {/* Added to Cart Popup */}
            <AnimatePresence>
              {isAdded && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-0 right-0 bg-white border border-[#8cb73d]/30 text-[#1c2e24] shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl p-4 flex items-center gap-4 z-50 min-w-[300px]"
                >
                  <div className="w-12 h-12 rounded bg-[#eaf4d5] flex items-center justify-center shrink-0 overflow-hidden">
                    <img src={gallery[mainImageIndex]} alt="cart item" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-[#1c2e24] flex items-center gap-1"><Check className="w-4 h-4 text-[#8cb73d]" /> Added to cart!</p>
                    <p className="text-xs text-[#6b7b72] truncate max-w-[150px]">{product.name}</p>
                  </div>
                  <button 
                    onClick={() => router.push('/cart')}
                    className="text-xs font-bold bg-[#e2b755] text-[#1c2e24] px-3 py-1.5 rounded-lg hover:bg-[#d4a844] transition-colors"
                  >
                    View Cart
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between items-start gap-4 mb-2">
              <h1 className="text-[28px] md:text-[34px] font-bold text-[#1c2e24] leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                {product.name}
              </h1>
              <div className="flex items-center gap-3 shrink-0 pt-2">
                <button className="text-[#e2b755] hover:text-[#d4a844] transition-colors">
                  <Heart className="w-5 h-5 fill-current" />
                </button>
                <button className="text-[#e2b755] hover:text-[#d4a844] transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= Math.floor(product.rating) ? 'fill-[#e2b755] text-[#e2b755]' : 'fill-transparent text-[#d1c8ba]'}`}
                  />
                ))}
              </div>
              <span className="text-[#6b7b72] text-[14px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                ({product.reviews} customer reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-[32px] font-bold text-[#1c2e24]" style={{ fontFamily: 'Playfair Display, serif' }}>
                ₹{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-gray-400 text-[18px] line-through decoration-gray-300">
                  ₹{product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.discount && (
                <span className="text-[#008c5a] font-bold text-[16px]">
                  {product.discount}% off
                </span>
              )}
            </div>

            <p className="text-[#6b7b72] text-[15px] leading-relaxed mb-8" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              {product.description}
            </p>

            <div className="flex flex-col gap-3 text-[14px] mb-10" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              <div className="flex gap-2">
                <span className="font-semibold text-[#1c2e24] w-24">Category:</span>
                <span className="text-[#6b7b72]">{product.category}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-[#1c2e24] w-24">Size:</span>
                <span className="text-[#6b7b72]">{product.weight}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-[#1c2e24] w-24">Plant Type:</span>
                <span className="text-[#6b7b72]">{product.type}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-[#1c2e24] w-24">SKU:</span>
                <span className="text-[#6b7b72]">HT-{product.id.toString().padStart(4, '0')}</span>
              </div>
            </div>

            <div className="flex gap-4 border-t border-[#e8e5de] pt-8 mb-10">
              {/* Action Buttons Column */}
              <div className="flex flex-row gap-4 w-full max-w-[480px]">
                
                {/* Dynamic Add to Cart / Quantity Selector */}
                {currentQuantity === 0 ? (
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#e2b755] text-[#1c2e24] hover:bg-[#d4a844] font-bold text-[16px] px-4 py-3.5 rounded-xl transition-colors shadow-sm whitespace-nowrap"
                    style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                  >
                    Add To Cart
                  </button>
                ) : (
                  <div className="flex-1 flex items-center justify-between bg-[#e2b755] text-[#1c2e24] rounded-xl px-2 py-2 shadow-sm">
                    <button 
                      onClick={decreaseQuantity} 
                      className="text-[#1c2e24] hover:bg-black/10 transition-colors w-10 h-10 flex items-center justify-center rounded-lg text-2xl font-medium"
                    >
                      -
                    </button>
                    <span className="font-bold text-[18px]">{currentQuantity}</span>
                    <button 
                      onClick={increaseQuantity} 
                      className="text-[#1c2e24] hover:bg-black/10 transition-colors w-10 h-10 flex items-center justify-center rounded-lg text-2xl font-medium"
                    >
                      +
                    </button>
                  </div>
                )}

                <button 
                  onClick={() => {
                    if (currentQuantity === 0) handleAddToCart();
                    router.push('/checkout');
                  }}
                  className="flex-1 bg-[#1c2e24] text-white hover:bg-[#2a4536] font-semibold tracking-wide text-[15px] px-4 py-3.5 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"
                  style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
