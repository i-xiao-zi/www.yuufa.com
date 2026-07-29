"use client";
import React from "react";
import {Metadata} from "next";
import { ActionIcon, Button, Modal, Table, TableTbody, TableTd, TableTh, TableThead, TableTr } from '@mantine/core';
import {IconCircleChevronDownFilled, IconCircleChevronsDownFilled} from "@tabler/icons-react";
import { fetchEventSource } from '@microsoft/fetch-event-source';
import api from "@/api";
import Link from "next/link";
import { useDisclosure, useToggle } from "@mantine/hooks";
import config from "@/config";
import { VideoOrigin } from "@/api.t";


export default function VideoDownloadAll({item}: {item: VideoOrigin}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [running, setRunning] = React.useState<boolean>(false);
  const handleClick = () => {
    setRunning(true);
    const eventSource = new EventSource(`${config.base_api}/video/fetch/${item.id}`);
    eventSource.onopen = (event) => {
    }
    eventSource.onmessage = (event) => {
    }
    eventSource.addEventListener = (event) => {
    }
    eventSource.onerror = (event) => {
      setRunning(false);
    }
      
  }
  return (
    <>
      <ActionIcon color="primary"classNames={{
        root: running ? "relative rounded-full after:content-[''] after:absolute after:block after:w-full after:h-full after:animate-spin after:border-l-2 after:border-red-400 after:rounded-full" : "",
      }} onClick={open}>
        <IconCircleChevronDownFilled />
      </ActionIcon>
      <Modal 
        opened={opened} 
        onClose={close} 
        title={item.title}
        centered>
        {
            running
            ? (
                <Table>

                </Table>
            )
            : (
                <Button color="primary" onClick={handleClick}>下载所有</Button>
            )
        }
        
      </Modal>   
    </>
  )
}