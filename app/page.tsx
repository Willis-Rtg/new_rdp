"use client";

import ProductCard from "@/components/product-card";
import ProductModal from "@/components/product-modal";
import Chip from "@/public/images/Chip";
import Lemonade from "@/public/images/Lemonade";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IProduct } from "./admin/actions";
import { Brand } from "@prisma/client";
import { getProducts } from "./actions";
import { Gugi } from "next/font/google";

const gugi = Gugi({
  subsets: ["latin"],
  weight: ["400"],
});

const brands = [
  { name: "cu", color: "#0be881" },
  { name: "gs", color: "#18dcff" },
  { name: "seven", color: "#ff4d4d" },
  { name: "emart", color: "#ffd32a" },
];
export const categories = [
  { name: "all", icon: <span>All</span> },
  {
    name: "cook",
    icon: (
      <Image width={52} height={52} src="/images/breakfast.svg" alt="식품" />
    ),
  },
  {
    name: "icecream",
    icon: (
      <Image
        width={52}
        height={52}
        src="/images/icecream.svg"
        alt="아이스크림"
      />
    ),
  },
  {
    name: "snack",
    icon: <Chip />,
  },
  {
    name: "juice",
    icon: <Lemonade />,
  },
  {
    name: "soap",
    icon: (
      <Image width={52} height={52} src="/images/soap.svg" alt="목욕용품" />
    ),
  },
  {
    name: "tissue",
    icon: (
      <Image width={52} height={52} src="/images/tissue.svg" alt="생필품" />
    ),
  },
  {
    name: "candy",
    icon: <Image width={52} height={52} src="/images/candy.svg" alt="사탕" />,
  },
  {
    name: "etc",
    icon: <span>기타</span>,
  },
];
export const events = ["all", "onePlus", "twoPlus", "etc"];

export default function Home() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [clickProduct, setClickProduct] = useState<IProduct | null>(null);
  const [selectbrands, setSelectBrands] = useState<string[]>(
    brands.map((brand) => brand.name)
  );
  const [selectedEvent, setSelectedEvent] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [products, setProducts] = useState<IProduct[]>([]);

  const [input, setInput] = useState<string>("");

  function selectBrand(selectedBrand: string) {
    setSelectBrands((prevs) => {
      if (prevs.find((prev: string) => prev === selectedBrand))
        return prevs.filter((prev: string) => prev != selectedBrand);
      return [...prevs, selectedBrand];
    });
  }
  function selectEvent(selectedEvent: string) {
    setSelectedEvent(selectedEvent);
  }
  async function getProductsByBrands() {
    const selectedBrands = selectbrands.map((brand) => brand as Brand);
    const products = await getProducts(selectedBrands);
    setProducts(products);
  }

  useEffect(() => {
    getProductsByBrands();
  }, [selectbrands]);

  return (
    <div className="flex flex-col items-center h-screen py-4 gap-4">
      <h1 className={`${gugi.className} text-2xl`}>알뜰.편</h1>
      <div className="flex gap-8 px-1">
        {brands.map((brand) => (
          <Image
            onClick={() => selectBrand(brand.name)}
            key={brand.name}
            width={72}
            height={72}
            src={`/images/${brand.name}.svg`}
            alt={brand.name}
            className={`cursor-pointer rounded-3xl ${
              selectbrands.find((selectBrand) => brand.name === selectBrand)
                ? "shadow-xl/30"
                : ""
            }`}
          />
        ))}
      </div>
      <div className="flex gap-2 items-center px-2">
        {categories.map((category) => (
          <span
            onClick={() => setSelectedCategory(category.name)}
            key={category.name}
            className={`rounded-full p-1 ${
              selectedCategory === category.name ? "ring-2 ring-blue-500 " : ""
            } `}
          >
            {category.icon}
          </span>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        {events.map((event) => (
          <span
            onClick={() => selectEvent(event)}
            key={event}
            className={`border border-gray-300 px-8 rounded-4xl ${
              selectedEvent === event ? "bg-yellow-200" : ""
            }`}
          >
            {event === "all"
              ? "All"
              : event === "onePlus"
              ? "1+1"
              : event === "twoPlus"
              ? "2+1"
              : "기타"}
          </span>
        ))}
      </div>
      <input
        className="text-center bg-gray-100 rounded-xl w-1/2 border-0 ring-0 outline-0"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="검색"
      />
      <div className="flex gap-2 w-full px-2 justify-between h-2/3">
        {brands.map(
          (brand) =>
            selectbrands.find((selectBrand) => brand.name === selectBrand) && (
              <div
                key={brand.name}
                className={`flex flex-col gap-2 items-center border border-[${brand.color}] rounded-xl p-2 `}
              >
                <h4 className={`text-[${brand.color}]`}>{brand.name}</h4>
                <div
                  className="flex flex-wrap justify-center gap-2 overflow-scroll"
                  style={{ scrollbarWidth: "none" }}
                >
                  {products.map(
                    (product) =>
                      product.brand === brand.name &&
                      (product.event === selectedEvent ||
                        selectedEvent === "all") &&
                      (product.category === selectedCategory ||
                        selectedCategory === "all") &&
                      product.name.includes(input) && (
                        <ProductCard
                          key={product.id}
                          event={
                            product.event === "onePlus"
                              ? "1+1"
                              : product.event === "twoPlus"
                              ? "2+1"
                              : "기타"
                          }
                          price={Number(product.price)}
                          name={product.name}
                          img={product.img}
                          onClick={() => {
                            setClickProduct(product);
                            setOpenModal(true);
                          }}
                        />
                      )
                  )}
                </div>
              </div>
            )
        )}
      </div>
      {openModal && (
        <ProductModal product={clickProduct!} setOpenModal={setOpenModal} />
      )}
    </div>
  );
}
