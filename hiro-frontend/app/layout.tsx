// app/layout.tsx
import "./globals.css";
import { Figtree } from "next/font/google";
import ClientWrapper from "../components/ClientWrapper";
import type { Metadata } from "next";
import { ReactNode } from "react";

const figtree = Figtree({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Hiro Catering Services",
  description: "One-stop site for all catering equipment, corporate hospitality, and event services.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${figtree.className} bg-gray-50 text-gray-900`}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}