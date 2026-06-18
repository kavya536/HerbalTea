'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Share2, ChevronLeft, ChevronRight, ArrowLeft, Check, Leaf, Package, Coffee } from 'lucide-react';
import { useCartStore } from '../../../features/cart/cartStore';
import { useWishlistStore } from '../../../features/wishlist/wishlistStore';

const PRODUCTS = [
  { id: 1, name: "Premium Herbal Blend", price: 450.00, originalPrice: 500, discount: 10, img: "/shop/red_tea.png", rating: 4.5, reviews: 124, category: "Wellness Blends", type: "Herbal", weight: "15 Packets", benefit: "Relaxation", ingredient: "Mint", description: "A soothing blend of premium herbs designed to promote relaxation. Perfect for winding down after a long day." },
  { id: 2, name: "Calming Chamomile", price: 350.00, originalPrice: 400, discount: 12, img: "/shop/green_tea.png", rating: 4.0, reviews: 89, category: "Loose Leaf", type: "Decaf", weight: "10 Packets", benefit: "Relaxation", ingredient: "Chamomile", description: "Classic chamomile tea with a gentle, calming effect. Known for its sleep-promoting properties and mild flavor." },
  { id: 3, name: "Morning Matcha", price: 850.00, originalPrice: 1000, discount: 15, img: "/shop/blue.png", rating: 4.8, reviews: 342, category: "Matcha", type: "Caffeinated", weight: "30 Packets", benefit: "Energy", ingredient: "Matcha", description: "High-grade ceremonial matcha to give you a clean, sustained energy boost throughout your morning." },
  { id: 4, name: "Detox Green Wellness", price: 400.00, originalPrice: 500, discount: 20, img: "/shop/ruby_detox.png", rating: 4.1, reviews: 56, category: "Wellness Blends", type: "Caffeinated", weight: "15 Packets", benefit: "Digestion", ingredient: "Mint", description: "A refreshing green tea detox blend. Helps cleanse the body and support healthy digestion naturally." },
  { id: 5, name: "Sleepy Time Essence", price: 300.00, originalPrice: 350, discount: 14, img: "/shop/blue_tea1.png", rating: 4.7, reviews: 210, category: "Tea Bags", type: "Herbal", weight: "10 Packets", benefit: "Relaxation", ingredient: "Chamomile", description: "The ultimate bedtime companion. This herbal essence is specially crafted to help you drift off into a deep sleep." },
  { id: 6, name: "Energy Boost Root", price: 600.00, originalPrice: 750, discount: 20, img: "/shop/red_tea.png", rating: 4.3, reviews: 112, category: "Loose Leaf", type: "Caffeinated", weight: "20 Packets", benefit: "Energy", ingredient: "Ginger", description: "A powerful root-based blend to revitalize your senses and provide a strong natural energy boost." },
  { id: 7, name: "Immunity Shield", price: 550.00, originalPrice: 650, discount: 15, img: "/shop/green_tea.png", rating: 4.9, reviews: 420, category: "Wellness Blends", type: "Herbal", weight: "20 Packets", benefit: "Immunity", ingredient: "Ginger", description: "Strengthen your body's natural defenses with our Immunity Shield blend, rich in antioxidants and vitamins." },
  { id: 8, name: "Focus & Clarity", price: 750.00, originalPrice: 850, discount: 11, img: "/shop/ruby_detox.png", rating: 4.6, reviews: 175, category: "Matcha", type: "Caffeinated", weight: "30 Packets", benefit: "Energy", ingredient: "Matcha", description: "Enhance your concentration and mental clarity with this specialized matcha mix, perfect for deep work sessions." },
  { id: 9, name: "Digestive Soothe", price: 380.00, originalPrice: 420, discount: 9, img: "/shop/blue_tea1.png", rating: 4.2, reviews: 93, category: "Tea Bags", type: "Herbal", weight: "10 Packets", benefit: "Digestion", ingredient: "Ginger", description: "A gentle, soothing blend formulated to aid digestion and settle the stomach after meals." },
];

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem, items, updateQuantity, removeItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  // Review Form States
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState<{name?: string, email?: string, reason?: string, rating?: string}>({});
  const [isReviewSuccess, setIsReviewSuccess] = useState(false);

  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      name: "David Warnner",
      date: "January 7, 2024",
      rating: 5,
      text: "Nisl quam vestibulum ac quam nec odio elementu sucan ligula. Orci varius natoque penatibus et ma urient monte nascete ridiculus vestibulum ac quam necy sque.",
      avatar: "/home/testimonial1.jpg"
    },
    {
      id: 2,
      name: "Thomas Walkar",
      date: "March 7, 2024",
      rating: 5,
      text: "Nisl quam vestibulum ac quam nec odio elementu sucan ligula. Orci varius natoque penatibus et ma urient monte nascete ridiculus vestibulum ac quam necy sque.",
      avatar: "/home/testimonial2.jpg"
    }
  ]);

  const handlePostReview = () => {
    const newErrors: any = {};
    if (!name.trim()) {
      newErrors.name = "This field is required";
    }
    if (!email.trim()) {
      newErrors.email = "This field is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address (e.g., name@gmail.com)";
    }
    if (rating === 0) newErrors.rating = "Please select a rating";
    
    if (rating > 0 && rating <= 3 && !reason.trim()) {
      newErrors.reason = "This field is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const today = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      
      const newReview = {
        id: Date.now(),
        name: name,
        date: today,
        rating: rating,
        text: reason.trim() || "Excellent product! Highly recommended.",
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0F3D2E&color=fff`
      };

      setReviewsList([newReview, ...reviewsList]);
      
      setIsReviewSuccess(true);
      setTimeout(() => setIsReviewSuccess(false), 3000);

      setRating(0);
      setName('');
      setEmail('');
      setReason('');
      setErrors({});
    }
  };

  // Find product by ID from URL params
  // Find product by ID from URL params
  const productId = Number(params.id);
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

  let secondThumbnailImg = '/shop/red_1.png';
  if (product.name === 'Calming Chamomile' || product.name === 'Immunity Shield') {
    secondThumbnailImg = '/shop/green_bg.png';
  } else if (product.name === 'Detox Green Wellness') {
    secondThumbnailImg = '/shop/blue_bg.png';
  } else if (product.name === 'Sleepy Time Essence' || product.name === 'Digestive Soothe') {
    secondThumbnailImg = '/shop/blue_bg1.png';
  }

  const variants = [
    {
      img: product.img,
      weight: product.weight,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount
    },
    {
      img: secondThumbnailImg,
      weight: product.weight,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount
    },
    {
      img: '/shop/ruby_detox.png',
      weight: '30 Packets',
      price: product.price + 200,
      originalPrice: product.originalPrice ? product.originalPrice + 240 : null,
      discount: product.discount
    },
    {
      img: '/shop/green_tea.png',
      weight: '50 Packets',
      price: product.price + 350,
      originalPrice: product.originalPrice ? product.originalPrice + 400 : null,
      discount: product.discount
    }
  ];

  const currentVariant = variants[mainImageIndex];
  const sku = `sku-${product.id}-${mainImageIndex}`;
  const cartItem = items.find(i => i.sku === sku);
  const currentQuantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    if (!cartItem) {
      addItem({
        sku,
        name: `${product.name} (${currentVariant.weight})`,
        priceCents: currentVariant.price * 100,
        image: currentVariant.img
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
    } else if (cartItem) {
      updateQuantity(sku, currentQuantity - 1);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f5f0e6]">
      <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Simple Text Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-[#1c2e24] text-[32px] md:text-[50px] font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
            Shop Details
          </h1>
          <p className="text-[#6b7b72] text-sm md:text-xs mt-2 uppercase tracking-[0.2em] font-medium" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            HOME <span className="text-[#ffc107] mx-1">|</span> SHOP DETAILS
          </p>
        </div>

        {/* Back Navigation */}
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full border border-[#d1c8ba] flex items-center justify-center text-[#1c2e24] hover:bg-[#e8e5de] transition-colors mb-8"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left Column: Image Gallery */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            {/* Main Large Image */}
            <div className="relative aspect-[4/5] md:aspect-square bg-[#f9f9f9] rounded-2xl border border-[#fdbb0a] p-8 flex items-center justify-center overflow-hidden">
              <img
                src={currentVariant.img}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {variants.map((variant, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImageIndex(idx)}
                  className={`relative w-24 h-24 rounded-xl overflow-hidden border bg-[#f9f9f9] transition-all shrink-0 p-2 flex items-center justify-center ${mainImageIndex === idx ? 'border-[#fdbb0a]' : 'border-[#e8e5de] hover:border-[#d1c8ba]'}`}
                >
                  <img src={variant.img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
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
                    <img src={currentVariant.img} alt="cart item" className="w-full h-full object-contain p-1" />
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

            {/* Title and Short Description */}
            <div className="mb-4 relative">
              <div className="flex justify-between items-start gap-4">
                <h1 className="text-[36px] md:text-[46px] font-bold text-[#1c2e24] leading-tight mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 shrink-0 pt-3">
                  <button onClick={() => toggleItem(product.id)} className="text-[#e2b755] hover:text-[#d4a844] transition-colors">
                    <Heart className={`w-6 h-6 ${isInWishlist(product.id) ? 'fill-current' : 'fill-transparent'}`} strokeWidth={1.5} />
                  </button>
                  <button className="text-[#e2b755] hover:text-[#d4a844] transition-colors">
                    <Share2 className="w-6 h-6" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
              <p className="text-[#6b7b72] text-[16px] leading-[1.6] max-w-[90%]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                A premium {product.category.toLowerCase()} blend to support {product.benefit.toLowerCase()} and rejuvenate your body.
              </p>
            </div>

            {/* Rating */}
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

            {/* Price Block */}
            <div className="flex items-baseline gap-4 mb-8" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              <span className="text-[28px] md:text-[32px] text-[#1c2e24] leading-none font-medium">
                ₹{currentVariant.price}
              </span>
              {currentVariant.originalPrice && (
                <span className="text-[#a0aab2] text-[18px] line-through decoration-[#c8d1cc] font-light">
                  ₹{currentVariant.originalPrice}
                </span>
              )}
              {currentVariant.discount && (
                <span className="text-[#8cb73d] text-[16px] font-medium tracking-wide">
                  {currentVariant.discount}% off
                </span>
              )}
            </div>

            {/* Tags / Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 border border-[#e8e5de] rounded-lg px-4 py-2 bg-transparent">
                <Package className="w-4 h-4 text-[#6b7b72]" />
                <span className="text-[#1c2e24] text-[13px] font-semibold" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{currentVariant.weight}</span>
              </div>
              <div className="flex items-center gap-2 border border-[#e8e5de] rounded-lg px-4 py-2 bg-transparent">
                <Leaf className="w-4 h-4 text-[#6b7b72]" />
                <span className="text-[#1c2e24] text-[13px] font-semibold" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{product.type === 'Decaf' || product.type === 'Herbal' ? 'Caffeine Free' : 'Caffeinated'}</span>
              </div>
              <div className="flex items-center gap-2 border border-[#e8e5de] rounded-lg px-4 py-2 bg-transparent">
                <Coffee className="w-4 h-4 text-[#6b7b72]" />
                <span className="text-[#1c2e24] text-[13px] font-semibold" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>No Preservatives</span>
              </div>
            </div>


            <div className="flex gap-4 border-t border-[#e8e5de] pt-8 mb-10">
              {/* Action Buttons Column */}
              <div className="flex flex-row gap-4 w-full max-w-[480px]">
                
                {/* Dynamic Add to Cart / Quantity Selector */}
                {currentQuantity === 0 ? (
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#fdbb0a] text-[#1c2e24] hover:bg-[#e5a600] font-bold text-[16px] px-4 py-3.5 rounded-xl transition-colors shadow-sm whitespace-nowrap"
                    style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                  >
                    Add To Cart
                  </button>
                ) : (
                  <div className="flex-1 flex items-center justify-between bg-[#fdbb0a] text-[#1c2e24] rounded-xl px-2 py-2 shadow-sm">
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

        {/* --- Product Details Tabs Section --- */}
        <div className="w-full mt-16 border-t border-[#e8e5de] pt-12">
          
          {/* Benefits & Ingredients Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            
            {/* Left: Product Benefits */}
            <div>
              <h3 className="font-bold text-[#1c2e24] text-[20px] md:text-[24px] uppercase tracking-wide mb-6 text-center lg:text-left" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Product Benefits</h3>
              <div className="flex flex-col gap-8 mt-4">
                
                {/* Benefit 1 */}
                <div className="flex flex-col">
                  <h4 className="font-bold text-[#1c2e24] text-[18px] mb-2 flex items-center gap-3" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#1c2e24]"></span>
                    Calmness
                  </h4>
                  <p className="text-[15px] text-[#4a554e] leading-relaxed pl-5">
                    Promotes deep relaxation, reduces stress, and aids sleep with our carefully selected herbal blend.
                  </p>
                </div>

                {/* Benefit 2 */}
                <div className="flex flex-col">
                  <h4 className="font-bold text-[#1c2e24] text-[18px] mb-2 flex items-center gap-3" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#1c2e24]"></span>
                    Digestion
                  </h4>
                  <p className="text-[15px] text-[#4a554e] leading-relaxed pl-5">
                    Aids digestive comfort, reduces bloating, and supports overall gut health naturally.
                  </p>
                </div>

                {/* Benefit 3 */}
                <div className="flex flex-col">
                  <h4 className="font-bold text-[#1c2e24] text-[18px] mb-2 flex items-center gap-3" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#1c2e24]"></span>
                    Hormonal Support
                  </h4>
                  <p className="text-[15px] text-[#4a554e] leading-relaxed pl-5">
                    Supports hormonal balance and well-being through natural, potent plant extracts.
                  </p>
                </div>

              </div>
            </div>

            {/* Right: Ingredients Breakdown */}
            <div>
              <h3 className="font-bold text-[#1c2e24] text-[20px] md:text-[24px] uppercase tracking-wide mb-6 text-center lg:text-left" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Ingredients Breakdown</h3>
              <div className="grid grid-cols-2 gap-4">
                
                {/* Ingredient 1 */}
                <div className="rounded-xl overflow-hidden border border-[#dce4e0] flex flex-col shadow-sm bg-[#f4f7f5]">
                  <div className="w-full h-24 bg-[#e8ecea] relative overflow-hidden">
                    <div className="absolute top-0 left-0 bg-[#1c2e24] text-white text-[12px] font-bold px-2 py-0.5 rounded-br-lg z-10">1</div>
                    <img src="/shop/beetroot.png" alt="Beetroot" className="w-full h-full object-cover object-bottom scale-110" />
                  </div>
                  <div className="py-2 px-1 text-center">
                    <span className="font-bold text-[#1c2e24] text-[14px]">Beetroot</span>
                  </div>
                </div>

                {/* Ingredient 2 */}
                <div className="rounded-xl overflow-hidden border border-[#dce4e0] flex flex-col shadow-sm bg-[#f4f7f5]">
                  <div className="w-full h-24 bg-[#e8ecea] relative">
                    <div className="absolute top-0 left-0 bg-[#1c2e24] text-white text-[12px] font-bold px-2 py-0.5 rounded-br-lg z-10">2</div>
                    <img src="/shop/petals.png" alt="Hibiscus" className="w-full h-full object-cover" />
                  </div>
                  <div className="py-2 px-1 text-center">
                    <span className="font-bold text-[#1c2e24] text-[14px]">Hibiscus</span>
                  </div>
                </div>

                {/* Ingredient 3 */}
                <div className="rounded-xl overflow-hidden border border-[#dce4e0] flex flex-col shadow-sm bg-[#f4f7f5]">
                  <div className="w-full h-24 bg-[#e8ecea] relative">
                    <div className="absolute top-0 left-0 bg-[#1c2e24] text-white text-[12px] font-bold px-2 py-0.5 rounded-br-lg z-10">3</div>
                    <img src="/shop/mulethi_1.png" alt="Mulethi" className="w-full h-full object-cover" />
                  </div>
                  <div className="py-2 px-1 text-center">
                    <span className="font-bold text-[#1c2e24] text-[14px]">Mulethi</span>
                  </div>
                </div>

                {/* Ingredient 4 */}
                <div className="rounded-xl overflow-hidden border border-[#dce4e0] flex flex-col shadow-sm bg-[#f4f7f5]">
                  <div className="w-full h-24 bg-[#e8ecea] relative">
                    <div className="absolute top-0 left-0 bg-[#1c2e24] text-white text-[12px] font-bold px-2 py-0.5 rounded-br-lg z-10">4</div>
                    <img src="/shop/moringa.png" alt="Moringa" className="w-full h-full object-cover" />
                  </div>
                  <div className="py-2 px-1 text-center">
                    <span className="font-bold text-[#1c2e24] text-[14px]">Moringa</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* How To Use */}
          <div className="mb-16 mt-8">
            <h3 className="font-bold text-[#1c2e24] text-[20px] md:text-[24px] uppercase tracking-wide mb-8 text-center" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>HOW TO USE</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Step 1 */}
              <div className="relative bg-[#fffbfc] rounded-2xl border border-[#f0e6e6] shadow-sm flex flex-col items-center pt-6 overflow-hidden">
                <div className="absolute top-0 left-0 bg-[#1c2e24] text-white font-bold text-[16px] w-8 h-8 flex items-center justify-center rounded-br-lg rounded-tl-2xl z-10">
                  1
                </div>
                <h4 className="font-bold text-[#1c2e24] text-[18px] mb-2 z-10" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Open Sachet</h4>
                <div className="w-full h-64 flex items-center justify-center mt-2 overflow-hidden rounded-b-2xl">
                  <img src="/shop/open.png" alt="Open Sachet" className="w-full h-full object-cover object-[50%_35%] scale-[1.1]" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative bg-[#fffbfc] rounded-2xl border border-[#f0e6e6] shadow-sm flex flex-col items-center pt-6 overflow-hidden">
                <div className="absolute top-0 left-0 bg-[#1c2e24] text-white font-bold text-[16px] w-8 h-8 flex items-center justify-center rounded-br-lg rounded-tl-2xl z-10">
                  2
                </div>
                <h4 className="font-bold text-[#1c2e24] text-[18px] mb-2 z-10" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Pour Hot Water</h4>
                <div className="w-full h-64 flex items-center justify-center mt-2 overflow-hidden rounded-b-2xl">
                  <img src="/shop/pour_hot_water.png" alt="Pour Hot Water" className="w-full h-full object-cover object-[50%_20%] scale-[1.2]" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative bg-[#fffbfc] rounded-2xl border border-[#f0e6e6] shadow-sm flex flex-col items-center pt-6 overflow-hidden">
                <div className="absolute top-0 left-0 bg-[#1c2e24] text-white font-bold text-[16px] w-8 h-8 flex items-center justify-center rounded-br-lg rounded-tl-2xl z-10">
                  3
                </div>
                <h4 className="font-bold text-[#1c2e24] text-[18px] mb-2 z-10" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Steep 3-4 Minutes</h4>
                <div className="w-full h-64 flex items-center justify-center mt-2 overflow-hidden rounded-b-2xl">
                  <img src="/shop/timer.png" alt="Steep 3-4 Minutes" className="w-full h-full object-cover object-center" />
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative bg-[#fffbfc] rounded-2xl border border-[#f0e6e6] shadow-sm flex flex-col items-center pt-6 overflow-hidden">
                <div className="absolute top-0 left-0 bg-[#1c2e24] text-white font-bold text-[16px] w-8 h-8 flex items-center justify-center rounded-br-lg rounded-tl-2xl z-10">
                  4
                </div>
                <h4 className="font-bold text-[#1c2e24] text-[18px] mb-2 z-10" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Enjoy</h4>
                <div className="w-full h-64 flex items-center justify-center mt-2 overflow-hidden rounded-b-2xl">
                  <img src="/shop/girl_enjy.png" alt="Enjoy" className="w-full h-full object-cover object-[50%_20%]" />
                </div>
              </div>

            </div>
          </div>

          {/* Reviews */}
          <div className="mb-12">
            <h3 className="font-bold text-[#1c2e24] text-[20px] md:text-[24px] uppercase tracking-wide mb-8" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Customer Reviews</h3>
            <style>{`
              @keyframes scroll-marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .marquee-track {
                display: flex;
                width: max-content;
                animation: scroll-marquee 40s linear infinite;
              }
              .marquee-track:hover {
                animation-play-state: paused;
              }
            `}</style>
            <div className="overflow-hidden w-full relative">
              <div className="marquee-track gap-6 pb-4">
                {[...reviewsList, ...reviewsList, ...reviewsList, ...reviewsList].map((review, idx) => (
                  <div key={`${review.id}-${idx}`} className="flex flex-col gap-4 border border-[#e8e5de] p-6 rounded-[20px] bg-white shadow-sm hover:shadow-md transition-shadow w-[400px] shrink-0">
                     <div className="flex items-center justify-between w-full">
                       <div className="flex items-center gap-4">
                         <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-[#f0e6e6]" onError={(e) => { e.currentTarget.src = 'https://i.pravatar.cc/150?u=a042581f4e29026704d'; }} />
                         <div className="flex flex-col">
                           <h4 className="font-bold text-[#1c2e24] text-[15px]">{review.name}</h4>
                           <span className="text-[10px] text-[#6b7b72] uppercase font-bold tracking-wider mt-0.5">{review.date}</span>
                         </div>
                       </div>
                       <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(s=>(
                            <Star key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? 'fill-[#e2b755] text-[#e2b755]' : 'text-gray-300'}`}/>
                          ))}
                       </div>
                     </div>
                     <p className="text-[14px] text-[#4a554e] leading-relaxed italic">"{review.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Add Review Form */}
          <div className="bg-[#f5f5f5] p-8 md:p-10 rounded-[30px] border border-[#e8e5de] mb-16">
             <div className="flex justify-between items-start mb-6">
               <div>
                 <h2 className="text-[24px] font-bold text-[#1c2e24] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Add Reviews</h2>
                 <p className="text-[13px] text-[#6b7b72]">Your email address will not be published. Required fields are marked *</p>
               </div>
               <div className="flex flex-col items-end">
                 <span className="text-[12px] font-bold text-[#1c2e24] mb-1">Select Rating:</span>
                 <div className="flex items-center gap-3">
                   {errors.rating && <span className="text-red-500 text-[12px] font-medium">{errors.rating}</span>}
                   <div className="flex gap-1">
                      {[1,2,3,4,5].map(s=>(
                        <Star 
                          key={s} 
                          onClick={() => { setRating(s); if(errors.rating) setErrors({...errors, rating: undefined}) }}
                          className={`w-5 h-5 cursor-pointer transition-colors ${rating >= s ? 'fill-[#1c2e24] text-[#1c2e24]' : 'text-[#1c2e24] hover:fill-[#1c2e24] opacity-50 hover:opacity-100'}`}
                        />
                      ))}
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <input type="text" placeholder="Full Name" value={name} onChange={(e) => {const val = e.target.value.replace(/[^a-zA-Z\s]/g, ''); setName(val); if(errors.name) setErrors({...errors, name: undefined})}} className={`p-4 rounded-xl border ${errors.name ? 'border-red-500' : 'border-[#e8e5de]'} bg-white focus:outline-none focus:border-[#e2b755] text-[14px]`} />
                  {errors.name && <span className="text-red-500 text-[12px] mt-1 ml-2">{errors.name}</span>}
                </div>
                <div className="flex flex-col">
                  <input type="email" placeholder="Email Address" value={email} onChange={(e) => {setEmail(e.target.value); if(errors.email) setErrors({...errors, email: undefined})}} className={`p-4 rounded-xl border ${errors.email ? 'border-red-500' : 'border-[#e8e5de]'} bg-white focus:outline-none focus:border-[#e2b755] text-[14px]`} />
                  {errors.email && <span className="text-red-500 text-[12px] mt-1 ml-2">{errors.email}</span>}
                </div>
             </div>
             <div className="flex flex-col mb-6">
               <textarea placeholder="Your Review (Optional for 4-5 stars, Required for 1-3 stars)" value={reason} onChange={(e) => {setReason(e.target.value); if(errors.reason) setErrors({...errors, reason: undefined})}} className={`w-full p-4 rounded-xl border ${errors.reason ? 'border-red-500' : 'border-[#e8e5de]'} bg-white h-32 focus:outline-none focus:border-[#e2b755] text-[14px] resize-none`} />
               {errors.reason && <span className="text-red-500 text-[12px] mt-1 ml-2">{errors.reason}</span>}
             </div>
             <div className="flex items-center gap-4">
               <button onClick={handlePostReview} className="bg-[#0F3D2E] text-white hover:bg-[#1a5240] transition-colors px-8 py-3.5 rounded-[14px] font-bold text-[15px] shadow-sm">
                 Post Review
               </button>
               {isReviewSuccess && <span className="text-[#0F3D2E] text-[14px] font-bold">Review posted successfully!</span>}
             </div>
          </div>

        </div>

        {/* Similar Products Section */}
        <div className="mt-8">
          <div className="mb-10">
            <h2 className="text-[24px] md:text-[30px] font-bold text-[#1c2e24]" style={{ fontFamily: 'Playfair Display, serif' }}>Similar Products</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map((similar, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={similar.id} 
                onClick={() => router.push(`/shop/${similar.id}`)}
                className="flex flex-col group cursor-pointer bg-white rounded-[20px] border border-[#e8e5de] overflow-hidden shadow-[0_4px_20px_-6px_rgba(0,0,0,0.05)] transition-all duration-300 aspect-[3/4]"
              >
                {/* Product Image 70% */}
                <div className="relative h-[70%] w-full bg-[#f9f8f6] overflow-hidden p-6 flex items-center justify-center">
                  <img 
                    src={similar.img} 
                    alt={similar.name} 
                    className={`w-full h-full object-contain transition-transform duration-700 ease-in-out ${similar.img.endsWith('/blue.png') ? 'scale-[1.7] translate-y-1' : ''}`} 
                  />
                </div>
                
                {/* Product Details 30% */}
                <div className="flex flex-col justify-between h-[30%] p-4">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-semibold text-[#1c2e24] text-[18px] line-clamp-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {similar.name}
                    </h4>
                    {/* Rating Badge & Reviews */}
                    <div className="flex flex-col items-end gap-1 shrink-0 mt-0.5">
                      <div className="bg-[#e2b755] text-white text-[11px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-sm">
                        {similar.rating?.toFixed(1) || "4.5"} <Star className="w-2.5 h-2.5 fill-white text-white" />
                      </div>
                      <span className="text-[#6b7b72] text-[10px] font-medium whitespace-nowrap">
                        {similar.reviews || "124"} reviews
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-baseline gap-2 mt-auto">
                    <span className="font-bold text-[#1c2e24] text-[18px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                      ₹{similar.price}
                    </span>
                    {similar.originalPrice && (
                      <span className="text-gray-400 text-[13px] line-through decoration-gray-300">
                        ₹{similar.originalPrice}
                      </span>
                    )}
                    {similar.discount && (
                      <span className="text-[#8cb73d] font-bold text-[12px] ml-1">
                        {similar.discount}% off
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
