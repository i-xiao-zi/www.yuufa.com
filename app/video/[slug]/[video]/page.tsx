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
    slug: number;
    video: number;
  }>
}

export default async function VideoPage({params}: Params) {
  const { slug, video } = await params;
  const origin = (await api.videoOriginDetail(slug)).data;
  const videoDetail = (await api.videoDetail(video)).data;

  return (
    <main className="container mx-auto flex-auto z-1">
      <Breadcrumbs className="my-3">
        <Anchor href="/">首页</Anchor>
        <Anchor href={`/video/`}>影视</Anchor>
        <Anchor href={`/videos/${slug}`}>{origin.title}</Anchor>
        <Anchor>{videoDetail.name}</Anchor>
      </Breadcrumbs>
      <div>
        <h1>{videoDetail.name}</h1>
        <VideoPlayer links={videoDetail.urls.split('#').map(item => {
          const [title, url] = item.split('$')
          return {title, url};
        })} />
      </div>
    </main>
  )
}