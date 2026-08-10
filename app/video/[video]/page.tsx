import React from "react";
import {Metadata} from "next";
import { Anchor, Breadcrumbs } from "@mantine/core";
import api from "@/api";
import VideoPlayer from "./player";


export const metadata: Metadata = {
  title: "影视",
  description: "影视",
};

interface Params {
  params: Promise<{
    video: number;
  }>
}

export default async function VideoPage({params}: Params) {
  const {video} = await params;
  const info = (await api.video.info(video)).data;

  return (
    <main className="container mx-auto flex-auto z-1">
      <Breadcrumbs className="my-3">
        <Anchor href="/">首页</Anchor>
        <Anchor href={`/video/`}>影视</Anchor>
        <Anchor>{info?.name}</Anchor>
      </Breadcrumbs>
      <div>
        <h1>{info?.name}</h1>
        <VideoPlayer urls={info!.urls} />
      </div>
    </main>
  )
}