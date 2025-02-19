"use client";

import { NavBar } from "@/components/shared/navbar";
import { Footer } from "react-day-picker";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar isApp={true} />
      {children}
           {/* <Footer/> */}
    </div>
  );
}
