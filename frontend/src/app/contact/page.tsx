'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^[a-zA-Z\s]+$/.test(val)) {
      setName(val);
      setNameError('');
    } else {
      setNameError('Please enter alphabets only.');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^[0-9]+$/.test(val)) {
      setPhone(val);
      if (val.length > 0 && val.length !== 10) {
        setPhoneError('Phone number must be exactly 10 digits.');
      } else {
        setPhoneError('');
      }
    } else {
      setPhoneError('Please enter numbers only.');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setMessage(val);
    if (val.length > 5) {
      setMessageError('Message cannot exceed 5 characters.');
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
      setPhoneError('Phone number must be exactly 10 digits.');
      hasError = true;
    }

    if (!email.trim()) {
      setEmailError('Email is required.');
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address.');
      hasError = true;
    }
    
    if (!message.trim()) {
      setMessageError('Message is required.');
      hasError = true;
    } else if (message.length > 5) {
      setMessageError('Message cannot exceed 5 characters.');
      hasError = true;
    }

    if (!hasError) {
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-80px)] bg-[#f5f0e6] pt-6 md:pt-8 pb-24 md:pb-32">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        
        {/* Back Button matching the reference image */}
        <button 
          onClick={() => router.back()}
          className="absolute left-4 sm:left-6 lg:left-8 top-0 w-10 h-10 rounded-full border border-[#d1c8ba] flex items-center justify-center text-[#1c2e24] hover:bg-[#e8e3d9] transition-colors z-10"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mt-14">
          
          {/* Left Column: Image & Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            {/* Compressed Image to prevent scrolling */}
            <div className="w-full flex justify-center lg:justify-start">
              <img 
                src="/home/contact.png" 
                alt="Contact Support" 
                className="w-full max-w-[350px] max-h-[280px] object-contain mix-blend-multiply"
              />
            </div>
            
            {/* Contact Info text directly under the image - highly compressed vertical spacing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-4 mt-2 px-2">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#8cb73d] shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-[14px] font-semibold text-[#1c2e24] uppercase tracking-wide mb-1" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Visit Us</p>
                  <p className="text-[13px] text-[#6b7b72] leading-tight" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>123 Wellness Avenue, NY 10001</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#8cb73d] shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-[14px] font-semibold text-[#1c2e24] uppercase tracking-wide mb-1" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Call Us</p>
                  <p className="text-[13px] text-[#6b7b72]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>+1 (800) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:col-span-2">
                <Mail className="w-5 h-5 text-[#8cb73d] shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-[14px] font-semibold text-[#1c2e24] uppercase tracking-wide mb-1" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Email Us</p>
                  <p className="text-[13px] text-[#6b7b72]" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>hello@herbaltea.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-[28px] md:text-[32px] font-semibold text-[#1c2e24] mb-6 uppercase tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>
              CONTACT US
            </h1>

            {/* Compressed form fields to fit on one screen */}
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div>
                <input 
                  type="text" 
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Full Name:"
                  className={`w-full bg-transparent border ${nameError ? 'border-red-500 focus:border-red-500' : 'border-[#d1c8ba] focus:border-[#8cb73d]'} rounded-lg px-4 py-3 text-[14px] text-[#1c2e24] placeholder:text-[#6b7b72] focus:outline-none transition-colors`}
                  style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                />
                {nameError && (
                  <p className="text-red-500 text-[11px] mt-1 ml-1">{nameError}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                <div>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="Phone No:"
                    className={`w-full bg-transparent border ${phoneError ? 'border-red-500 focus:border-red-500' : 'border-[#d1c8ba] focus:border-[#8cb73d]'} rounded-lg px-4 py-3 text-[14px] text-[#1c2e24] placeholder:text-[#6b7b72] focus:outline-none transition-colors`}
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
                    className={`w-full bg-transparent border ${emailError ? 'border-red-500 focus:border-red-500' : 'border-[#d1c8ba] focus:border-[#8cb73d]'} rounded-lg px-4 py-3 text-[14px] text-[#1c2e24] placeholder:text-[#6b7b72] focus:outline-none transition-colors`}
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
                  rows={4}
                  className={`w-full bg-transparent border ${messageError ? 'border-red-500 focus:border-red-500' : 'border-[#d1c8ba] focus:border-[#8cb73d]'} rounded-lg px-4 py-3 text-[14px] text-[#1c2e24] placeholder:text-[#6b7b72] focus:outline-none transition-colors resize-none`}
                  style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                ></textarea>
                {messageError && (
                  <p className="text-red-500 text-[11px] mt-1 ml-1">{messageError}</p>
                )}
              </div>

              <div className="pt-2 flex justify-center sm:justify-start">
                <button 
                  type="submit"
                  className="bg-[#1c2e24] hover:bg-[#2a3f30] text-white font-bold tracking-wider rounded-lg px-10 py-3 text-[13px] uppercase transition-colors shadow-sm"
                  style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                >
                  Send
                </button>
              </div>
            </form>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
