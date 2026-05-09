import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Loader from "@/components/Home/Loader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Rise At Seven | Award Winning Digital Agency",
  description: "Award winning digital agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full antialiased tracking-[-0.02em]`}
    >
      <body className="min-h-full flex flex-col bg-[#e7e6e0]">
        <Loader />
        {children}
      </body>
    </html>
  );
}
