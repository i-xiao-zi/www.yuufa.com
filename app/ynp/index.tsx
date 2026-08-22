"use client";

import React from "react";
import {Avatar, Box, Button, Card, Container, Flex, Group, Input, List, Popover, SegmentedControl, Table, ThemeIcon, Typography} from "@mantine/core";
import { IconCircleCheck, IconCircleDashed } from "@tabler/icons-react";
import { Calendar } from "@mantine/dates";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/zh-cn";
import api from "@/api";
import { YNP } from "@/api/types";
dayjs.extend(utc);

export default function Page() {
  const [tokens, setTokens] = React.useState<YNP.Token[]>([]);
  const [token, setToken] = React.useState<YNP.Token>();

  const [user, setUser] = React.useState<YNP.User|undefined>(undefined);
  const [tasks, setTasks] = React.useState<YNP.Task[]>([]);
  const [drawInfo, setDrawInfo] = React.useState<YNP.DrawInfo|undefined>(undefined);
  const [drawLogs, setDrawLogs] = React.useState<YNP.DrawLog[]>([]);
  const [growthInfo, setGrowthInfo] = React.useState<YNP.GrowthInfo|undefined>(undefined);
  const [growthLogs, setGrowthLogs] = React.useState<YNP.GrowthLog[]>([]);
  const [zhunongInfo, setZhunongInfo] = React.useState<YNP.ZhunongInfo|undefined>(undefined);
  const [zhunongLogs, setZhunongLogs] = React.useState<any[]>([]);
  const input = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    api.ynp.tokens().then(({data}) => {
      setTokens((data??[]));
      data?.length && setToken(data[0]);
    });
  }, []);
  React.useEffect(() => {
    if(token) {
      api.ynp.user(token.token).then(setUser);
      api.ynp.tasks(token.token).then(v => setTasks(v??[]));
      api.ynp.drawInfo(token.token).then(setDrawInfo);
      api.ynp.drawLogs(token.token).then(v => setDrawLogs(v??[]));
      api.ynp.growthInfo(token.token).then(setGrowthInfo);
      api.ynp.growthLogs(token.token).then(v => setGrowthLogs(v??[]));
      api.ynp.zhunongInfo(token.token).then(setZhunongInfo);
      api.ynp.zhunongLogs(token.token).then(v => setZhunongLogs(v??[]));
    }
  }, [token]);
  return (
    <main className="flex-auto z-1">
      <Container className="flex justify-center my-5">
        <SegmentedControl 
          value={token?.id.toString()} 
          data={tokens.map(item =>({label: item.name, value: item.id.toString()}))} 
          onChange={v => setToken(tokens.find(item => item.id.toString() == v))} 
        />
      </Container>
      <Container size="xl">
        { tokens.map(item => (
          <Box key={item.id} className={`${item.id == token?.id ? '' : 'hidden'}`}>
            <Container className="flex mb-5">
              <Input className="flex-auto" ref={input} defaultValue={token?.token} />
              <Button onClick={_ => api.ynp.token(item.id, input.current?.value!).then(_=>location.reload())} disabled={!input.current?.value}>修改</Button>
            </Container>
            <Flex direction={{base: 'column', md: 'row'}} gap="md">
              <Box className="flex-auto max-md:w-full">
                <Flex my="md" bg="gray" className="items-center rounded-full">
                  <Avatar src={user?.header} size="lg" mr="md" alt={user?.nickName} />
                  <Typography>{user?.nickName}</Typography>
                </Flex>
                <Group m="md" justify="center" grow>
                  <Card className="flex flex-col justify-center items-center">
                    <div>{drawInfo?.balance}/{drawInfo?.totalBalance}</div>
                    <div>补贴</div>
                  </Card>
                  <Card className="flex flex-col items-center">
                    <div>{growthInfo?.growth}/{growthInfo?.allGrowth}</div>
                    <div>成长</div>
                  </Card>
                  <Card className="flex flex-col items-center">
                    <div>{(zhunongInfo?.znPoint ?? 0) - (zhunongInfo?.znUsedPoint ?? 0)}/{zhunongInfo?.znPoint}</div>
                    <div>助农金</div>
                  </Card>
                </Group>
                <List spacing={10} size="lg">
                  {tasks.map(task => (
                    <List.Item 
                      key={task.taskName} 
                      classNames={{
                        itemWrapper: 'w-full',
                        itemLabel: 'w-full flex justify-between items-center'
                      }}
                      icon={(
                        <ThemeIcon color="blue" size={24} radius="xl">
                          {task.isFinish ? <IconCircleCheck  size={16} /> : <IconCircleDashed size={16} />}
                        </ThemeIcon>
                      )}>
                        <div className={`${['VERIFY_PROXY', 'VERIFY_DIRECT', 'VERIFY_COUNTY_SERV', 'ZN_MILK_CONSUME', 'ZN_PRODUCT_CONSUME', 'TASK_INVITE', 'TASK_ZN_HD'].includes(task.taskType) && 'line-through'}`}>
                          <Typography component="span">{task.taskName}</Typography>
                          <Typography component="span" mx="sm">({task.allTimes ? task.finishTimes : task.isFinish}/{task.allTimes ? task.allTimes : 1})</Typography>
                          <Typography component="span" fz="sm" c="gray.6">{task.taskDes}</Typography>
                        </div>
                        <div>
                          {task.isFinish ? (<Button size="xs" disabled>已完成</Button>) : (
                            task.taskType == 'TASK_SIGN' ? (<Button size="xs" onClick={() => api.ynp.sign(item.token)}>去完成</Button>) : 
                            task.taskType == 'TASK_MALL' ? (<Button size="xs" onClick={() => api.ynp.view(item.token, zhunongInfo?.recommendProducts[Math.floor(Math.random() * zhunongInfo?.recommendProducts.length)].productMainId!)}>去完成</Button>) : 
                            task.taskType == 'TASK_GET_BT' ? (<Button size="xs" onClick={() => api.ynp.draw(item.token)}>去完成</Button>) : 
                            task.taskType == 'TASK_SHARE' ? (<Button size="xs" onClick={() => api.ynp.share(item.token, zhunongInfo?.recommendProducts[Math.floor(Math.random() * zhunongInfo?.recommendProducts.length)].productMainId!)}>去完成</Button>) : 
                            null
                          )}
                        </div>
                    </List.Item>
                  ))}
                </List>
              </Box>
              <Flex className="w-130 max-md:w-full max-md:mx-auto" justify="center">
                  <Calendar
                    fullWidth
                    locale='zh-cn'
                    getDayProps={(date) => {
                      const today = dayjs().isSame(date, 'day') ? 'bg-red-300/10!' : '';
                      const draw_log = drawLogs.find(log => dayjs.unix(log.createTime).isSame(date, 'day'));
                      const draw_day = draw_log ? 'relative before:content-["*"] before:absolute before:block before:w-full before:h-full before:-z-1': '';
                      return {
                        className: `${today} ${draw_day} bg-blue-100/20!`
                      }
                    }}
                    renderDay={(date) => {
                      const day = dayjs(date).date();
                      const draw_logs = drawLogs.filter(log => dayjs.unix(log.createTime).isSame(date, 'day')).sort((a, b) => a.createTime - b.createTime);
                      const growth_logs = growthLogs.filter(log => dayjs.unix(log.createTime).isSame(date, 'day')).sort((a, b) => a.createTime - b.createTime);
                      const zhunong_logs = zhunongLogs.filter(log => dayjs.unix(log.createTime).isSame(date, 'day')).sort((a, b) => a.createTime - b.createTime);
                      return draw_logs.length + growth_logs.length + zhunong_logs.length === 0 
                      ? (<div className="w-full h-full flex items-center justify-center">{day}</div>)
                      : (<Popover width={400} trapFocus withArrow shadow="md">
                        <Popover.Target>
                          <div className="w-full h-full flex items-center justify-center">{day}</div>
                        </Popover.Target>
                        <Popover.Dropdown>
                          <Table>
                            <Table.Tbody>
                              {draw_logs.map((log, index) => (
                                <Table.Tr className="bg-red-300/10!" key={index}>
                                  <Table.Th>补贴</Table.Th>
                                  <Table.Td>{log.des}</Table.Td>
                                  <Table.Td>{log.amount}</Table.Td>
                                  <Table.Td>{dayjs.unix(log.createTime).format('HH:mm')}</Table.Td>
                                </Table.Tr>
                              ))}
                              {growth_logs.map((log, index) => (
                                <Table.Tr className="bg-blue-300/10!" key={index}>
                                  <Table.Th>成长</Table.Th>
                                  <Table.Td>{log.typeName}</Table.Td>
                                  <Table.Td>{log.growth}</Table.Td>
                                  <Table.Td>{dayjs.unix(log.createTime).format('HH:mm')}</Table.Td>
                                </Table.Tr>
                              ))}
                              {zhunong_logs.map((log, index) => (
                                <Table.Tr className="bg-blue-300/10!" key={index}>
                                  <Table.Th>助农</Table.Th>
                                  <Table.Td>{log.des}</Table.Td>
                                  <Table.Td>{log.amount}</Table.Td>
                                  <Table.Td>{dayjs.unix(log.createTime).format('HH:mm')}</Table.Td>
                                </Table.Tr>
                              ))}
                            </Table.Tbody>
                          </Table>
                        </Popover.Dropdown>
                      </Popover>)
                    }}/>
              </Flex>
            </Flex>
          </Box>
        ) ) }
      </Container>
    </main>
  )
}