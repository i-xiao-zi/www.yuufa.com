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
    video_id: number;
  }>
}

export default async function VideoPage({params}: Params) {
  const {video_id} = await params;
  const video = (await api.video.info(video_id)).data;

  return (
    <main className="container mx-auto flex-auto z-1">
      <Breadcrumbs className="my-3">
        <Anchor href="/">首页</Anchor>
        <Anchor href={`/video/`}>影视</Anchor>
        <Anchor>{video?.name}</Anchor>
      </Breadcrumbs>
      <div>
        <h1>{video?.name}</h1>
        {video && <VideoPlayer urls={video.urls} />}
      </div>
    </main>
  )
}