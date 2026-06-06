'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../../features/cart/cartStore';
import { ArrowLeft, Minus, Plus, X } from 'lucide-react';

// Temporary mock data to map cart items to full product details
const PRODUCTS = [
  { id: 1, name: "Premium Herbal Blend", price: 450.00, originalPrice: 500, discount: 10, img: "/home/img1.jpg", rating: 4.5, reviews: 124, category: "Wellness Blends", type: "Herbal", weight: "100g", soldBy: "VIRENDRA KUMAR GUPTA" },
  { id: 2, name: "Calming Chamomile", price: 350.00, originalPrice: 400, discount: 12, img: "/home/img2.jpg", rating: 4.0, reviews: 89, category: "Loose Leaf", type: "Decaf", weight: "50g", soldBy: "ANAJ WALA ORGANICS" },
  { id: 3, name: "Morning Matcha", price: 850.00, originalPrice: 1000, discount: 15, img: "/home/img3.jpg", rating: 4.8, reviews: 342, category: "Matcha", type: "Caffeinated", weight: "250g", soldBy: "Shyam Enterprises" },
  { id: 4, name: "Detox Green Wellness", price: 400.00, originalPrice: 500, discount: 20, img: "/home/img4.jpg", rating: 4.1, reviews: 56, category: "Wellness Blends", type: "Caffeinated", weight: "100g", soldBy: "CHAMUNDA FASHION.." },
  { id: 5, name: "Sleepy Time Essence", price: 300.00, originalPrice: 350, discount: 14, img: "/home/img5.jpg", rating: 4.7, reviews: 210, category: "Tea Bags", type: "Herbal", weight: "50g", soldBy: "Dreamy Teas" },
  { id: 6, name: "Energy Boost Root", price: 600.00, originalPrice: 750, discount: 20, img: "/home/img6.jpg", rating: 4.3, reviews: 112, category: "Loose Leaf", type: "Caffeinated", weight: "250g", soldBy: "Root Energy" },
  { id: 7, name: "Immunity Shield", price: 550.00, originalPrice: 650, discount: 15, img: "/home/img7.jpg", rating: 4.9, reviews: 420, category: "Wellness Blends", type: "Herbal", weight: "100g", soldBy: "Shield Organics" },
  { id: 8, name: "Focus & Clarity", price: 750.00, originalPrice: 850, discount: 11, img: "/home/img8.jpg", rating: 4.6, reviews: 175, category: "Matcha", type: "Caffeinated", weight: "100g", soldBy: "Focus Teas" },
  { id: 9, name: "Digestive Soothe", price: 380.00, originalPrice: 420, discount: 9, img: "/home/herbal.jpg", rating: 4.2, reviews: 93, category: "Tea Bags", type: "Herbal", weight: "50g", soldBy: "Soothe Naturals" },
];

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#f9f9f9]"></div>;

  // Enrich cart items with product details
  const enrichedItems = items.map(cartItem => {
    const productId = parseInt(cartItem.sku.replace('sku-', ''), 10);
    const product = PRODUCTS.find(p => p.id === productId);
    return {
      ...cartItem,
      product: product || {
        img: "/home/img1.jpg",
        originalPrice: (cartItem.priceCents / 100) * 1.2,
        discount: 20,
        weight: "100g",
        soldBy: "Herbal Tea Inc."
      }
    };
  });

  const totalProductPrice = enrichedItems.reduce((total, item) => total + (item.product.originalPrice * item.quantity), 0);
  const totalDiscount = enrichedItems.reduce((total, item) => total + ((item.product.originalPrice - (item.priceCents / 100)) * item.quantity), 0);
  const orderTotal = totalProductPrice - totalDiscount;
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-8 font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-[#6b7b72] hover:text-[#1c2e24] transition-colors mb-6 text-[14px] font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </button>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-[#333] mb-4">Your Cart is Empty</h2>
            <p className="text-[#666] mb-6">Looks like you haven't added anything to your cart yet.</p>
            <button 
              onClick={() => router.push('/shop')}
              className="bg-[#9c27b0] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#7b1fa2] transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column: Product Details */}
            <div className="flex-1">
              <h2 className="text-[18px] font-semibold text-[#333] mb-4">Product Details</h2>
              
              <div className="space-y-3">
                {enrichedItems.map((item) => (
                  <div key={item.sku} className="bg-white border border-[#e5e7eb] rounded overflow-hidden shadow-sm">
                    <div className="p-4">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-[72px] h-[72px] border border-[#e5e7eb] rounded flex items-center justify-center overflow-hidden shrink-0">
                          <img src={item.product.img} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        
                        {/* Product Info */}
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between items-start">
                            <h3 className="text-[15px] text-[#333] font-medium pr-4">{item.name}</h3>
                            <button className="text-[#8c317f] text-[13px] font-bold tracking-wide">EDIT</button>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[16px] font-bold text-[#333]">₹{(item.priceCents / 100).toFixed(0)}</span>
                            <span className="text-[13px] text-[#878787] line-through">₹{item.product.originalPrice.toFixed(0)}</span>
                            <span className="text-[12px] font-bold text-[#03a685]">{item.product.discount}% Off</span>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-1.5 text-[13px] text-[#555]">
                            <span>Size: {item.product.weight}</span>
                            <span className="w-[3px] h-[3px] rounded-full bg-[#878787]"></span>
                            
                            <div className="flex items-center">
                              <span>Qty:</span>
                              <div className="flex items-center ml-1 font-medium">
                                {item.quantity}
                              </div>
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => {
                              if (item.quantity <= 1) {
                                removeItem(item.sku);
                              } else {
                                updateQuantity(item.sku, item.quantity - 1);
                              }
                            }}
                            className="flex items-center gap-1 mt-3 text-[13px] font-medium text-[#555] hover:text-[#333] transition-colors self-start"
                          >
                            <X className="w-[14px] h-[14px]" /> REMOVE
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Sold By */}
                    <div className="border-t border-[#f0f0f0] bg-[#fafafa] px-4 py-2.5">
                      <p className="text-[13px] text-[#555]">Sold by: {item.product.soldBy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Price Details */}
            <div className="w-full lg:w-[320px]">
              <div className="sticky top-24">
                <h2 className="text-[16px] font-bold text-[#333] mb-4 border-b border-[#f0f0f0] pb-2">Price Details ({totalItems} Items)</h2>
                
                <div className="bg-white border border-[#e5e7eb] rounded p-4 shadow-sm">
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-[14px] text-[#555]">
                      <span>Product Price</span>
                      <span>+ ₹{totalProductPrice.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between text-[14px] text-[#03a685]">
                      <span>Total Discounts</span>
                      <span>- ₹{totalDiscount.toFixed(0)}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-dashed border-[#d5d5d5] pt-4 mb-4">
                    <div className="flex justify-between text-[16px] font-bold text-[#333]">
                      <span>Order Total</span>
                      <span>₹{orderTotal.toFixed(0)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-[#eaf5f0] text-[#03a685] text-[12px] font-bold py-2.5 px-3 rounded mb-4 flex items-center gap-2">
                    <div className="w-[14px] h-[14px] rounded-full bg-[#03a685] text-white flex items-center justify-center text-[10px] leading-none shrink-0">
                      %
                    </div>
                    Yay! Your total discount is ₹{totalDiscount.toFixed(0)}
                  </div>
                  
                  <div className="text-center relative">
                    <div className="bg-[#f0f4f9] text-[#555] text-[11px] py-2 px-3 rounded mb-1 text-center font-medium">
                      Clicking on 'Continue' will not deduct any money
                    </div>
                    <button 
                      onClick={() => router.push('/checkout')}
                      className="w-full bg-[#9c27b0] text-white font-bold text-[16px] py-3 rounded hover:bg-[#7b1fa2] transition-colors"
                    >
                      Continue
                    </button>
                  </div>

                  <div className="mt-4 flex items-start gap-3 bg-[#fdfdfd] p-3 rounded border border-[#f0f0f0]">
                    <div className="w-8 h-8 rounded-full bg-[#e8f0fe] flex items-center justify-center shrink-0">
                      <span className="text-[#1967d2] font-bold text-[14px]">S</span>
                    </div>
                    <div className="text-[11px] text-[#555] leading-snug">
                      <span className="font-bold text-[#333] block mb-0.5 text-[12px]">Your Safety, Our Priority</span>
                      We make sure that your package is safe at every point of contact.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
