"use client";

import { createContext, useContext, useState } from "react";
import { IProduct } from "./actions";

export interface IProductContext {
  productsState: IProduct[];
  setProductsState: React.Dispatch<React.SetStateAction<IProduct[]>>;
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
  const [productsState, setProductsState] = useState<IProduct[]>([]);
  return (
    <ProductContext.Provider value={{ productsState, setProductsState }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  return useContext(ProductContext);
}
