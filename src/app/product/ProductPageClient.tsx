"use client";
import dynamic from "next/dynamic";
const ProductPage = dynamic(() => import("./ProductPage").then(mod => mod.default), { ssr: false });
export default function ProductPageClient() {
  return <ProductPage/>;
}