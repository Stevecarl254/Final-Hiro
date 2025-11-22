"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import { ReactNode } from "react";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Routes where Navbar/Footer should be hidden
  const hideNavbarFooterRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/admin",          // All admin pages
    "/admin/",         // Ensure subpaths also match
  ];

  const hideNavbarFooter = hideNavbarFooterRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <main className={!hideNavbarFooter ? "pt-20" : ""}>{children}</main>
      
    </>
  );
}