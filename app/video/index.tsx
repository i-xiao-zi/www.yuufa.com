"use client";
import React from "react";
import { Pagination, Text, Image, Card, Container, Grid, Box } from '@mantine/core';
import api from "@/api";
import useVideoStore, {} from "@/store/video"
import { Tables } from "@/api/supabase";
import { Paginate } from "@/api/types";

export default function Page() {
  const {init, setPage} = useVideoStore();
  const [videoList, setVideoList] = React.useState<Paginate<Tables<'videos'>[]>>({page: 1, size: 10, count: 0, total: 0, data: []});

  React.useEffect(()=>{
    useVideoStore.subscribe((state) => api.video.list({search: state.search, page: state.page, size: state.size}).then(setVideoList));
    init();
  }, []);
  return (
      <Box component="main" my="sm" flex="auto" className="z-1">
        <Container size="xxl" my="sm">
          <Grid>
            {videoList.data.map((item, index) => (
              <Grid.Col key={index} span={{base: 6, md:4, lg: 3}}>
                <Card component="a" href={`/video/${item.id}`} target="_blank">
                  <Card.Section>
                    <Image src={`${item.pic}`} h="400" fallbackSrc="https://placehold.co/600x400?text=image" />
                  </Card.Section>
                  <Text size="sm" ta="center">
                    {item.name}
                  </Text>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
        <Container size="xxl" my="sm">
          <Pagination classNames={{root: 'float-end'}} total={videoList.total} onChange={setPage}/>
        </Container>
      </Box>
    )
}