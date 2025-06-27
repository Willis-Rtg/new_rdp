"use server";

import { Brand } from "@prisma/client";
import db from "@/lib/db";
import { IProduct } from "./admin/actions";

export async function getProducts(selectedBrands: Brand[]) {
  // let mergeList: TProduct[] = [];
  // selectedBrands.forEach(async (brand) => {
  //   const products = await db.product.findMany({
  //     where: {
  //       brand: brand,
  //     },
  //   });
  //   mergeList.push(...products);
  // });
  // console.log(mergeList);
  // return mergeList;

  const products = await db.product.findMany({
    where: {
      brand: {
        in: selectedBrands,
      },
    },
  });
  console.log(products);
  return products;
}
