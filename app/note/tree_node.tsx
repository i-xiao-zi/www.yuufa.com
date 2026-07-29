"use client";
import React from "react";
import {Flex, Group, Menu, RenderTreeNodePayload, Tree, TreeNodeData} from "@mantine/core";
import { IconChevronDown, IconChevronRight, IconFile, IconFolder, IconPointFilled } from '@tabler/icons-react';
import useNoteStore from "@/store/note";
import Switch from "@/components/switch";
import { useContextMenu } from 'mantine-contextmenu';
import ContextMenu from "../components/cm";


export default function TreeNode(payload: RenderTreeNodePayload){
  const { node,level, expanded, hasChildren, elementProps } = payload;
  const {className, style, onClick, ...props} = elementProps;
  const {id, setId} = useNoteStore();
  const {showContextMenu} = useContextMenu();
  const isDir = node.nodeProps?.parent_id > -1;
  const clicked = (e: React.MouseEvent) => {
    onClick(e);
    !isDir && setId(node.nodeProps?.id || -1);
  }
  const contexted = (e: React.MouseEvent) => {
    e.preventDefault();
    showContextMenu([
      {
        key: 'copy',
        title: 'Copy to clipboard',
        onClick: () => console.log('xxxxxxxxxxxxxxxxxxx'),
      },
      {
        key: 'download',
        title: 'Download to your device',
        onClick: () => console.log('xxxxxxxxxxxxxxxxxxx'),
      },
    ]);
  }
  return (
      <Group 
        {...props} 
        gap={0} 
        className={`${className} hover:bg-(--mantine-color-placeholder) ${!isDir && id == node.nodeProps?.id ? 'bg-(--mantine-color-placeholder)' : ''} ps-0!`} 
        style={style} 
        onClick={clicked}
      >
        <div className="arrow">
        {
          Array.from({length: level-1}).map((_, i) => <span key={i} />)
        }
        </div>
        
        <Switch value={hasChildren}>
          <Switch.Case case={true}>
            <IconChevronRight className={`size-[1em] inline ${expanded ? 'rotate-90' : 'rotate-0'}`} />
          </Switch.Case>
          <Switch.Case case={false}>
            <IconPointFilled className={`size-[1em] inline opacity-30`} />
          </Switch.Case>
        </Switch>
        <Switch value={isDir}>
          <Switch.Case case={true}><IconFolder className={`size-[1em] inline`} /></Switch.Case>
          <Switch.Case case={false}><IconFile className={`size-[1em] inline`} /></Switch.Case>
        </Switch>
        <ContextMenu>{node.label}</ContextMenu>
      </Group>
  )
}
