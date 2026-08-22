"use client";
import React from "react";
import {ColorSchemeScript, mantineHtmlProps, MantineProvider, NavLink, Menu, Space, Flex, Container, Box, Divider, Center, Typography } from "@mantine/core";
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
            <Box component="header" h="40" mb="5">
              <Box component="nav" bg="gray" pos="fixed" top="0" w="100%" className="z-9999">
                <Container size="xxl" className="flex justify-between items-center">
                  <Flex justify="center" className="whitespace-nowrap">
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
                  </Flex>
                  <div className="flex-auto"></div>
                  <div className="flex items-center">
                  { pathname?.startsWith('/video') && <VideoSearch/> }
                    <Space w="md" />
                    <Scheme />
                  </div>
                </Container>
              </Box>
            </Box>
            {children}
            <Box component="footer" py="15" bg="gray">
              <Container>
                <Center>
                  Copyright © 2005-{(new Date()).getFullYear()} <a className="mx-2" href="https://yuufa.com">YUUFA.COM</a> 版权所有
                </Center>
              </Container>
            </Box>
          </ContextMenuProvider>
        </MantineProvider>
        {process.env.NODE_ENV == 'production' && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />}
      </body>
    </html>
  );
}
