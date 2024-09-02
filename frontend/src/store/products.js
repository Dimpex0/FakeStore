import { create } from "zustand";

const initialState = {
  products: [],
};

export const useProductsStore = create((set) => ({
  ...initialState,
  setProducts: (products) => set(() => ({ products: products })),
  reset: () => set(initialState),
}));
