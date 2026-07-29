"use client";
import React from "react";
import { createPlayer } from '@videojs/react';
import { VideoSkin, Video, videoFeatures } from '@videojs/react/video';
import '@videojs/react/video/skin.css';
import { Button, SimpleGrid } from "@mantine/core";

interface Link {
    title: string; 
    url: string;
}

export default function VideoPlayer({links}: {links: Link[]}){
    const [link, setLink] = React.useState<Link>();
    const Player = createPlayer({ features: videoFeatures });

    React.useEffect(() => {
        setLink(links[0]);
    }, []);

    return (
        <div className="flex">
            <Player.Provider>
                <VideoSkin className="rounded-none" poster="https://image.mux.com/BV3YZtogl89mg9VcNBhhnHm02Y34zI1nlMuMQfAbl3dM/thumbnail.webp">
                    {link ? <Video src={link.url} playsInline /> : ''}
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