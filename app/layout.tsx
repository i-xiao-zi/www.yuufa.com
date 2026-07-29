"use client";
import React from "react";
import {ColorSchemeScript, mantineHtmlProps, MantineProvider, NavLink, Menu } from "@mantine/core";
import { ContextMenuProvider } from "mantine-contextmenu";
import { GoogleAnalytics } from "@next/third-parties/google";
import {usePathname} from "next/navigation";
import Clarity from "@microsoft/clarity";
import Head from "next/head";
import Scheme from "@/scheme";
import theme from "@/theme";
import "@/globals.css";
import config from "@/config";
import '@mantine/core/styles.layer.css';
import 'mantine-contextmenu/styles.layer.css';

export default function Layout({children}: React.PropsWithChildren){
  const pathname = usePathname();
  React.useEffect(() => {
    config.is_prod && Clarity.init(config.clarity_id as string);
  }, []);
  return (
    <html lang="en" {...mantineHtmlProps}>
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
                    <NavLink href="/note" label="Note" active={pathname.startsWith("/note")} variant="filled" />
                    <NavLink href="/you_nong_pai" label="优农派" active={pathname.startsWith("/you_nong_pai")} variant="filled" />
                    <Menu shadow="md" width={200}>
                      <Menu.Target>
                        <NavLink label="我的" className="hidden" active={pathname.startsWith("/mine")} variant="filled" />
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item component="a" href="/you_nong_pai">优农派</Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </div>
                  <div className="flex-auto"></div>
                  <div className="flex items-center">
                    <Scheme />
                  </div>
                </div>
              </nav>
            </header>
            {children}
          </ContextMenuProvider>
        </MantineProvider>
        {config.is_prod && <GoogleAnalytics gaId={config.ga_id as string} />}
      </body>
    </html>
  );
}
