'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';

const ARTICLES = [
  {
    id: 1,
    category: "WELLNESS",
    title: "5 Herbal Teas That Support Better Sleep Naturally",
    description: "Discover how chamomile, lavender, and other botanicals can transform your nighttime routine into a calming ritual.",
    date: "May 28, 2026",
    img: "/home/img1.jpg",
    content: "Getting a good night's sleep is essential for overall health and well-being. For centuries, herbal teas have been used as a natural remedy to promote relaxation and improve sleep quality. In this article, we explore five powerful herbal teas that can help you drift off peacefully.\n\n1. Chamomile Tea\nChamomile is perhaps the most famous sleep-inducing tea. It contains apigenin, an antioxidant that binds to certain receptors in your brain that may promote sleepiness and reduce insomnia.\n\n2. Lavender Tea\nKnown for its soothing fragrance, lavender tea works wonders for calming the nerves. Drinking a cup before bed can help decrease heart rate and blood pressure, putting you in a relaxed state.\n\n3. Valerian Root Tea\nValerian root is a potent herb often referred to as 'nature's Valium.' It increases levels of a neurotransmitter called GABA, which helps calm nerve activity and ease anxiety.\n\n4. Passionflower Tea\nTraditionally used to treat anxiety and sleep disorders, passionflower tea can improve sleep quality by reducing brain activity, making it easier to fall asleep and stay asleep.\n\n5. Lemon Balm Tea\nA member of the mint family, lemon balm has a mild lemon scent and flavor. It has been shown to reduce stress and anxiety, acting as a mild sedative when consumed before bedtime.\n\nCreating a bedtime ritual that includes a warm cup of herbal tea can signal to your body that it's time to wind down. Choose your favorite blend, steep it slowly, and enjoy a restful night."
  },
  {
    id: 2,
    category: "INGREDIENTS",
    title: "The Ancient Power of Turmeric in Modern Herbal Blends",
    description: "From Ayurvedic traditions to your morning cup — learn why turmeric remains one of the most valued healing spices.",
    date: "May 20, 2026",
    img: "/home/img4.jpg",
    content: "Turmeric, with its vibrant golden hue and distinct earthy flavor, is more than just a culinary spice. It has been a cornerstone of Ayurvedic and traditional medicine for thousands of years. Today, it remains one of the most highly valued ingredients in modern herbal blends.\n\nThe secret to turmeric's healing power lies in curcumin, its main active compound. Curcumin is a potent antioxidant and anti-inflammatory agent. However, it is notoriously poorly absorbed by the body. To maximize its benefits, turmeric is often blended with black pepper, which contains piperine—a natural substance that enhances curcumin absorption by up to 2,000%.\n\nIncorporating turmeric into your daily routine can support joint health, boost immune function, and improve digestion. Whether you prefer a classic 'Golden Milk' latte or a spiced herbal tea blend, turmeric offers a warm, comforting way to nurture your body from the inside out."
  },
  {
    id: 3,
    category: "LIFESTYLE",
    title: "Building a Daily Herbal Wellness Ritual in 10 Minutes",
    description: "Simple, actionable steps to incorporate herbal tea powders into your morning and evening routines for lasting health.",
    date: "May 12, 2026",
    img: "/home/img6.jpg",
    content: "In our fast-paced world, finding time for self-care can feel overwhelming. However, building a meaningful wellness ritual doesn't require hours of your day. With just 10 minutes, you can create a grounding practice using herbal tea powders that supports both your physical and mental health.\n\nStep 1: Choose Your Intention (2 minutes)\nStart by identifying what your body and mind need. Do you need an energy boost in the morning? A moment of calm in the afternoon? Or deep relaxation before bed? Select a herbal tea powder that aligns with your intention.\n\nStep 2: Mindful Preparation (3 minutes)\nThe act of making tea can be a meditation in itself. Boil the water, measure the powder, and whisk it gently. Pay attention to the sounds, the aromas, and the colors. This mindful preparation brings you into the present moment.\n\nStep 3: Savor the Moment (5 minutes)\nFind a quiet spot to sit. Hold the warm cup in your hands and take a few deep breaths before your first sip. Focus solely on the taste and the warmth spreading through your body. Disconnect from screens and distractions.\n\nBy dedicating just 10 minutes a day to this simple herbal ritual, you can cultivate a lasting sense of wellness, balance, and peace."
  }
];

