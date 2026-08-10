"use client";
import React from "react";
import { Pagination, Text, Image, Card } from '@mantine/core';
import api, { Paginate } from "@/api";
import useVideoStore, {} from "@/store/video"
import {  Tables } from "@/supabase";

export default function VideoList() {
  const {init, setPage} = useVideoStore();
  const [videoList, setVideoList] = React.useState<Paginate<Tables<'videos'>[]>>({page: 1, size: 10, count: 0, total: 0, data: []});

  React.useEffect(()=>{
    useVideoStore.subscribe((state) => api.video.list({search: state.search, page: state.page, size: state.size}).then(setVideoList));
    init();
  }, []);

  return (
    <div className="container mx-auto flex-auto z-1 my-[20px]">
      <div className="grid grid-cols-4 lg:grid-cols-6 md:grid-cols-5 xl:grid-cols-8 gap-5">
        {videoList.data.map((item, index) => (
          <Card key={index} component="a" href={`/video/${item.id}`}>
            <Card.Section>
              <Image radius="md" src={`${item.pic}`}/>
            </Card.Section>
            <Text size="sm" ta="center">
              {item.name}
            </Text>
          </Card>
        ))}
      </div>
      <Pagination classNames={{root: 'float-end'}} total={videoList.total} onChange={setPage}/>
    </div>
  )
}