"use client";

import { IProduct } from "@/app/admin/actions";
import { useProductContext } from "@/app/admin/prouct-context";
import { categories } from "@/app/constants";
import { Brand, Category } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

interface IProductCart {
  event: "1+1" | "2+1" | "기타" | string;
  price: number;
  name: string;
  img: string;
  brand: Brand | null;
}

export default function ProductAdminCard({
  event,
  price,
  name,
  img,
  brand,
}: IProductCart) {
  const { productsState, setProductsState } = useProductContext();

  const selectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setProductsState(
      productsState.map((product) => {
        if (product.name === name) {
          return {
            ...product,
            category: category as Category,
          };
        }
        return product;
      })
    );
  };

  return (
    <div className="flex flex-col items-center justify-center border border-gray-100 rounded-xl overflow-hidden text-ellipsis">
      <span className="text-[10px]">{event}</span>
      <Image
        className="object-cover"
        width={60}
        height={60}
        src={img}
        alt={name}
      />
      <span className="text-[12px] w-[80px] overflow-hidden whitespace-nowrap text-ellipsis text-center">
        {name}
      </span>
      <span className="text-[12px] w-[80px] overflow-hidden whitespace-nowrap text-ellipsis text-center">
        {price.toLocaleString()}원
      </span>
      <select defaultValue={"all"} onChange={selectCategory}>
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
