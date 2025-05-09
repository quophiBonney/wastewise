"use client"
import { usePathname } from "next/navigation";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import NavbarComp from "@/components/navbar/NavbarComp";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { PrimeReactProvider } from "primereact/api";
export default function RootLayout({ children }) {
  const pathname = usePathname()
 const noFooter = ["/auth/signin", "/auth/signup", "/auth/admin"];
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`bg-gray-50 antialiased`}>
        <PrimeReactProvider>
        <Provider store={store}>
          {!noFooter.includes(pathname) && <NavbarComp />}
          <main className="">{children}</main>
          {
            // only render footer when current path *isn’t* in noFooter
            !noFooter.includes(pathname) && <Footer />
          }
        </Provider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
