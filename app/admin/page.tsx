"use client";

import Chip from "@/public/images/Chip";
import Lemonade from "@/public/images/Lemonade";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getCu, getEmart, getGs, getSeven, saveProducts } from "./actions";
import { IProduct } from "./actions";
import ProductAdminCard from "@/components/product-admin-card";
import { Brand } from "@prisma/client";
import { useProductContext } from "./prouct-context";

export default function Home() {
  const [clickBrand, setClickBrand] = useState<Brand | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const { productsState, setProductsState } = useProductContext();

  const getProducts = async (brand: string) => {
    let products: IProduct[] = [];
    if (brand === "cu") {
      products = await getCu();
    }
    if (brand === "gs") {
      products = await getGs();
    }
    if (brand === "seven") {
      products = await getSeven();
    }
    if (brand === "emart") {
      products = await getEmart();
    }
    setProducts(products);
  };

  useEffect(() => {
    setProductsState(
      products.map((product) => {
        return {
          ...product,
          brand: clickBrand!,
        };
      })
    );
  }, [products]);
  return (
    <div className="flex flex-col items-center h-screen py-4 gap-4">
      <h1>알뜰.편</h1>
      <div className="flex gap-8 px-1">
        <Image
          className="text-[#0be881] border-[#0be881]"
          onClick={async () => {
            await getProducts("cu");
            setClickBrand("cu");
          }}
          width={72}
          height={72}
          src="/images/cu.svg"
          alt="cu"
        />
        <Image
          onClick={async () => {
            await getProducts("gs");
            setClickBrand("gs");
          }}
          className="text-[#18dcff] border-[#18dcff]"
          width={72}
          height={72}
          src="/images/gs.svg"
          alt="gs"
        />
        <Image
          onClick={async () => {
            await getProducts("seven");
            setClickBrand("seven");
          }}
          className="text-[#ff4d4d] border-[#ff4d4d]"
          width={56}
          height={72}
          src="/images/seven.svg"
          alt="seven"
        />
        <Image
          onClick={async () => {
            await getProducts("emart");
            setClickBrand("emart");
          }}
          className="text-[#ffd32a] border-[#ffd32a]"
          width={72}
          height={72}
          src="/images/emart.svg"
          alt="emart"
        />
      </div>
      <div className="flex gap-2 items-center px-2">
        <span>All</span>
        <span>
          <Image
            width={50}
            height={50}
            src="/images/breakfast.svg"
            alt="식품"
          />
        </span>
        <span>
          <Image
            width={50}
            height={50}
            src="/images/icecream.svg"
            alt="아이스크림"
          />
        </span>
        <span>
          <Chip />
        </span>
        <span>
          <Lemonade />
        </span>
        <span>
          <Image width={50} height={50} src="/images/soap.svg" alt="목욕용품" />
        </span>
        <span>
          <Image width={50} height={50} src="/images/tissue.svg" alt="생필품" />
        </span>
        <span>
          <Image width={50} height={50} src="/images/candy.svg" alt="사탕" />
        </span>
        <span>기타</span>
      </div>
      <div className="flex gap-2 items-center">
        <span className="border border-gray-300 px-8 rounded-4xl">all</span>
        <span className="border border-gray-300 px-8 rounded-4xl">1+1</span>
        <span className="border border-gray-300 px-8 rounded-4xl">2+1</span>
        <span className="border border-gray-300 px-8 rounded-4xl">기타</span>
      </div>
      <input
        className="text-center bg-gray-100 rounded-xl w-1/2 border-0 ring-0 outline-0"
        type="text"
        placeholder="검색"
      />
      <div className="flex flex-wrap justify-center items-center gap-2 w-full px-2  h-2/3">
        {products.map((product, index) => (
          <ProductAdminCard
            key={`${index} + ${product.name} + ${product.brand} + ${product.id}`}
            event={product.event}
            price={Number(product.price)}
            name={product.name}
            img={product.img}
            brand={clickBrand}
          />
        ))}
        <button
          className="border border-gray-300 px-8 rounded-4xl"
          onClick={() => {
            // console.log(productsState);
            saveProducts(productsState);
          }}
        >
          저장
        </button>
      </div>
    </div>
  );
}
