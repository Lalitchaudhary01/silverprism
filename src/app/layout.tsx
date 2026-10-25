import type { Metadata } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchModal } from "@/components/SearchModal";
import { Toast } from "@/components/Toast";
import { ChannelPersonaBanner } from "@/components/ChannelPersonaBanner";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SILVERPRISM — Crafted with Precision. Designed to Shine.",
  description:
    "Premium sterling silver jewellery manufacturing, wholesale B2B ordering, and direct luxury retail e-commerce platform.",
  authors: [{ name: "Cognixs" }],
  openGraph: {
    title: "SILVERPRISM — Precision Jewellery Manufacturing & Commerce",
    description: "Retail and wholesale fine jewellery, backed by manufacturing expertise.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF9F6] text-[#171717] selection:bg-[#B7A078] selection:text-white">
        <StoreProvider>
          <Header />
          <ChannelPersonaBanner />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <SearchModal />
          <Toast />
        </StoreProvider>
      </body>
    </html>
  );
}
