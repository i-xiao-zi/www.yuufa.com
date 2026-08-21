import { Anchor, Breadcrumbs, Container, Typography } from "@mantine/core";
import api from "@/api";
import VideoPlayer from "./player";

interface Params {
  params: Promise<{
    video_id: number;
  }>
}

export default async function Page({video_id}: {video_id: number}) {
  const video = (await api.video.info(video_id)).data;

  return (
    <main className="container mx-auto flex-auto z-1">
      <Container size="xl">
        <Breadcrumbs className="my-3">
          <Anchor href="/">首页</Anchor>
          <Anchor href={`/video/`}>影视</Anchor>
          <Anchor>{video?.name}</Anchor>
        </Breadcrumbs>
      </Container>
      <Container size="xl">
        <Typography component="h1">{video?.name}</Typography>
        {video && <VideoPlayer urls={video.urls} />}
      </Container>
    </main>
  )
}