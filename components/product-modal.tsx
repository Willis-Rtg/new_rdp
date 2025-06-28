"use client";

import { IProduct } from "@/app/admin/actions";
import Image from "next/image";

interface IProductModal {
  product: IProduct;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProductModal({ product, setOpenModal }: IProductModal) {
  return (
    <div
      onClick={() => setOpenModal(false)}
      className="absolute top-0 left-0 flex w-full h-full justify-center items-center bg-black/30"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-2 items-center bg-white rounded-xl p-8"
      >
        <span className="text-lg ">
          {product.event == "onePlus"
            ? "1+1"
            : product.event == "twoPlus"
            ? "2+1"
            : "기타"}
        </span>
        <Image
          className="object-cover w-40 h-40"
          width={120}
          height={120}
          src={product.img}
          alt={product.name}
        />
        <span className="text-xl">{product.name}</span>
        <span className="text-lg">{product.price.toLocaleString()}원</span>
      </div>
    </div>
  );
}
