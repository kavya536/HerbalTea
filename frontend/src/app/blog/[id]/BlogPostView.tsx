'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Mail, CheckCircle2, Shield, Heart, Coffee, Leaf, Smile, Sprout, Apple } from 'lucide-react';
import { motion } from 'framer-motion';
import { useParams, usePathname, useRouter } from 'next/navigation';

import { ARTICLES } from '../BlogView';

export default function BlogPostPage() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const basePath = pathname?.startsWith('/journal') ? '/journal' : '/blog';
  const articleId = params?.id ? Number(params.id) : 1;
  const article = ARTICLES.find(a => a.id === articleId) || ARTICLES[0];
  const relatedArticles = ARTICLES.filter(a => a.id !== article.id).slice(0, 3);
  const handleShare = (platform: string) => {
    if (typeof window === 'undefined') return;
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article.title);
    let shareUrl = '';
    
    if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
    } else if (platform === 'pinterest') {
      // Create absolute URL for the image if it's relative
      const imgUrl = encodeURIComponent(window.location.origin + article.img);
      shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&media=${imgUrl}&description=${title}`;
    } else if (platform === 'mail') {
      window.location.href = `mailto:?subject=${title}&body=I thought you might find this interesting: ${window.location.href}`;
      return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, 'share-dialog', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans pb-0">

      {/* Dynamic Hero Section based on article */}
      <div className="relative w-full min-h-[450px] md:min-h-[550px] flex items-center bg-[#0F3D2E] overflow-hidden">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="absolute left-4 sm:left-6 lg:left-8 top-6 md:top-8 w-10 h-10 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white/20 transition-colors backdrop-blur-sm z-30"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
        </button>
        
        {/* Background Image Container (Restricted width to prevent over-zooming cup) */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[90%] lg:w-[75%] z-0">
          <img 
            src={article.img} 
            alt={article.title} 
            className="w-full h-full object-cover object-bottom md:object-right-bottom"
          />
        </div>

        {/* Full-width Screen Gradient Overlay for perfect transitioning */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0F3D2E] from-[15%] via-[#2c4a35] via-[25%] to-transparent to-[35%] md:to-[30%]"></div>

        {/* Content Area */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 md:py-20 flex flex-col justify-center">
          <div className="w-full md:w-[60%] lg:w-[50%] flex flex-col items-start">
            <span className="text-[#dcae3d] text-[11px] font-bold uppercase tracking-widest block mb-4" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              {article.tag}
            </span>
            <h1 className="text-[36px] md:text-[46px] lg:text-[54px] font-bold text-white leading-[1.1] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              {article.title}
            </h1>
            
            <p className="text-[#d1dcd5] text-[16px] md:text-[18px] leading-relaxed mb-8" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              {article.desc}
            </p>
            
            <div className="flex items-center gap-4 text-white/90 text-[13px] font-medium" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              <img src={article.authorImg} alt={article.author} className="w-11 h-11 rounded-full object-cover border border-white/20 shadow-sm" />
              <div className="flex flex-col">
                <span className="text-white font-bold" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>By {article.author}</span>
                <span className="flex items-center gap-2 mt-0.5 text-white/70">
                  <span>{article.date}</span>
                  <span className="text-[10px]">&bull;</span>
                  <span className="flex items-center gap-1"><Coffee className="w-3 h-3" /> {article.readTime}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full bg-white">
        <div className="max-w-[1080px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 md:pt-24 pb-10 md:pb-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* Left Content */}
            <div className="lg:w-[70%] text-[#4a554e] font-sans">
               <div id="introduction" className="mb-12 scroll-mt-24">
                 <p className="text-[15px] leading-relaxed mb-6 text-[#0F3D2E]">
                   <span className="float-left text-[64px] leading-[0.8] pr-2 pt-2 text-[#2c4a35] font-serif">
                     {article.content.intro.charAt(0)}
                   </span>
                   {article.content.intro.slice(1)}
                 </p>
               </div>
               
               <section id="health-benefits" className="mb-12 scroll-mt-24">
                 <h2 className="text-[24px] md:text-[26px] font-bold font-serif mb-6 text-[#0F3D2E]">{article.content.benefitsTitle}</h2>
                 <ul className="space-y-3">
                   {article.content.benefits.map((benefit: string, idx: number) => (
                     <li key={idx} className="flex items-start gap-3">
                       <CheckCircle2 className="w-5 h-5 text-[#8cb73d] shrink-0 mt-0.5" />
                       <span className="text-[15px]">{benefit}</span>
                     </li>
                   ))}
                 </ul>
               </section>
               
               <section id="research-insights" className="mb-12 scroll-mt-24">
                  <h2 className="text-[24px] md:text-[26px] font-bold font-serif mb-6 text-[#0F3D2E]">{article.content.researchTitle}</h2>
                  <ul className="list-disc pl-5 space-y-3 text-[15px] text-[#4a554e]">
                    {article.content.research.map((item: any, idx: number) => (
                      <li key={idx}>
                        <strong className="text-[#dcae3d]">{item.name}</strong>: {item.text}
                      </li>
                    ))}
                  </ul>
               </section>

               <section id="how-to-use" className="mb-12 scroll-mt-24">
                  <h2 className="text-[24px] md:text-[26px] font-bold font-serif mb-6 text-[#0F3D2E]">{article.content.howToUseTitle}</h2>
                  <ul className="space-y-4">
                    {article.content.howToUse.map((tip: string, idx: number) => {
                       const icons = [Coffee, Leaf, Heart, Shield];
                       const Icon = icons[idx % icons.length];
                       return (
                         <li key={idx} className="flex items-start gap-4">
                           <div className="p-2 bg-[#f8f6f0] rounded-md">
                             <Icon className="w-5 h-5 text-[#6e8b3d]" />
                           </div>
                           <span className="text-[15px] mt-2">{tip}</span>
                         </li>
                       );
                    })}
                  </ul>
               </section>

               <section id="daily-wellness-tips" className="mb-12 scroll-mt-24">
                  <h2 className="text-[24px] md:text-[26px] font-bold font-serif mb-8 text-[#0F3D2E]">{article.content.tipsTitle}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                    {article.content.tips.map((tip: any, idx: number) => {
                       const icons = [Coffee, Leaf, Heart, Shield];
                       const Icon = icons[idx % icons.length];
                       return (
                         <div key={idx} className="pl-5 border-l-[3px] border-[#dcae3d]">
                            <h4 className="font-bold text-[16px] text-[#0F3D2E] mb-2 flex items-center gap-2">
                               <Icon className="w-4 h-4 text-[#6e8b3d]" /> {tip.title}
                            </h4>
                            <p className="text-[14px] text-[#6b7b72] leading-relaxed">{tip.desc}</p>
                         </div>
                       );
                    })}
                  </div>
               </section>

               <section id="conclusion" className="mb-12 scroll-mt-24">
                 <h2 className="text-[24px] md:text-[26px] font-bold font-serif mb-4 text-[#0F3D2E]">Conclusion</h2>
                 <p className="text-[15px] leading-relaxed text-[#4a554e]">
                   {article.content.conclusion}
                 </p>
               </section>

            </div>

            {/* Right Sidebar */}
            <div className="lg:w-[30%] hidden lg:flex flex-col gap-8">
              
              {/* On This Page Box */}
              <div className="bg-[#fdfbf7] p-8 rounded-xl border border-[#e8e5de]">
                <h4 className="font-bold font-serif text-[18px] mb-6 text-[#0F3D2E]">On This Page</h4>
                <ul className="space-y-4 text-[14px] text-[#6b7b72] font-medium">
                  <li><a href="#introduction" className="hover:text-[#0F3D2E] transition-colors">1. Introduction</a></li>
                  <li><a href="#health-benefits" className="hover:text-[#0F3D2E] transition-colors">2. The Benefits Of Herbal Tea</a></li>
                  <li><a href="#research-insights" className="hover:text-[#0F3D2E] transition-colors">3. What Research Says</a></li>
                  <li><a href="#how-to-use" className="hover:text-[#0F3D2E] transition-colors">4. How To Use Herbal Tea</a></li>
                  <li><a href="#daily-wellness-tips" className="hover:text-[#0F3D2E] transition-colors">5. Daily Wellness Tips</a></li>
                  <li><a href="#conclusion" className="hover:text-[#0F3D2E] transition-colors">6. Conclusion</a></li>
                </ul>
              </div>

              {/* Share Box */}
              <div className="bg-[#fdfbf7] p-8 rounded-xl border border-[#e8e5de]">
                <h4 className="font-bold font-serif text-[18px] mb-6 text-[#0F3D2E]">Share This Article</h4>
                <div className="flex gap-3">
                   <button onClick={() => handleShare('facebook')} className="w-10 h-10 rounded-full bg-[#e8f0fe] flex items-center justify-center text-[#1877f2] hover:opacity-80 transition-opacity"><svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></button>
                   <button onClick={() => handleShare('twitter')} className="w-10 h-10 rounded-full bg-[#f1f3f4] flex items-center justify-center text-[#0F3D2E] hover:opacity-80 transition-opacity"><svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></button>
                   <button onClick={() => handleShare('pinterest')} className="w-10 h-10 rounded-full bg-[#fce8e6] flex items-center justify-center text-[#ea4335] hover:opacity-80 transition-opacity"><svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.25 2.66 7.89 6.44 9.32-.09-.78-.17-1.98.03-2.84l1.2-5.06s-.31-.62-.31-1.54c0-1.44.84-2.52 1.88-2.52.88 0 1.31.66 1.31 1.45 0 .88-.56 2.21-.85 3.44-.24 1.03.52 1.87 1.53 1.87 1.84 0 3.25-1.94 3.25-4.74 0-2.48-1.78-4.21-4.32-4.21-2.95 0-4.68 2.21-4.68 4.5 0 .88.34 1.83.76 2.34.08.1.09.18.07.28l-.24 1.01c-.04.16-.14.2-.31.12-1.16-.54-1.89-2.24-1.89-3.6 0-2.93 2.13-5.62 6.14-5.62 3.23 0 5.74 2.3 5.74 5.37 0 3.21-2.02 5.8-4.83 5.8-1.02 0-1.98-.53-2.31-1.16l-.63 2.4c-.23.86-.85 1.94-1.27 2.6C10.53 21.84 11.25 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"></path></svg></button>
                   <button onClick={() => handleShare('mail')} className="w-10 h-10 rounded-full bg-[#e6f4ea] flex items-center justify-center text-[#34a853] hover:opacity-80 transition-opacity"><Mail className="w-4 h-4"/></button>
                </div>
              </div>

              {/* Vertical Image Card */}
              <div className="relative rounded-xl overflow-hidden h-[400px]">
                <img src="/blog/blog_3.png" alt="Tea Set" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                  <h3 className="text-white font-serif text-[26px] leading-[1.2]">
                    Wellness begins<br/>with nature,<br/>nourished by<br/>tradition.
                  </h3>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Promotional Section */}
      <section className="w-full bg-[#fafafa] py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            
            {/* Left Image Area */}
            <div className="w-full md:w-1/2 flex justify-center h-[400px]">
              <img 
                src="/blog/blog_left_img.png" 
                alt="Ruby Calm Tea" 
                className="max-w-full h-full object-contain drop-shadow-xl"
              />
            </div>

            {/* Right Content Area */}
            <div className="w-full md:w-1/2 flex flex-col items-start">
              <h2 className="text-[32px] md:text-[40px] font-bold text-[#0F3D2E] mb-4 leading-[1.1]" style={{ fontFamily: 'Playfair Display, serif' }}>
                Sip The Wellness<br />You Read About
              </h2>

              <p className="text-[15px] md:text-[16px] text-[#6b7b72] mb-8 leading-relaxed max-w-[450px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                Bring ancient herbal wisdom into your daily ritual with our best-selling blends. Each cup is thoughtfully crafted to nourish your body and elevate your well-being.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 mb-10">
                <div className="flex items-center gap-3">
                  <Smile className="w-5 h-5 text-[#5e8b42]" strokeWidth={2} />
                  <span className="text-[14px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Relaxation Support</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Coffee className="w-5 h-5 text-[#5e8b42]" strokeWidth={2} />
                  <span className="text-[14px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Naturally Caffeine Free</span>
                </div>

                <div className="flex items-center gap-3">
                  <Sprout className="w-5 h-5 text-[#5e8b42]" strokeWidth={2} />
                  <span className="text-[14px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Adaptogen Rich</span>
                </div>

                <div className="flex items-center gap-3">
                  <Apple className="w-5 h-5 text-[#5e8b42]" strokeWidth={2} />
                  <span className="text-[14px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Premium Ingredients</span>
                </div>
              </div>

              <Link href="/shop" className="bg-[#2c4a35] hover:bg-[#1c2e24] text-white px-8 py-3.5 rounded flex items-center gap-2 font-bold text-[14px] transition-colors shadow-sm">
                Shop Ruby Calm Tea
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Related Articles */}
      <div className="w-full bg-[#f8f6f0] pt-16 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="relative mb-12">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-[32px] md:text-[36px] font-bold font-serif text-[#0F3D2E]">Related Articles</h2>
            </div>
            
            <div className="md:absolute md:right-0 md:bottom-1 mt-6 md:mt-0 flex justify-center md:justify-end">
              <Link href="/blog#browse-by-topic" className="text-[15px] font-bold text-[#2c4a35] flex items-center gap-2 hover:text-[#5e8b42] transition-colors">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {relatedArticles.map((relArticle) => (
              <motion.article 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                key={relArticle.id}
                className="group flex flex-col bg-white rounded-[12px] overflow-hidden shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_-8px_rgba(44,74,53,0.1)] border border-[#f0eee9] transition-all duration-300 h-full"
              >
                {/* Image Container */}
                <div className="relative h-[200px] w-full overflow-hidden shrink-0">
                  <img 
                    src={relArticle.img} 
                    alt={relArticle.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>

                {/* Content */}
                <div className="p-5 md:p-6 flex flex-col flex-grow bg-white relative">
                  
                  {/* Tag Overlay */}
                  <div className="absolute -top-[14px] left-5 bg-white px-3 py-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] z-10 rounded-[2px]">
                    <span className="text-[10px] font-bold text-[#dcae3d] uppercase tracking-wider" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                      {relArticle.tag}
                    </span>
                  </div>

                  <h3 
                    className="text-[17px] md:text-[19px] font-bold text-[#0F3D2E] leading-[1.3] mt-2 mb-2 group-hover:text-[#2c4a35] transition-colors line-clamp-2 min-h-[48px]"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {relArticle.title}
                  </h3>

                  <p className="text-[13px] text-[#6b7b72] mb-5 leading-[1.6] line-clamp-2 min-h-[42px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    {relArticle.desc}
                  </p>
                  
                  {/* Author & Meta */}
                  <div className="flex items-center gap-3 mb-5">
                    <img src={relArticle.authorImg} alt={relArticle.author} className="w-8 h-8 rounded-full object-cover shadow-sm" />
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold text-[#0F3D2E]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{relArticle.author}</span>
                      <span className="text-[11px] text-[#8a958f]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                        {relArticle.date} &nbsp;&bull;&nbsp; {relArticle.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Read Article Link */}
                  <Link href={`${basePath}/${relArticle.id}`} className="mt-auto pt-4 border-t border-[#f0eee9] text-[13px] font-bold text-[#2c4a35] flex items-center gap-1.5 hover:text-[#5e8b42] transition-colors">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </Link>

                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
      {/* Newsletter Section */}
      <section className="w-full bg-[#2a4530] py-12 md:py-14">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 md:px-16 lg:px-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            
            {/* Left Content */}
            <div className="w-full md:w-1/2 flex flex-col items-start text-white">
              <h3 className="text-[24px] md:text-[28px] font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Stay Inspired Naturally
              </h3>
              <p className="text-[14px] text-[#d1dcd5] leading-relaxed max-w-[400px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                Receive herbal insights, exclusive wellness stories and new tea releases.
              </p>
            </div>

            {/* Right Form Area */}
            <div className="w-full md:w-1/2 flex flex-col w-full">
              <form className="w-full max-w-[480px] md:ml-auto" onSubmit={(e) => e.preventDefault()}>
                <div className="flex w-full rounded-[4px] overflow-hidden">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-grow px-4 py-3 md:py-3.5 text-[#0F3D2E] bg-white outline-none text-[14px] font-medium placeholder-[#8a958f]"
                    style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                  />
                  <button type="submit" className="bg-[#dcae3d] hover:bg-[#c99f36] text-white px-6 md:px-8 py-3 md:py-3.5 font-bold text-[14px] transition-colors whitespace-nowrap" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    Subscribe
                  </button>
                </div>
                <p className="text-[11px] text-[#aebbb5] mt-2.5 text-left" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  No spam, ever. Unsubscribe anytime.
                </p>
              </form>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
