"use client";
import React from "react";
import { Pagination, Text, Image, Card, Container, Grid } from '@mantine/core';
import api, { Paginate } from "@/api";
import useVideoStore, {} from "@/store/video"
import { Tables } from "@/api/supabase";

export default function Page() {
  const {init, setPage} = useVideoStore();
  const [videoList, setVideoList] = React.useState<Paginate<Tables<'videos'>[]>>({page: 1, size: 10, count: 0, total: 0, data: []});

  React.useEffect(()=>{
    useVideoStore.subscribe((state) => api.video.list({search: state.search, page: state.page, size: state.size}).then(setVideoList));
    init();
  }, []);
  return (
      <main className="container mx-auto flex-auto z-1">
        <Container size="lg">
          <Grid>
            {videoList.data.map((item, index) => (
              <Grid.Col key={index} span={{xs: 4, md:6, lg: 3}}>
                <Card component="a" href={`/video/${item.id}`} target="_blank">
                  <Card.Section>
                    <Image src={`${item.pic}`}/>
                  </Card.Section>
                  <Text size="sm" ta="center">
                    {item.name}
                  </Text>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
        <Container size="lg">
          <Pagination classNames={{root: 'float-end'}} total={videoList.total} onChange={setPage}/>
        </Container>
      </main>
    )
}