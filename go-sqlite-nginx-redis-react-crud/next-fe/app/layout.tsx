import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={(
          <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-screen h-screen border border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
        </div>
        )}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1 container mx-auto my-10">
              {children}
            </div>
            <Footer />
          </div>
        </Suspense>
      </body>
    </html>
  );
}
