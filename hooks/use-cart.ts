import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from '@/types';
import { AlertTriangle } from 'lucide-react';

type CartStore = {
    items: CartOrder[];
    addItem: (data: CartOrder) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
}

export interface CartOrder extends Product {
    orderQuantity: string;
}

const useCart = create(
    persist<CartStore>((set, get) => ({
        items: [],
        addItem: (data: CartOrder) => {
            const currentItems: CartOrder[] = get().items;
            const existingItem = currentItems.find((item) => item.id === data.id);

            if (existingItem) {
                return toast('Item already in cart.');
            }

            set({ items: [...currentItems, data] });
            toast.success('Item added to cart.');
        },
        removeItem: (id: string) => {
            set({ items: [...get().items.filter((item) => item.id !== id)] });
            toast.success('Item removed from cart.');
        },
        removeAll: () => set({ items: [] }),
    }), {
        name: 'cart-storage',
        storage: createJSONStorage(() => localStorage)
    }));

export default useCart;