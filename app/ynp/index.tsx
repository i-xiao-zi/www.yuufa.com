"use client";

import React from "react";
import {ActionIcon, Avatar, Box, Button, Card, Container, Flex, Group, Input, List, Menu, Modal, Popover, SegmentedControl, Table, ThemeIcon, Typography, UnstyledButton} from "@mantine/core";
import { IconCircleCheck, IconCircleDashed, IconDotsVertical, IconPlus, IconRestore, IconTrash } from "@tabler/icons-react";
import { Calendar } from "@mantine/dates";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/zh-cn";
import api from "@/api";
import { notifications } from "@mantine/notifications";
import { YNP } from "@/api/types";
dayjs.extend(utc);

export default function Page() {
  const phone = React.useRef<HTMLInputElement>(null);
  const pwd = React.useRef<HTMLInputElement>(null);
  const [addModal, setAddModal] = React.useState<boolean>(false);
  const [accounts, setAccounts] = React.useState<YNP.Account[]>([]);
  const [account, setAccount] = React.useState<YNP.Account>();

  const [user, setUser] = React.useState<YNP.User|undefined>(undefined);
  const [tasks, setTasks] = React.useState<YNP.Task[]>([]);
  const [drawInfo, setDrawInfo] = React.useState<YNP.DrawInfo|undefined>(undefined);
  const [drawLogs, setDrawLogs] = React.useState<YNP.DrawLog[]>([]);
  const [growthInfo, setGrowthInfo] = React.useState<YNP.GrowthInfo|undefined>(undefined);
  const [growthLogs, setGrowthLogs] = React.useState<YNP.GrowthLog[]>([]);
  const [zhunongInfo, setZhunongInfo] = React.useState<YNP.ZhunongInfo|undefined>(undefined);
  const [zhunongLogs, setZhunongLogs] = React.useState<any[]>([]);
  const [couponInfo, setCouponInfo] = React.useState<YNP.CouponInfo|undefined>(undefined);
  const [couponLogs, setCouponLogs] = React.useState<YNP.CouponLog[]>([]);
  const input = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    api.ynp.tokens().then(({data}) => {
      setAccounts((data??[]));
      data?.length && setAccount(data[0]);
    });
  }, []);
  React.useEffect(() => {
    if(account) {
      api.ynp.login(account.phone, account.pwd).then( user => {
        setUser(user);
        api.ynp.tasks(user.accessToken).then(v => setTasks(v??[]));
        api.ynp.drawInfo(user.accessToken).then(setDrawInfo);
        api.ynp.drawLogs(user.accessToken).then(v => setDrawLogs(v??[]));
        api.ynp.growthInfo(user.accessToken).then(setGrowthInfo);
        api.ynp.growthLogs(user.accessToken).then(v => setGrowthLogs(v??[]));
        api.ynp.zhunongInfo(user.accessToken).then(setZhunongInfo);
        api.ynp.zhunongLogs(user.accessToken).then(v => setZhunongLogs(v??[]));
        api.ynp.couponInfo(user.accessToken).then(setCouponInfo);
        api.ynp.couponLogs(user.accessToken).then(v => setCouponLogs(v??[]));
      })
    }
  }, [account?.id]);
  const AddAccount = () => {
    if(phone.current?.value) {
      api.ynp.login(phone.current!.value, pwd.current!.value).then( user => {
        if(user) {
          api.ynp.addAccount(user.nickName, phone.current!.value, pwd.current!.value).then(() => {
            setAddModal(false);
            notifications.show({
              title: '添加账号',
              message: '添加成功',
            });
          });
        } else {
          notifications.show({
            title: '添加账号',
            message: '账号或密码错误',
          });
        }
      });

    }
  }
  const reLogin = () => {
    notifications.show({
      title: '重新登录',
      message: '暂不可用',
    })
  }
  const deleteAccount = () => {
    notifications.show({
      title: '删除账号',
      message: '暂不可删除',
    })
  }
  return (
    <main className="flex-auto z-1">
      <Modal opened={addModal} centered onClose={() => setAddModal(false)} title="添加账号">
        <Input.Wrapper label="账号">
          <Input placeholder="请输入账号" ref={phone} />
        </Input.Wrapper>
        <Input.Wrapper label="密码">
            <Input flex="auto" placeholder="请输入密码" ref={pwd} />
        </Input.Wrapper>
        <Group mt="lg" justify="flex-end">
          <Button onClick={() => setAddModal(false)} size="sm">取消</Button>
          <Button variant="filled" onClick={AddAccount}>添加</Button>
        </Group>
      </Modal>
      <Container className="flex justify-center my-5">
        <SegmentedControl 
          value={account?.id.toString()} 
          data={accounts.map(item =>({label: item.name, value: item.id.toString()}))} 
          onChange={v => setAccount(accounts.find(item => item.id.toString() == v))} 
        />
      </Container>
      <Container size="xl">
        { user && (
          <Box>
            <Flex direction={{base: 'column', md: 'row'}} gap="md">
              <Box className="flex-auto max-md:w-full">
                <Flex my="md" bg="gray" className="items-center rounded-full">
                  <Avatar src={user?.header} size="lg" mr="md" alt={user?.nickName} />
                  <Typography>{user?.nickName}</Typography>
                  <Box className="flex-auto" />
                  <Menu width={200} position="bottom" withArrow shadow="md">
                    <Menu.Target>
                      <UnstyledButton h="100%" p="md"><IconDotsVertical /></UnstyledButton>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item leftSection={<IconPlus />} onClick={() => setAddModal(true)}>添加账号</Menu.Item>
                      <Menu.Item leftSection={<IconRestore />} onClick={reLogin}>重新登录</Menu.Item>
                      <Menu.Item leftSection={<IconTrash />} onClick = {deleteAccount}>删除账号</Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
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
                    <div>{(couponInfo?.allAmount ?? 0) - (couponInfo?.dueAmount ?? 0)}/{couponInfo?.allAmount}</div>
                    <div>惠民券</div>
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
                            task.taskType == 'TASK_SIGN' ? (<Button size="xs" onClick={() => api.ynp.sign(user.accessToken)}>去完成</Button>) : 
                            task.taskType == 'TASK_MALL' ? (<Button size="xs" onClick={() => api.ynp.view(user.accessToken, zhunongInfo?.recommendProducts[Math.floor(Math.random() * zhunongInfo?.recommendProducts.length)].productMainId!)}>去完成</Button>) : 
                            task.taskType == 'TASK_GET_BT' ? (<Button size="xs" onClick={() => api.ynp.draw(user.accessToken)}>去完成</Button>) : 
                            task.taskType == 'TASK_SHARE' ? (<Button size="xs" onClick={() => api.ynp.share(user.accessToken, zhunongInfo?.recommendProducts[Math.floor(Math.random() * zhunongInfo?.recommendProducts.length)].productMainId!)}>去完成</Button>) : 
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
                      const coupon_logs = couponLogs.filter(log => dayjs.unix(log.createTime).isSame(date, 'day')).sort((a, b) => a.createTime - b.createTime);
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
                              {coupon_logs.map((log, index) => (
                                <Table.Tr className="bg-blue-300/10!" key={index}>
                                  <Table.Th>惠民</Table.Th>
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
        ) }
      </Container>
    </main>
  )
}