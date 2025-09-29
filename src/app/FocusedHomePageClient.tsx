"use client";
import dynamic from "next/dynamic";
const FocusedHomePage = dynamic(() => import("./focused_home_page").then(mod => mod.default), { ssr: false });
export default function FocusedHomePageClient() {
  return <FocusedHomePage />;
}
