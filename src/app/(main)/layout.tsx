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
import {Layout, Menu, MenuProps} from "antd";
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import SidebarMenu from "@/app/(main)/_UI/components/SiderMenu";
const { Header, Footer, Sider, Content } = Layout;

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
        {/*<div className= "flex  gap-0 dark:text-white dark:bg-black">*/}
        {/*  <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />*/}
        {/*  <QueryClientProvider client={client}>*/}
        {/*  <div className={cn("relative", isOpen ? "open" : "close")}>*/}
        {/*    <div><Layout style={{position:"fixed",width:"100%",height:"100%"}}>{children}</Layout></div>*/}
        {/*  </div>*/}
        {/*  </QueryClientProvider>*/}
        {/*</div>*/}
      <Layout>
          <Sider
              breakpoint="lg"
              collapsedWidth="0"
              style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                backgroundColor:"#ffffff"
              }}
              className="shadow-md rounded-md border-r-1"
          >
            <div className="demo-logo-vertical" />
              <SidebarMenu/>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Content  className="ml-5">
              <Navbar/>
            <QueryClientProvider client={client}>
                <div>{children}</div>
            </QueryClientProvider>
          </Content>
        </Layout>
      </Layout>
      </body>
    </html>
  );
}
