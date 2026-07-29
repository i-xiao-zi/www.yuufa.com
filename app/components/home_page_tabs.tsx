"use client";
import React from "react";
import {Tabs, TabsList, TabsTab, TabsPanel, Input, CloseButton, Popover, PopoverTarget, PopoverDropdown, Button, UnstyledButton, SegmentedControl, ActionIcon} from "@mantine/core";
import {IconSearch, IconSettings} from "@tabler/icons-react";
import api, { Searchor, SearchorType } from "@/api";
import config from "@/config";
import _ from "lodash";


export default function HomePageTabs(props: {tabs: SearchorType[]}) {
  const [tab, setTab] = React.useState<SearchorType|undefined>(props.tabs[0]);
  const [segmente, setSegmente] = React.useState<Searchor|undefined>(props.tabs[0]?.searchors?.[0]);
  const [value, setValue] = React.useState<string>('');
  const onSearch = () => {
    segmente && window.open(segmente?.value.replace('%s', value), '_blank');
    setValue('');
  }
  return (
    <Tabs 
      className="w-3xl mt-5 mx-auto" 
      variant="outline" 
      color="teal" 
      value={tab?.name}
      onChange={v => v && setTab(_.find(props.tabs, {name: v}))}
    >
        <TabsList>
          {props.tabs.map(item => <TabsTab key={item.id} value={item.name}>{item.name}</TabsTab>)}
          <ActionIcon className="absolute! right-0" variant="subtle"><IconSettings /></ActionIcon>
        </TabsList>
        {
          props.tabs.map(item => (
            <TabsPanel className="border border-t-0 p-0! border-(--tab-border-color)" key={item.id} value={item.name} pt="xs">
              <Input
              classNames={{
                input: '!border-none pl-3',
                section: '!border-none',
              }}
                size="lg"
                value={value}
                className="border-0"
                placeholder="Your email"
                leftSectionPointerEvents={"all"}
                rightSectionWidth={80}
                rightSectionPointerEvents={"all"}
                onChange={e => setValue(e.target.value)}
                leftSection={
                  <Popover position="bottom-end" withArrow shadow="md">
                    <PopoverTarget>
                      <ActionIcon className="self-stretch flex-auto h-[unset]! active:transform-none!">
                        <img src={`${config.base_storage}/${segmente?.icon}`} />
                      </ActionIcon>
                    </PopoverTarget>
                    <PopoverDropdown className="p-0!">
                      <SegmentedControl 
                        value={segmente?.name}
                        data={(item.searchors || []).map(searchor => ({
                          value: searchor.name,
                          label: <img key={searchor.id} src={`${config.base_storage}/${searchor.icon}`} />,
                        }))}
                        onChange={v => setSegmente(_.find(item.searchors || [], {name: v}) || undefined)}
                      />
                    </PopoverDropdown>
                  </Popover>
                }
                rightSection={<>
                    {value &&<CloseButton aria-label="Clear input" onClick={() => setValue('')} /> }
                    <ActionIcon className="self-stretch flex-auto h-[unset]! w-[48px]!" onClick={onSearch}><IconSearch size={25} /></ActionIcon>
                </>}
                />
            </TabsPanel>
          ))
        }
        <TabsPanel className="border border-t-0 border-(--tab-border-color)" value="account" pt="xs">
          Second tab color is blue, it gets this value from props, props have the priority and will
          override context value
        </TabsPanel>
      </Tabs>
  );
}
