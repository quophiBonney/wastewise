"use client"
import { usePathname } from "next/navigation";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import NavbarComp from "@/components/navbar/NavbarComp";

export default function RootLayout({ children }) {
  const pathname = usePathname()
 const noFooter = ["/auth/signin", "/auth/signup", "/auth/admin"];
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`bg-gray-50 antialiased`}>
        {!noFooter.includes(pathname) && <NavbarComp />}
        <main className="">{children}</main>
        {
          // only render footer when current path *isn’t* in noFooter
          !noFooter.includes(pathname) && <Footer />
        }
      </body>
    </html>
  );
}
