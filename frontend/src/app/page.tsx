'use client';

import React from 'react';
import { useCartStore } from '../features/cart/cartStore';
import { Star, Flame, Sparkles, HeartPulse, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

interface MockProduct {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  priceCents: number;
  category: string;
  rating: number;
}

const PRODUCTS: MockProduct[] = [
  {
    id: "prod-1",
    sku: "MATCH-ORG-100",
    name: "Ceremonial Organic Matcha",
    slug: "ceremonial-organic-matcha",
    description: "Stone-ground, shade-grown high-altitude ceremonial grade green tea powder with natural sweetness.",
    priceCents: 3800,
    category: "Matcha",
    rating: 4.9
  },
  {
    id: "prod-2",
    sku: "CHAM-BLND-050",
    name: "Royal Chamomile Sleep Infusion",
    slug: "royal-chamomile-sleep",
    description: "Calming Egyptian chamomile flower heads blended with organic lavender buds and fresh mint leaves.",
    priceCents: 2400,
    category: "Herbal Blends",
    rating: 4.8
  },
  {
    id: "prod-3",
    sku: "CHAI-SPIC-080",
    name: "Golden Turmeric Herbal Chai",
    slug: "golden-turmeric-herbal-chai",
    description: "A restorative, warming blend of premium organic ginger roots, wild cardamoms, cinnamon, and turmeric.",
    priceCents: 2800,
    category: "Restorative",
    rating: 4.7
  },
  {
    id: "prod-4",
    sku: "HIBI-ROSE-060",
    name: "Hibiscus Rose Glow Nectar",
    slug: "hibiscus-rose-glow-nectar",
    description: "Antioxidant-rich organic hibiscus petals, wild rosehips, and elderberries for cellular regeneration.",
    priceCents: 2600,
    category: "Wellness",
    rating: 4.9
  }
];

export default function Home() {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
        {/* Background Design */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/80 via-primary to-[#182a1e] opacity-90" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c49d56_1.5px,transparent_1.5px)] [background-size:16px_16px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-accent"
          >
            <Sparkles className="h-3 w-3" /> Pure Herbal Adaptogens
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl font-light tracking-tight sm:text-6xl text-background"
          >
            Nurture Your Being With <span className="font-semibold text-accent">Botanical Powders</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto max-w-2xl text-base sm:text-lg text-primary-foreground/80 font-light leading-relaxed"
          >
            Exquisite, small-batch herbal tea formulations. Biodynamic, organic, and lab-certified. Grounded in tradition, elevated by modern science.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="pt-4"
          >
            <a
              href="#shop"
              className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-background shadow-lg hover:bg-accent/90 transition-all active:scale-[0.98]"
            >
              Explore Our Blends
            </a>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-secondary/20 py-16 border-b border-border/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Flame className="h-6 w-6 stroke-[1.5]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Biodynamic Sourcing</h3>
                <p className="text-xs text-muted mt-2 leading-relaxed">Cultivated under ecological parameters protecting local mountain aquifers and soil chemistry.</p>
              </div>
            </div>

            <div className="flex gap-4 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <HeartPulse className="h-6 w-6 stroke-[1.5]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Cellular Nutrition</h3>
                <p className="text-xs text-muted mt-2 leading-relaxed">Carefully dried below 40°C to secure volatile organic phytochemicals and vital minerals.</p>
              </div>
            </div>

            <div className="flex gap-4 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldAlert className="h-6 w-6 stroke-[1.5]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Rigorous Assays</h3>
                <p className="text-xs text-muted mt-2 leading-relaxed">Independently certified by ISO 17025 facilities to verify absence of heavy metals or residues.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product List Section */}
      <section id="shop" className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Botanical Catalogue</span>
            <h2 className="text-3xl font-light tracking-tight text-primary sm:text-4xl">Featured Wellness Powders</h2>
            <div className="mx-auto h-0.5 w-16 bg-accent" />
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col justify-between overflow-hidden rounded-lg border border-border/60 bg-background p-5 hover:shadow-xl hover:border-accent/40 transition-all duration-300"
              >
                <div>
                  {/* Category & Rating */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-accent uppercase font-semibold tracking-wider">{product.category}</span>
                    <span className="flex items-center gap-1 text-muted">
                      <Star className="h-3.5 w-3.5 fill-accent stroke-accent" /> {product.rating}
                    </span>
                  </div>

                  {/* Image Placeholder */}
                  <div className="aspect-[4/3] rounded-md bg-secondary/40 flex items-center justify-center mb-5 group-hover:scale-[1.01] transition-transform duration-300 relative">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-muted">{product.name}</span>
                  </div>

                  {/* Title & SKU */}
                  <h3 className="text-md font-medium text-foreground leading-snug">{product.name}</h3>
                  <p className="text-[10px] text-muted uppercase tracking-widest mt-1">SKU: {product.sku}</p>
                  
                  {/* Description */}
                  <p className="text-xs text-muted mt-3 leading-relaxed font-light">{product.description}</p>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/40">
                  <span className="text-lg font-semibold text-primary">
                    ${(product.priceCents / 100).toFixed(2)}
                  </span>
                  <button
                    onClick={() => {
                      addItem({
                        sku: product.sku,
                        name: product.name,
                        priceCents: product.priceCents
                      });
                    }}
                    className="rounded bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/95 transition-all shadow active:scale-[0.98] cursor-pointer"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
