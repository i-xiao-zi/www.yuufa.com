"use client";
import React from "react";
import {ColorSchemeScript, mantineHtmlProps, MantineProvider, NavLink, Menu, Space } from "@mantine/core";
import { ContextMenuProvider } from "mantine-contextmenu";
import { GoogleAnalytics } from "@next/third-parties/google";
import {usePathname} from "next/navigation";
import Clarity from "@microsoft/clarity";
import Head from "next/head";
import Scheme from "@/scheme";
import theme from "@/theme";
import "@/globals.css";
import '@mantine/core/styles.layer.css';
import 'mantine-contextmenu/styles.layer.css';
import VideoSearch from "@/video/search";

export default function Layout({children}: React.PropsWithChildren){
  const pathname = usePathname();
  if (process.env.NODE_ENV == 'production') {
    Clarity.init(process.env.NEXT_PUBLIC_CLARITY_ID ?? '');
  }
  return (
    <html lang="zh-Hans" {...mantineHtmlProps}>
      <Head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </Head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <ContextMenuProvider>
            <header>
              <nav className="fixed top-0 right-0 w-full z-9999">
                <div className="container mx-auto flex justify-between items-center">
                  <div className="flex items-center whitespace-nowrap">
                    <NavLink href="/" label="首页" active={pathname == "/"} variant="filled" />
                    <NavLink href="/note" label="Note" active={pathname?.startsWith("/note")} variant="filled" />
                    <NavLink href="/video" label="影视" active={pathname?.startsWith("/video")} variant="filled" />
                    <NavLink href="/ynp" label="优农派" active={pathname?.startsWith("/ynp")} variant="filled" />
                    <NavLink href="/cron" label="任务" active={pathname?.startsWith("/cron")} variant="filled" />
                    <Menu shadow="md" width={200}>
                      <Menu.Target>
                        <NavLink label="我的" className="hidden" active={pathname?.startsWith("/mine")} variant="filled" />
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item component="a" href="/ynp">优农派</Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </div>
                  <div className="flex-auto"></div>
                  <div className="flex items-center">
                  { pathname?.startsWith('/video') && <VideoSearch/> }
                    <Space w="md" />
                    <Scheme />
                  </div>
                </div>
              </nav>
            </header>
            {children}
          </ContextMenuProvider>
        </MantineProvider>
        {process.env.NODE_ENV == 'production' && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />}
      </body>
    </html>
  );
}
