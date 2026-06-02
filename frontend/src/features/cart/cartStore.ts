import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  sku: string;
  name: string;
  priceCents: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (sku: string) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  clearCart: () => void;
  getTotalCents: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        const existing = state.items.find((i) => i.sku === item.sku);
        if (existing) {
          return {
            items: state.items.map((i) =>
              i.sku === item.sku ? { ...i, quantity: i.quantity + 1 } : i
            ),
          };
        }
        return { items: [...state.items, { ...item, quantity: 1 }] };
      }),
      removeItem: (sku) => set((state) => ({
        items: state.items.filter((i) => i.sku !== sku),
      })),
      updateQuantity: (sku, quantity) => set((state) => ({
        items: state.items.map((i) =>
          i.sku === sku ? { ...i, quantity: Math.max(1, quantity) } : i
        ),
      })),
      clearCart: () => set({ items: [] }),
      getTotalCents: () => {
        return get().items.reduce((total, item) => total + item.priceCents * item.quantity, 0);
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'wellness-cart-storage',
    }
  )
);