export default function BlogPostPage() {
  const params = useParams();
  const articleId = Number(params?.id);
  const article = ARTICLES.find(a => a.id === articleId);

  const handleShare = (platform: 'facebook' | 'linkedin') => {
    if (typeof window === 'undefined') return;
    const url = encodeURIComponent(window.location.href);
    let shareUrl = '';
    if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    }
    const width = 600;
    const height = 400;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    window.open(
      shareUrl,
      'share-dialog',
      `width=${width},height=${height},left=${left},top=${top},toolbar=0,status=0,menubar=0`
    );
  };

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-[#f5f0e6]">
        <h1 className="text-[28px] font-bold text-[#1c2e24] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Article Not Found</h1>
        <Link href="/blog" className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-[#8cb73d] hover:text-[#2c4a35] transition-colors">
          <ArrowLeft className="h-4 w-4 stroke-[2]" /> Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f5f0e6] pt-12 md:pt-20 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full" style={{ zoom: 0.9 }}>
        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.15em] text-[#6b7b72] hover:text-[#2c4a35] transition-all duration-300 mb-12 md:mb-16 hover:-translate-x-1"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <ArrowLeft className="h-4 w-4 stroke-[2]" /> Back to Journal
          </Link>
        </motion.div>

        {/* Editorial Header */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#2c4a35] bg-[#e8f2e1] px-4 py-2 rounded-full">
              {article.category}
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[36px] sm:text-[48px] md:text-[56px] font-semibold text-[#1c2e24] leading-[1.15] mb-8 tracking-tight" 
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {article.title}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-3 text-[13px] text-[#6b7b72] font-medium tracking-wide uppercase"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <span>{article.date}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2b755]"></span>
            <span>5 Min Read</span>
          </motion.div>
        </div>

        {/* Wide Featured Image */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full aspect-[16/10] md:aspect-[2.5/1] rounded-[32px] overflow-hidden mb-16 md:mb-24 shadow-[0_20px_60px_-15px_rgba(44,74,53,0.15)] relative group"
        >
          <img 
            src={article.img} 
            alt={article.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </motion.div>

        {/* Article Body */}
        <div className="max-w-2xl mx-auto">
          {/* Excerpt */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-[20px] md:text-[24px] text-[#1c2e24] leading-[1.6] font-medium mb-12 md:mb-16 italic border-l-4 border-[#e2b755] pl-6 md:pl-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
              "{article.description}"
            </p>
          </motion.div>
          
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-[#4a5e51]" 
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {article.content.split('\n\n').map((paragraph, idx) => {
              // Highlight subheadings
              if (paragraph.match(/^\d\./) || paragraph.startsWith('Step ')) {
                const [title, ...rest] = paragraph.split('\n');
                return (
                  <div key={idx} className="mb-10 mt-16">
                    <h3 className="text-[20px] md:text-[24px] font-semibold text-[#1c2e24] mb-4 flex items-center gap-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      <span className="w-8 h-[2px] bg-[#8cb73d] inline-block rounded-full"></span>
                      {title}
                    </h3>
                    {rest.length > 0 && (
                      <p className="text-[16px] md:text-[18px] leading-[1.9] text-[#6b7b72]">{rest.join(' ')}</p>
                    )}
                  </div>
                );
              }
              // Regular paragraphs
              return (
                <p key={idx} className="text-[16px] md:text-[18px] leading-[1.9] mb-8">
                  {paragraph}
                </p>
              );
            })}
          </motion.div>
          
          {/* Footer of the article */}
          <div className="mt-16 flex items-center justify-between">
            <span 
              className="text-[14px] font-bold uppercase tracking-[0.15em] text-[#1c2e24]" 
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Share Article
            </span>
            <div className="flex gap-5">
              <button 
                onClick={() => handleShare('facebook')}
                className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center hover:-translate-y-1 hover:shadow-lg hover:bg-[#e2b755] transition-all duration-300 text-[#2c4a35] hover:text-[#1c2e24] shadow-[0_4px_15px_rgba(0,0,0,0.06)] cursor-pointer"
              >
                <span className="font-serif text-[22px] italic font-bold">f</span>
              </button>
              <button 
                onClick={() => handleShare('linkedin')}
                className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center hover:-translate-y-1 hover:shadow-lg hover:bg-[#e2b755] transition-all duration-300 text-[#2c4a35] hover:text-[#1c2e24] shadow-[0_4px_15px_rgba(0,0,0,0.06)] cursor-pointer"
              >
                <span className="font-serif text-[19px] italic font-bold tracking-tight">in</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
