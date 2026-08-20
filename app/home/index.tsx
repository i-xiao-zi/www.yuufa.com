"use client";
import React from "react";
import { ActionIcon, CloseButton, Input, Popover, PopoverDropdown, PopoverTarget, SegmentedControl, Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";
import { IconSearch, IconSettings } from "@tabler/icons-react";
import _ from "lodash";
import ContextMenu from "../components/cm";
import { Searchor } from "@/api/types";
import api from "@/api";

export default function Page() {
  const [tabs, setTabs] = React.useState<Searchor.Item[]>([]);
  const [tab, setTab] = React.useState<Searchor.Item>();
  const [segmente, setSegmente] = React.useState<Searchor.Detail>();
  const [value, setValue] = React.useState<string>('');
  const onSearch = () => {
    segmente && window.open(segmente?.value.replace('%s', value), '_blank');
    setValue('');
  }
  React.useEffect(() => {
    api.searchor.list().then(v=>{
      setTabs(v);
      if(v.length > 0) setTab(v[0]);
    });
  }, []);
  React.useEffect(() => {
    setSegmente(tab?.searchors?.[0]);
  }, [tab]);
  return (
    <main className="container mx-auto flex-auto z-1">
      <Tabs
        className="w-3xl mt-5 mx-auto" 
        variant="outline" 
        color="teal"
        value={tab?.name}
        onChange={v => setTab(tabs.find(i => i.name == v))}
      >
        <TabsList>
          {tabs.map(item => <TabsTab key={item.id} value={item.name}>{item.name}</TabsTab>)}
          <ActionIcon className="absolute! right-0" variant="subtle"><IconSettings /></ActionIcon>
        </TabsList>
        {
          tabs.map(item => (
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
                        <img src={`${process.env.NEXT_PUBLIC_BASE_STORAGE}/${segmente?.icon}`} />
                      </ActionIcon>
                    </PopoverTarget>
                    <PopoverDropdown className="p-0!">
                      <SegmentedControl 
                        value={segmente?.name}
                        data={(item.searchors || []).map(searchor => ({
                          value: searchor.name,
                          label: <img key={searchor.id} src={`${process.env.NEXT_PUBLIC_BASE_STORAGE}/${searchor.icon}`} />,
                        }))}
                        onChange={v => setSegmente(_.find(item.searchors || [], {name: v}) || undefined)}
                      />
                    </PopoverDropdown>
                  </Popover>
                }
                rightSection={<>
                    {value &&<CloseButton aria-label="Clear input" onClick={() => setValue('')} /> }
                    <ActionIcon className="self-stretch flex-auto h-[unset]! w-12!" onClick={onSearch}><IconSearch size={25} /></ActionIcon>
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
      <hr />
      <ContextMenu>xxx</ContextMenu>
    </main>
  );
}