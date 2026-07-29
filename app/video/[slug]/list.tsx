"use client";
import React from "react";
import { Box, Button, Pagination, Text, Image, SimpleGrid, Card, Input, Group, ActionIcon } from '@mantine/core';
import { IconSearch } from "@tabler/icons-react";
import api from "@/api";
import { Paginate, Video } from "@/api.t";

export default function VideoList({origin_id}: {origin_id: number}) {
  const search = React.useRef<string>("");
  const page = React.useRef<number>(1);
  const [videoList, setVideoList] = React.useState<Paginate<Video[]>>({page:1, total: 0, count: 0, data: [], size: 0});
  const fetchVideoList = () => {
    api.videoList({video_name: search.current, origin_id, page: page.current, size: 10}).then((res) => setVideoList(res.data!));
  }
  React.useEffect(()=>{
    fetchVideoList();
  }, []);
  return (
    <main className="container mx-auto flex-auto z-1">
      <div className="my-5 flex md:w-200">
          <Input
            className="self-1 w-full"
            classNames={{input: 'rounded-r-0 border-r-0'}}
            placeholder="Clearable input"
            leftSection={<IconSearch/>}
            onChange={e => search.current=e.target.value}
            size="md"
          />
          <Button 
            className="rounded-l-0 border-l-0"
            variant="filled"
            aria-label="Settings"
            size="md"
            onClick={fetchVideoList}
            >
            搜索
          </Button>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-5 gap-5">
        {videoList?.data.map((item, index) => (
          <Card key={index} component="a" href={`/video/${origin_id}/${item.id}`}>
            <Card.Section>
              <Image radius="md" src={`${item.pic}`}/>
            </Card.Section>
            <Text size="sm" ta="center">
              {item.name}
            </Text>
          </Card>
        ))}
      </div>
      {
        videoList && <Pagination 
        classNames={{root: 'float-end'}} 
        total={videoList?.total} 
        onChange={(value) => {page.current=value; fetchVideoList();}} 
        />
      }
      
    </main>
  )
}