"use server";

import db from "@/lib/db";
import { Brand, Category } from "@prisma/client";
import * as cheerio from "cheerio";
import { redirect } from "next/navigation";

export interface IProduct {
  id?: number;
  name: string;
  event: string;
  price: number;
  img: string;
  brand?: Brand;
  category?: Category;
}

export const getCu = async () => {
  let prodList: IProduct[] = [];
  const mergeList: IProduct[] = [];

  async function getProducts(pageIndex: number) {
    // const params = new URLSearchParams({
    //   pageIndex: pageIndex.toString(),
    // });

    const res = await fetch(`http://cu.bgfretail.com/event/plusAjax.do`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pageIndex: pageIndex,
      }),
    });
    const data = await res.text();

    const doc = cheerio.load(data);
    prodList = doc("body > ul > li")
      .toArray()
      .map((li) => {
        const $li = cheerio.load(li);
        // console.log($li.html());
        const img = $li("img").attr("src")!.toString();
        const event = $li(".badge > span").text().trim();
        const name = $li(".name").text().trim();
        const price = +$li(".price")
          .text()
          .trim()
          .replace("원", "")
          .replace(",", "");
        const product = {
          name,
          event,
          price,
          img: img.startsWith("//tqklhszfkvzk6518638") ? "https://" + img : img,
        };

        return product;
      });
    console.log(prodList);
    mergeList.push(...prodList);

    // if (prodList.length > 0) {
    //   pageIndex++;
    //   await getProducts(pageIndex);
    // }
  }

  await getProducts(1);

  return mergeList;
};

export const getGs = async () => {
  const gsList: IProduct[] = [];
  // const params = new URLSearchParams({
  //   pageSize: "40",
  // });
  const res = await fetch(
    `http://gs25.gsretail.com/gscvs/ko/products/event-goods-search`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pageSize: "40",
      }),
    }
  );
  const data = await res.json();

  const { results } = JSON.parse(data);

  for (let i = 0; i < results.length; i++) {
    const product = {
      name: results[i].goodsNm,
      event: results[i].eventTypeNm,
      price: results[i].price,
      img: results[i].attFileNm,
    };
    gsList.push(product);
  }

  console.log(gsList);

  return gsList;
};

export const getSeven = async () => {
  const params = new URLSearchParams({
    intPageSize: "40",
  });

  const res = await fetch(
    `http://www.7-eleven.co.kr/product/listMoreAjax.asp?${params.toString()}`,
    {
      method: "GET",
    }
  );
  const data = await res.text();

  const doc = cheerio.load(data);
  // console.log(doc("body").html());
  const prodList: IProduct[] = doc("body > li:not(.btn_more)")
    .toArray()
    .map((li) => {
      const $li = cheerio.load(li);
      const img =
        "https://www.7-eleven.co.kr" + $li("img").attr("src")!.toString();
      const event = $li(".tag_list_01").text().trim().substring(0, 3);
      const name = $li(".name").text().trim();
      const price = +$li(".price").text().trim().replace(",", "");
      const product = {
        name,
        event,
        price,
        img,
      };
      return product;
    });

  console.log(prodList);

  return prodList;
};

export const getEmart = async () => {
  const prodList: IProduct[] = [],
    mergeList: IProduct[] = [];

  await getProducts(1);

  async function getProducts(page: number) {
    const params = new URLSearchParams({ page: page.toString() });
    const res = await fetch(
      `https://emart24.co.kr/goods/event?${params.toString()}`,
      {
        method: "GET",
      }
    );
    const data = await res.text();

    const doc = cheerio.load(data);

    const prodList: IProduct[] = doc(".itemWrap")
      .toArray()
      .map((li) => {
        const $li = cheerio.load(li);
        const img = $li(".itemSpImg img").attr("src")!.toString();
        const event = $li(".floatR").text().trim().replaceAll(" ", "");
        const name = $li(".itemtitle a").text().trim();
        const price = +$li(".price")
          .text()
          .trim()
          .replace(",", "")
          .replace("원", "");
        const product = {
          name,
          event,
          price,
          img,
        };
        return product;
      });
    console.log(prodList);
    mergeList.push(...prodList);

    if (prodList.length > 0 && page < 2) {
      page++;
      await getProducts(page);
    }
  }

  return mergeList;
};

export const saveProducts = async (products: IProduct[]) => {
  await db.product.deleteMany({
    where: {
      brand: products[0].brand,
    },
  });

  await db.product.createMany({
    data: products.map((product) => ({
      name: product.name,
      event:
        product.event === "1+1"
          ? "onePlus"
          : product.event === "2+1"
          ? "twoPlus"
          : "etc",
      price: Number(product.price),
      img: product.img,
      brand: product.brand!,
      category: product.category!,
    })),
  });
  redirect("/admin");
};
