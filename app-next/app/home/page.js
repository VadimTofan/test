"use client";

import Hero from "@/app/home/hero/Hero";
import Category from "@/app/home/category/Category";
import Features from "@/app/home/features/Features";
import { useEffect } from "react";

export default function Main() {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/me`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => console.log("API /me response:", data))
      .catch(console.error);
  }, []);
  return (
    <div>
      <Hero />
      <Category />
      <Features />
    </div>
  );
}
