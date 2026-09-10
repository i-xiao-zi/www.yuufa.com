"use client";
import React from "react";
import { Button, Flex, SimpleGrid } from "@mantine/core";
import { createPlayer } from '@videojs/react';
import { VideoSkin, Video, videoFeatures } from '@videojs/react/video';
import { HlsJsVideo } from '@videojs/react/media/hlsjs-video';
import '@videojs/react/video/skin.css';

interface Link {
  title: string;
  url: string;
}

export default function VideoPlayer({urls}: {urls: string}){
  const [links, setLinks] = React.useState<Link[]>([]);
  const [link, setLink] = React.useState<Link>();
  const Player = createPlayer({ features: videoFeatures });

  React.useEffect(() => {
    const links = urls.split('#').map(item => {
      const [title, url] = item.split('$')
      return {title, url};
    });
    setLinks(links);
    setLink(links[0]);
  }, []);

  return (
    <Flex className="flex" direction={{base: 'column', md: 'row'}} gap={2}>
      <Player.Player>
        <VideoSkin className="rounded-none">
          {link && <HlsJsVideo src={link.url} className="h-600" playsInline />}
        </VideoSkin>
      </Player.Player>
      <SimpleGrid cols={2} w={300}>
        {links.map((link,index) => {
          return (<Button key={index} onClick={() => setLink(link)}>{link.title}</Button>)
        })}
      </SimpleGrid>
    </Flex>
  )
}