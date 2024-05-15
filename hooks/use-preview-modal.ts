import { create } from 'zustand';

import { Product } from '@/types';
import { CartOrder } from './use-cart';

interface PreviewModalStore {
    isOpen: boolean;
    data?: CartOrder;
    onOpen: (data: CartOrder) => void;
    onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
    isOpen: false,
    data: undefined,
    onOpen: (data: CartOrder) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false }),
}));

export default usePreviewModal;