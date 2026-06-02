'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'N/A';

  return (
    <div className="mx-auto max-w-md text-center py-20 px-4 sm:px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="flex justify-center mb-6"
      >
        <CheckCircle2 className="h-16 w-16 text-accent stroke-[1.5]" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-light text-primary tracking-tight mb-3"
      >
        Order Confirmed
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xs text-muted mb-8 leading-relaxed font-light"
      >
        Thank you for choosing Eduqra Wellness. Your botanical blend request is recorded. A confirmation message and tracking details will be dispatched to your email.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-lg border border-border bg-secondary/15 p-5 mb-8 text-left space-y-2.5"
      >
        <div className="flex justify-between text-xs">
          <span className="text-muted">Order ID</span>
          <span className="font-semibold text-primary select-all">{orderId}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted">Status</span>
          <span className="rounded-full bg-green-50 px-2.5 py-0.5 font-bold text-green-700 uppercase tracking-widest text-[9px] border border-green-200">
            Received
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-3 justify-center"
      >
        <button
          onClick={() => router.push('/')}
          className="inline-flex items-center justify-center gap-2 rounded bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-primary/95 transition-all shadow cursor-pointer"
        >
          <ShoppingBag className="h-4 w-4" /> Continue Sourcing
        </button>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh] text-xs font-medium text-muted">
        Loading confirmation details...
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
