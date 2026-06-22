'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import HeadingDecorator from '../../components/HeadingDecorator';

export default function ContactView() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^[a-zA-Z\s]+$/.test(val)) {
      setName(val);
      setNameError('');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || (/^[0-9]+$/.test(val) && val.length <= 10)) {
      setPhone(val);
      if (val.length > 0 && val.length < 10) {
        setPhoneError('Please enter exactly 10 digits.');
      } else {
        setPhoneError('');
      }
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (val.length > 0 && !val.toLowerCase().endsWith('@gmail.com')) {
      setEmailError('Please use a @gmail.com address.');
    } else {
      setEmailError('');
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setMessage(val);
    const wordCount = val.trim().split(/\s+/).filter(w => w.length > 0).length;
    if (val.trim().length > 0 && wordCount < 4) {
      setMessageError('Message must contain at least 4 words.');
    } else {
      setMessageError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!name.trim()) {
      setNameError('Full Name is required.');
      hasError = true;
    }

    if (!phone.trim()) {
      setPhoneError('Phone Number is required.');
      hasError = true;
    } else if (phone.length !== 10) {
      setPhoneError('Please enter exactly 10 digits.');
      hasError = true;
    }

    if (!email.trim()) {
      setEmailError('Email is required.');
      hasError = true;
    } else if (!email.toLowerCase().endsWith('@gmail.com')) {
      setEmailError('Please use a @gmail.com address.');
      hasError = true;
    }
    
    if (!message.trim()) {
      setMessageError('Message is required.');
      hasError = true;
    } else {
      const wordCount = message.trim().split(/\s+/).filter(w => w.length > 0).length;
      if (wordCount < 4) {
        setMessageError('Message must contain at least 4 words.');
        hasError = true;
      }
    }

    if (!hasError) {
      setIsSubmitted(true);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-80px)] bg-[#f5f0e6]">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[350px] md:min-h-[420px] flex items-center bg-[#f2f4ed] overflow-hidden mb-12 md:mb-16">
        
        {/* Background Image Container - Image occupies full width now */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src="/journal/contact_hero.png" 
            alt="Wellness Contact" 
            className="w-full h-full object-cover object-right md:object-center"
          />
        </div>

        {/* Gradient Overlay for Text Readability - Matching 2nd image colors */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none" 
          style={{ background: 'linear-gradient(to right, rgba(242,244,237,0.9) 0%, rgba(242,244,237,0.7) 25%, transparent 50%)' }}
        ></div>

        {/* Content Area */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 flex flex-col justify-center">
          <div className="w-full md:w-[55%] lg:w-[45%] flex flex-col items-start text-[#0F3D2E]">
            <h1 className="text-[42px] md:text-[56px] lg:text-[72px] font-bold leading-[1.1] tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              Wellness Contact
            </h1>
            <HeadingDecorator align="left" />
            
            <p className="text-[15px] md:text-[16px] text-[#556358] leading-[1.8] mb-8 max-w-[360px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
              We are here to support your wellness journey.<br />Reach out with any inquiries or to simply connect.
            </p>
            
            <button 
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#1c2e24] hover:bg-[#2a3f30] text-white px-8 py-3 rounded-[4px] font-bold text-[14px] transition-colors shadow-sm inline-flex items-center tracking-wide" 
              style={{ fontFamily: 'Nunito Sans, sans-serif' }}
            >
              Connect with Us
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        


        {/* NEW Contact Information Section */}
        <div className="mt-8 mb-8 w-full">
          <h2 className="text-[28px] md:text-[32px] font-semibold text-[#1c2e24] uppercase tracking-wide text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            CONTACT INFORMATION
          </h2>
          <HeadingDecorator align="center" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Column 1 */}
            <div>
              <h3 className="text-[20px] text-[#1c2e24] mb-6 font-medium" style={{ fontFamily: 'Playfair Display, serif' }}>General Inquiries</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#d6bc8b] flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5 text-[#1c2e24]" />
                  </div>
                  <p className="text-[14px] text-[#0F3D2E] font-medium" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>rherbaltea@gmail.com</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#d6bc8b] flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5 text-[#1c2e24]" />
                  </div>
                  <p className="text-[14px] text-[#0F3D2E] font-medium" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>+91 7799733755</p>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="text-[20px] text-[#1c2e24] mb-6 font-medium" style={{ fontFamily: 'Playfair Display, serif' }}>Customer Support</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#d6bc8b] flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5 text-[#1c2e24]" />
                  </div>
                  <p className="text-[14px] text-[#0F3D2E] font-medium" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>rherbaltea@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="text-[20px] text-[#1c2e24] mb-6 font-medium" style={{ fontFamily: 'Playfair Display, serif' }}>Wholesale Partnerships</h3>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#d6bc8b] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#1c2e24]" />
                </div>
                <div>
                  <p className="text-[14px] text-[#0F3D2E] font-medium leading-[1.6]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    Head Office<br />
                    RealHerbal Tea, Bachupally Area,<br />
                    Hyderabad, Telangana -500090, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="contact-form" className="scroll-mt-28 bg-[#fcfbf9] rounded-[24px] p-6 sm:p-8 lg:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-[#e8e5de] mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Image Area */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center h-full w-full"
          >
            <img 
              src="/journal/contact%20us.png" 
              alt="Contact Us" 
              className="w-full h-full max-h-[380px] object-cover rounded-[12px]"
            />
          </motion.div>

          {/* Right Column: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center w-full max-w-[420px]"
          >
            <h1 className="text-[28px] md:text-[32px] font-semibold text-[#1c2e24] uppercase tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>
              CONTACT US
            </h1>
            <HeadingDecorator align="left" />

            {/* Dynamic Form or Success Message */}
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#edf2eb] border border-[#d1decb] rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-4 mt-2"
              >
                <div className="w-12 h-12 bg-[#8cb73d] rounded-full flex items-center justify-center mb-2 shadow-sm">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-[22px] font-semibold text-[#1c2e24]" style={{ fontFamily: 'Playfair Display, serif' }}>Thank You!</h3>
                <p className="text-[15px] text-[#0F3D2E] leading-relaxed max-w-[300px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  Your message has been received. You will get a response shortly.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 text-[#1c2e24] border-b border-[#1c2e24] hover:text-[#8cb73d] hover:border-[#8cb73d] font-bold text-[13px] tracking-widest uppercase transition-colors"
                  style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form className="space-y-3" onSubmit={handleSubmit} noValidate>
                <div>
                  <input 
                    type="text" 
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Full Name:"
                    className={`w-full bg-transparent border ${nameError ? 'border-red-500 focus:border-red-500' : 'border-[#d1c8ba] focus:border-[#8cb73d]'} rounded-lg px-4 py-2.5 text-[14px] text-[#1c2e24] placeholder:text-[#6b7b72] focus:outline-none transition-colors`}
                    style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                  />
                  {nameError && (
                    <p className="text-red-500 text-[11px] mt-1 ml-1">{nameError}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
                  <div>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="Phone No:"
                      className={`w-full bg-transparent border ${phoneError ? 'border-red-500 focus:border-red-500' : 'border-[#d1c8ba] focus:border-[#8cb73d]'} rounded-lg px-4 py-2.5 text-[14px] text-[#1c2e24] placeholder:text-[#6b7b72] focus:outline-none transition-colors`}
                      style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                    />
                    {phoneError && (
                      <p className="text-red-500 text-[11px] mt-1 ml-1">{phoneError}</p>
                    )}
                  </div>
                  
                  <div>
                    <input 
                      type="email" 
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Email:"
                      className={`w-full bg-transparent border ${emailError ? 'border-red-500 focus:border-red-500' : 'border-[#d1c8ba] focus:border-[#8cb73d]'} rounded-lg px-4 py-2.5 text-[14px] text-[#1c2e24] placeholder:text-[#6b7b72] focus:outline-none transition-colors`}
                      style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                    />
                    {emailError && (
                      <p className="text-red-500 text-[11px] mt-1 ml-1">{emailError}</p>
                    )}
                  </div>
                </div>

                <div>
                  <textarea 
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="Message:"
                    rows={3}
                    className={`w-full bg-transparent border ${messageError ? 'border-red-500 focus:border-red-500' : 'border-[#d1c8ba] focus:border-[#8cb73d]'} rounded-lg px-4 py-2.5 text-[14px] text-[#1c2e24] placeholder:text-[#6b7b72] focus:outline-none transition-colors resize-none`}
                    style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                  ></textarea>
                  {messageError && (
                    <p className="text-red-500 text-[11px] mt-1 ml-1">{messageError}</p>
                  )}
                </div>

                <div className="pt-2 flex justify-center sm:justify-start">
                  <button 
                    type="submit"
                    className="bg-[#1c2e24] hover:bg-[#2a3f30] text-white font-bold tracking-wider rounded-lg px-10 py-2.5 text-[13px] uppercase transition-colors shadow-sm"
                    style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                  >
                    Send
                  </button>
                </div>
              </form>
            )}

            </motion.div>
          </div>
        </div>
      </div>

      {/* Google Maps Section with Full-Width Lite White Background */}
      <section className="w-full bg-[#fcfbf9] py-16 md:py-20">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="text-[28px] md:text-[32px] font-semibold text-[#1c2e24] text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            Google Map
          </h2>
          <HeadingDecorator align="center" />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full border border-[#e8e5de] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
          >
            <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.0339086204212!2d78.40828577332113!3d17.505894699383994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb910049e7e3ed%3A0xa005dc6629ba2be4!2sashok%20pride!5e0!3m2!1sen!2sin!4v1782027700470!5m2!1sen!2sin" 
            width="100%" 
            height="350" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full grayscale-[20%] contrast-[95%]"
          ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full bg-[#2a4530] py-12 md:py-14">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 md:px-16 lg:px-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            
            {/* Left Content */}
            <div className="w-full md:w-1/2 flex flex-col items-start text-white">
              <h3 className="text-[24px] md:text-[28px] font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                Stay Inspired Naturally
              </h3>
              <HeadingDecorator align="left" />
              <p className="text-[15px] md:text-[16px] text-[#d1dcd5] leading-[1.8] max-w-[400px]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                Receive herbal insights, exclusive wellness stories and new tea releases.
              </p>
            </div>

            {/* Right Form Area */}
            <div className="w-full md:w-1/2 flex flex-col">
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
