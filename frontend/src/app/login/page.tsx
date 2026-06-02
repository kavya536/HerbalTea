'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { Lock, Mail, Sparkles, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(redirectPath);
    } catch (err: any) {
      console.error(err);
      let message = 'Failed to authenticate. Please check your credentials.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        message = 'Invalid email or password.';
      } else if (err.code === 'auth/too-many-requests') {
        message = 'Access temporarily locked due to too many failed attempts. Try again later.';
      }
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-2xl border border-border/40 bg-background/60 backdrop-blur-md shadow-2xl space-y-6">
      <div className="text-center space-y-2">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent mx-auto"
        >
          <Sparkles className="h-3 w-3" /> Secure Portal
        </motion.div>
        <h2 className="text-2xl font-light text-primary tracking-tight">Welcome Back</h2>
        <p className="text-xs text-muted">Access your premium botanical subscriptions</p>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-3 rounded-md bg-red-50/50 p-4 text-xs font-medium text-red-800 border border-red-200">
          <ShieldAlert className="h-5 w-5 shrink-0 text-red-600" />
          <p>{errorMsg}</p>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-medium text-foreground">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted/80" />
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-border bg-background/50 pl-10 pr-3 py-2 text-xs text-foreground focus:ring-1 focus:ring-accent outline-none"
              placeholder="name@domain.com"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-xs font-medium text-foreground">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted/80" />
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-border bg-background/50 pl-10 pr-3 py-2 text-xs text-foreground focus:ring-1 focus:ring-accent outline-none"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-primary py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-primary/95 transition-all shadow-md active:scale-[0.98] disabled:bg-muted disabled:scale-100 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>

      <div className="text-center pt-4 border-t border-border/40 text-xs">
        <span className="text-muted">First time sourcing? </span>
        <Link href={`/signup?redirect=${encodeURIComponent(redirectPath)}`} className="text-accent font-semibold hover:underline">
          Create account
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="relative flex items-center justify-center min-h-[80vh] px-4 py-16 bg-gradient-to-b from-secondary/15 via-background to-background">
      {/* Aesthetic background mesh */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <Suspense fallback={
        <div className="w-full max-w-md p-8 rounded-2xl border border-border/40 bg-background/60 backdrop-blur-md shadow-2xl flex items-center justify-center min-h-[300px] text-xs font-medium text-muted">
          Loading login portal...
        </div>
      }>
        <LoginFormContent />
      </Suspense>
    </div>
  );
}
