"use client";

import { NavBar } from "@/components/shared/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar isApp={true} />
      {children}
    </div>
  );
}
