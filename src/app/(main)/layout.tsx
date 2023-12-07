"use client"; 
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { useState } from "react";
import Sidebar from "./_UI/components/sidebar";

import '@progress/kendo-theme-default/dist/all.css';
const inter = Inter({ subsets: ["latin"] });
import {QueryClient, QueryClientProvider } from 'react-query';
import {cn} from "@/app/(main)/task/_lib/utils";
import {Navbar} from "@/app/(main)/_UI/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true); 
  const client = new QueryClient()
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className= "flex  gap-0 dark:text-white dark:bg-black">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <QueryClientProvider client={client}>
          <div className={cn("relative", isOpen ? "open" : "close")}>
            <Navbar/>
          <div className="">{children}</div>
          </div>
          </QueryClientProvider>
        </div>
      </body>
    </html>
  );
}
