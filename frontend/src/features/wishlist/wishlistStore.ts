import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  productId: number;
}

interface WishlistState {
  items: WishlistItem[];
  toggleItem: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (productId) => set((state) => {
        const exists = state.items.some(i => i.productId === productId);
        if (exists) {
          return { items: state.items.filter(i => i.productId !== productId) };
        } else {
          return { items: [...state.items, { productId }] };
        }
      }),
      isInWishlist: (productId) => {
        return get().items.some(i => i.productId === productId);
      },
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'wellness-wishlist-storage',
    }
  )
);
