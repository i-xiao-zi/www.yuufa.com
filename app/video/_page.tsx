import React from "react";
import {Metadata} from "next";
import { ActionIcon, Box, Button, Table, TableTbody, TableTd, TableTh, TableThead, TableTr } from '@mantine/core';
import {IconCircleChevronDownFilled, IconCircleChevronsDownFilled} from "@tabler/icons-react";
import api from "@/api";
import Link from "next/link";
import VideoDownloadAll from "./down_all";


export const metadata: Metadata = {
  title: "影视",
  description: "影视",
};

export default async function VideoPage() {
  const videoOriginins = await api.videoOrigin();
  return (
    <main className="container mx-auto flex-auto z-1">
      <Table highlightOnHover striped>
        <TableThead>
          <TableTr>
            <TableTh>ID</TableTh>
            <TableTh>名称</TableTh>
            <TableTh>标题</TableTh>
            <TableTh>官网</TableTh>
            <TableTh w={'300px'}>URL</TableTh>
            <TableTh w={200}>排序</TableTh>
            <TableTh w={'250px'}>操作</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {videoOriginins.data?.map((item) => (
            <TableTr key={item.id}>
              <TableTd>{item.id}</TableTd>
              <TableTd>{item.name}</TableTd>
              <TableTd><Link href={`/video/${item.id}`}>{item.title}</Link></TableTd>
              <TableTd>{item.home}</TableTd>
              <TableTd>{item.url}</TableTd>
              <TableTd>{item.sort}</TableTd>
              <TableTd className="flex items-center justify-center gap-2">
                <Button color="primary">编辑</Button>
                <VideoDownloadAll item={item} />
                <ActionIcon color="primary"><IconCircleChevronsDownFilled /></ActionIcon>
                <Button color="danger">删除</Button>
              </TableTd>
            </TableTr>
          ))}
        </TableTbody>
      </Table>
    </main>
  )
}