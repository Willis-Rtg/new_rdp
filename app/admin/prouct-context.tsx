"use client";

import { createContext, useContext, useState } from "react";
import { TProduct } from "./actions";

export interface IProductContext {
  productsState: TProduct[];
  setProductsState: React.Dispatch<React.SetStateAction<TProduct[]>>;
}

export const ProductContext = createContext<IProductContext>({
  productsState: [],
  setProductsState: () => {},
});

export function ProductContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [productsState, setProductsState] = useState<TProduct[]>([]);
  return (
    <ProductContext.Provider value={{ productsState, setProductsState }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  return useContext(ProductContext);
}
