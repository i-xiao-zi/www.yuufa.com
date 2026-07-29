import React from "react";
import {Metadata} from "next";
import VideoList from "./list";
import { Anchor, Breadcrumbs } from "@mantine/core";
import api from "@/api";


export const metadata: Metadata = {
  title: "影视",
  description: "影视",
};

interface Params {
  params: Promise<{
    slug: number;
  }>
}

export default async function VideoPage({params}: Params) {
  const { slug } = await params;
  const origin = (await api.videoOriginDetail(slug)).data;

  return (
    <main className="container mx-auto flex-auto z-1">
      <Breadcrumbs className="my-3">
        <Anchor href="/">首页</Anchor>
        <Anchor href={`/video/`}>影视</Anchor>
        <Anchor>{origin.title}</Anchor>
      </Breadcrumbs>
      <VideoList origin_id={slug} />
    </main>
  )
}