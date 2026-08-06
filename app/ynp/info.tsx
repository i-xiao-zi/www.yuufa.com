"use client";

import React, {HTMLAttributes} from "react";
import {Avatar, Button, Input, List, Popover, SegmentedControlItem, Table, ThemeIcon} from "@mantine/core";
import api from "@/api";
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
import {Calendar} from "@mantine/dates";
import _ from 'lodash';
import { IconCircleCheck, IconCircleDashed } from "@tabler/icons-react";
import Switch from "@/components/switch";
import YNP from "@/ynp.api";

interface Props extends HTMLAttributes<HTMLDivElement>{
  token: SegmentedControlItem;
  active?: boolean;
}

export default function YouNongPaiInfo(props: Props) {
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
    api.ynp.user(props.token.value).then(setUser);
    api.ynp.tasks(props.token.value).then(v => setTasks(v??[]));
    api.ynp.drawInfo(props.token.value).then(setDrawInfo);
    api.ynp.drawLogs(props.token.value).then(v => setDrawLogs(v??[]));
    api.ynp.growthInfo(props.token.value).then(setGrowthInfo);
    api.ynp.growthLogs(props.token.value).then(v => setGrowthLogs(v??[]));
    api.ynp.zhunongInfo(props.token.value).then(setZhunongInfo);
    api.ynp.zhunongLogs(props.token.value).then(v => setZhunongLogs(v??[]));
  }, [props.token]);
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.token.value = e.target.value;
  }
  return (
    <div className={`${props.className || ''} ${props.active ? '' : 'hidden'}`}>
      <div className="flex mb-5">
        <Input className="flex-auto" ref={input} defaultValue={props.token.value} onChange={change} />
        <Button onClick={_ => api.ynp.token(1, input.current?.value!).then(_=>location.reload())} disabled={!input.current?.value}>修改</Button>
      </div>
      <div className="flex max-md:flex-col">
        <div className="w-[600] max-md:w-full">
          <div className="w-full flex items-center">
            <Avatar src={user?.header} size="lg" alt={user?.nickName} />
            <span>{user?.nickName}</span>
            <span>{drawInfo?.balance}/{drawInfo?.totalBalance}</span>
          </div>
          <div className="flex content-between">
            <div className="w-full flex flex-col justify-center items-center">
              <div>{drawInfo?.balance}/{drawInfo?.totalBalance}</div>
              <div>已用补贴</div>
            </div>
            <div className="w-full flex flex-col items-center">
              <div>{growthInfo?.growth}/{growthInfo?.allGrowth}</div>
              <div>成长</div>
            </div>
            <div className="w-full flex flex-col items-center">
              <div>{(zhunongInfo?.znPoint ?? 0) - (zhunongInfo?.znUsedPoint ?? 0)}/{zhunongInfo?.znPoint}</div>
              <div>助农金</div>
            </div>
          </div>
          <List spacing={10} size="lg">
            {tasks.map(task => (<List.Item 
              key={task.taskName} 
              classNames={{
                itemWrapper: 'w-full',
                itemLabel: 'w-full flex justify-between items-center'
              }}
              icon={
                <ThemeIcon color="blue" size={24} radius="xl">
                  {task.isFinish ? <IconCircleCheck  size={16} /> : <IconCircleDashed size={16} />}
                </ThemeIcon>
              }>
                <Switch value={task.taskType}>
                  <Switch.Case case='VERIFY_USER_REGISTER'>
                    <div>
                      <span>{task.taskName}</span>
                      <span className="text-sm text-gray-500">{task.taskDes}</span>
                    </div>
                    <div><Button size="xs" disabled>已完成</Button></div>
                  </Switch.Case>
                  <Switch.Case case='VERIFY_PROXY'>
                    <div className="line-through">
                      <span>{task.taskName}</span>
                      <span className="text-sm text-gray-500">{task.taskDes}</span>
                    </div>
                    <div></div>
                  </Switch.Case>
                  <Switch.Case case='VERIFY_DIRECT'>
                    <div className="line-through">
                      <span>{task.taskName}</span>
                      <span className="text-sm text-gray-500">{task.taskDes}</span>
                    </div>
                    <div></div>
                  </Switch.Case>
                  <Switch.Case case='VERIFY_COUNTY_SERV'>
                    <div className="line-through">
                      <span>{task.taskName}</span>
                      <span className="text-sm text-gray-500">{task.taskDes}</span>
                    </div>
                    <div></div>
                  </Switch.Case>
                  <Switch.Case case='ZN_MILK_CONSUME'>
                    <div className="line-through">
                      <span>{task.taskName}</span>
                      <span className="text-sm text-gray-500">{task.taskDes}</span>
                    </div>
                    <div></div>
                  </Switch.Case>
                  <Switch.Case case='ZN_PRODUCT_CONSUME'>
                    <div className="line-through">
                      <span>{task.taskName}</span>
                      <span className="text-sm text-gray-500">{task.taskDes}</span>
                    </div>
                    <div></div>
                  </Switch.Case>
                  <Switch.Case case='TASK_SIGN'>
                    <>
                      <div>
                        <span>{task.taskName} ({growthInfo?.isSign}/1)</span>
                        <span className="text-sm text-gray-500">{task.taskDes}</span>
                      </div>
                      <div>
                        <Button size="xs" disabled={!!growthInfo?.isSign}  onClick={() => api.ynp.sign(props.token.value)}>{!!growthInfo?.isSign ? '已完成' : '去完成'}</Button>
                      </div>
                    </>
                  </Switch.Case>
                  <Switch.Case case='TASK_MALL'>
                    <>
                      <div>
                        <span>{task.taskName} ({task.finishTimes}/{task.allTimes})</span>
                        <span className="text-sm text-gray-500">{task.taskDes}</span>
                      </div>
                      <div>
                        <Button size="xs" disabled={!!task.isFinish} onClick={() => api.ynp.view(props.token.value, zhunongInfo?.recommendProducts[Math.floor(Math.random() * zhunongInfo?.recommendProducts.length)].productMainId!)}>{!!task.isFinish ? '已完成' : '去完成'}</Button>
                      </div>
                    </>
                  </Switch.Case>
                  <Switch.Case case='TASK_GET_BT'>
                    <>
                      <div>
                        <span>{task.taskName} ({task.isFinish}/1)</span>
                        <span className="text-sm text-gray-500">{task.taskDes}</span>
                      </div>
                      <div>
                        <Button size="xs" disabled={!!task.isFinish}  onClick={() => api.ynp.draw(props.token.value)}>{!!task.isFinish ? '已完成' : '去完成'}</Button>
                      </div>
                    </>
                  </Switch.Case>
                  <Switch.Case case='TASK_SHARE'>
                    <>
                      <div>
                        <span>{task.taskName} ({task.finishTimes}/{task.allTimes})</span>
                        <span className="text-sm text-gray-500">{task.taskDes}</span>
                      </div>
                      <div>
                        <Button size="xs" disabled={!!task.isFinish}  onClick={() => api.ynp.share(props.token.value, zhunongInfo?.recommendProducts[Math.floor(Math.random() * zhunongInfo?.recommendProducts.length)].productMainId!)}>{!!task.isFinish ? '已完成' : '去完成'}</Button>
                      </div>
                    </>
                  </Switch.Case>
                  <Switch.Case case='TASK_INVITE'>
                    <div className="line-through">
                      <span>{task.taskName} ({task.finishTimes}/{task.allTimes})</span>
                      <span className="text-sm text-gray-500">{task.taskDes}</span>
                    </div>
                    <div></div>
                  </Switch.Case>
                  <Switch.Case case='TASK_ZN_HD'>
                    <div className="line-through">
                      <span>{task.taskName}</span>
                      <span className="text-sm text-gray-500">{task.taskDes}</span>
                    </div>
                    <div></div>
                  </Switch.Case>
                </Switch>
            </List.Item>))}
          </List>
        </div>
        <div className="flex-auto max-md:w-full">
          <Calendar
            size="xl"
            locale={'zh-CN'}
            getDayProps={(date) => {
              const today = dayjs().isSame(date, 'day') ? 'bg-red-300/10!' : '';
              const draw_log = _.find(drawLogs, log => dayjs.unix(log.createTime).isSame(date, 'day'));

              const draw_day = draw_log ? 'relative before:content-["*"] before:absolute before:block before:w-full before:h-full before:-z-1': '';
              return {
                className: `${today} ${draw_day} bg-blue-100/20!`
              }

            }}
            renderDay={(date) => {
              const day = dayjs(date).date();
              const draw_logs = drawLogs.filter(log => dayjs.unix(log.createTime).isSame(date, 'day')).sort((a, b) => a.createTime - b.createTime);
              const growth_logs = growthLogs.filter(log => dayjs.unix(log.createTime).isSame(date, 'day')).sort((a, b) => a.createTime - b.createTime);
              return draw_logs.length + growth_logs.length === 0 
              ? (<div className="w-full h-full flex items-center justify-center">{day}</div>)
              : (<Popover width={400} trapFocus withArrow shadow="md">
                <Popover.Target>
                  <div className="w-full h-full flex items-center justify-center">{day}</div>
                </Popover.Target>
                <Popover.Dropdown>
                  <Table>
                    <Table.Tbody>
                      {draw_logs.map((log, index) => <Table.Tr className="bg-red-300/10!" key={index}>
                        <Table.Th>补贴</Table.Th>
                        <Table.Td>{log.des}</Table.Td>
                        <Table.Td>{log.amount}</Table.Td>
                        <Table.Td>{dayjs.unix(log.createTime).format('HH:mm')}</Table.Td>
                      </Table.Tr>)}
                      {growth_logs.map((log, index) => <Table.Tr className="bg-blue-300/10!" key={index}>
                        <Table.Th>成长</Table.Th>
                        <Table.Td>{log.typeName}</Table.Td>
                        <Table.Td>{log.growth}</Table.Td>
                        <Table.Td>{dayjs.unix(log.createTime).format('HH:mm')}</Table.Td>
                      </Table.Tr>)}
                    </Table.Tbody>
                  </Table>
                </Popover.Dropdown>
              </Popover>)
            }}/>
        </div>
      </div>
      
    </div>
  );
}