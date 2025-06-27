-- CreateEnum
CREATE TYPE "Brand" AS ENUM ('cu', 'gs', 'seven', 'emart');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('all', 'cook', 'icecream', 'snack', 'juice', 'soap', 'tissue', 'candy', 'etc');

-- CreateEnum
CREATE TYPE "Event" AS ENUM ('onePlus', 'twoPlus', 'etc');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand" "Brand" NOT NULL,
    "category" "Category" NOT NULL,
    "event" "Event" NOT NULL,
    "price" INTEGER NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
