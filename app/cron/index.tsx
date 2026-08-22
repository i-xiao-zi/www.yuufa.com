"use client";

import React from "react";
import {Button, Container, Modal, Table, DataList } from "@mantine/core";
import dayjs from "dayjs";
import api from "@/api";
import Cron from "@/api/cron";

const parseStatus = (status: number) => {
  switch(status) {
    case 0: return '未知/尚未执行'
    case 1: return '执行成功'
    case 2: return '执行失败（DNS错误）'
    case 3: return '执行失败（无法连接主机）'
    case 4: return '执行失败（HTTP 错误）'
    case 5: return '执行失败（暂停）'
    case 6: return '执行失败（响应数据过多）'
    case 7: return '执行失败（无效URL）'
    case 8: return '执行失败（内部错误）'
    case 9: return '执行失败（原因不明）'
  }
}

export default function Page() {
  const [jobs, setJobs] = React.useState<Cron.Job[]>([]);
  const [history, setHistory] = React.useState<number|null>(null);
  const [historys, setHistories] = React.useState<{history: Cron.HistoryItem[], predictions: number[]}|null>(null);
  const [detail, setDetail] = React.useState<Cron.Job|null>(null);

  React.useEffect(() => {
    api.cron.list().then(v => {
      console.log(v);
      setJobs(v.jobs);
    });
  }, []);
  React.useEffect(() => {
    if (history) {
      setHistories(null);
      api.cron.history(history).then(setHistories);
    }
  }, [history]);
  
  return (
    <main className="flex-auto">
      <Modal size="lg"
        opened={Boolean(history && historys)}
        onClose={() => setHistory(null)}
        title={`运行历史 - ${jobs.find(j => j.jobId == history)?.title}`}
      >
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th w="150">计划时间</Table.Th>
              <Table.Th w="150">执行时间</Table.Th>
              <Table.Th w="100">执行时长</Table.Th>
              <Table.Th w="100">状态</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {historys?.predictions.map((item, key) => (
              <Table.Tr key={key} className="odd:bg-amber-500">
                <Table.Td>{dayjs.unix(item).format('YYYY-MM-DD HH:mm:ss')}</Table.Td>
                <Table.Td> - </Table.Td>
                <Table.Td> - </Table.Td>
                <Table.Td>待定</Table.Td>
              </Table.Tr>
            ))}
            {historys?.history.map(item => (
              <Table.Tr key={item.identifier} className="odd:bg-amber-500">
                <Table.Td>{ item.datePlanned && dayjs.unix(item.datePlanned).format('YYYY-MM-DD HH:mm:ss') }</Table.Td>
                <Table.Td>{ item.date && dayjs.unix(item.date).format('YYYY-MM-DD HH:mm:ss') }</Table.Td>
                <Table.Td>{ item.duration/1000 }</Table.Td>
                <Table.Td>{ parseStatus(item.status) }</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Modal>
      <Modal size="lg"
        opened={Boolean(detail)}
        onClose={() => setDetail(null)}
        title={`任务详情 - ${detail?.title}`}
      >
        <DataList withDivider>
          <DataList.Item>
            <DataList.ItemLabel>标题</DataList.ItemLabel>
            <DataList.ItemValue>{detail?.title}</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>网址</DataList.ItemLabel>
            <DataList.ItemValue>{detail?.url}</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>Role</DataList.ItemLabel>
            <DataList.ItemValue>Software Engineer</DataList.ItemValue>
          </DataList.Item>
        </DataList>
      </Modal>
      <Container size="xl">
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>名称</Table.Th>
              <Table.Th>网址</Table.Th>
              <Table.Th>上次执行时间</Table.Th>
              <Table.Th>下次执行时间</Table.Th>
              <Table.Th>操作</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {jobs.map(job => (
              <Table.Tr key={job.jobId} className="odd:bg-amber-500">
                <Table.Td>{job.title}</Table.Td>
                <Table.Td>{job.url}</Table.Td>
                <Table.Td>{ job.lastExecution && dayjs.unix(job.lastExecution).format('YYYY-MM-DD HH:mm:ss')}</Table.Td>
                <Table.Td>{ job.nextExecution && dayjs.unix(job.nextExecution).format('YYYY-MM-DD HH:mm:ss')}</Table.Td>
                <Table.Td>
                  <Button size="xs" onClick={() => setDetail(job)}>详情</Button>
                  <Button size="xs">编辑</Button>
                  <Button size="xs" onClick={() => setHistory(job.jobId)}>历史</Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Container>
    </main>
  )
}