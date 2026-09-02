import { Anchor, Box, Breadcrumbs, Container, Typography } from "@mantine/core";
import api from "@/api";
import VideoPlayer from "./player";

export default async function Page({video_id}: {video_id: number}) {
  const video = (await api.video.info(video_id)).data;

  return (
    <Box component="main" my="sm" className="z-1">
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
    </Box>
  )
}