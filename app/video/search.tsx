"use client";
import React from "react";
import { Button, Input } from '@mantine/core';
import { IconSearch } from "@tabler/icons-react";
import useVideoStore from "@/store/video";

export default function VideoSearch() {
  const {setSearch} = useVideoStore();
  const search = React.useRef('');
  return (
    <div className="flex mx-auto">
      <Input
        className="self-1 w-full"
        radius={'var(--mantine-radius-default) 0 0 var(--mantine-radius-default)'}
        placeholder="请输入……"
        leftSection={<IconSearch/>}
        onChange={e => search.current = e.target.value}
      />
      <Button
        radius={'0 var(--mantine-radius-default) var(--mantine-radius-default) 0'}
        classNames={{root: 'rounded-l-0 border-l-0'}}
        variant="filled"
        onClick={() => setSearch(search.current)}
      >搜索</Button>
    </div>
  )
}