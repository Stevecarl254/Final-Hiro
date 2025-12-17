"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./FooterSection";
import { ReactNode } from "react";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Routes where Navbar/Footer should be hidden
  const hideNavbarFooterRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/admin",
    "/profile",
  ];

  // Exact match or subpaths
  const hideNavbarFooter = hideNavbarFooterRoutes.some((route) =>
    pathname === route || pathname.startsWith(route + "/")
  );

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <main className={!hideNavbarFooter ? "pt-20 min-h-[calc(100vh-80px)]" : "min-h-screen"}>
        {children}
      </main>
      {!hideNavbarFooter && <Footer />}
    </>
  );
}