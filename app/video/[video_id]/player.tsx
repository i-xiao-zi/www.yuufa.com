"use client";
import React from "react";
import { createPlayer } from '@videojs/react';
import { VideoSkin, Video, videoFeatures } from '@videojs/react/video';
import { HlsVideo } from '@videojs/react/media/hls-video';
import '@videojs/react/video/skin.css';
import { Button, SimpleGrid } from "@mantine/core";

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
    <div className="flex">
      <Player.Provider>
        <VideoSkin className="rounded-none">
          {link && (
            <HlsVideo src={link.url} className="h-600" playsInline />
          )}
        </VideoSkin>
      </Player.Provider>
      <SimpleGrid cols={2} w={300}>
        {links.map((link,index) => {
          return (<Button key={index} onClick={() => setLink(link)}>{link.title}</Button>)
        })}
      </SimpleGrid>
    </div>
  )
}