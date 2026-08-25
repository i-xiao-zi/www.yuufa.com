"use client";

import React from "react";
import { ActionIcon, Box, Container, Flex, Group, Tree, TreeNodeData } from "@mantine/core";
import type EditorJS from "@editorjs/editorjs"
import "./page.css";
import api, { NoteCategory } from "@/api";
import { Note } from "@/api/types";
import { OutputData, ToolConstructable } from "@editorjs/editorjs";
import { IconChevronRight, IconEdit, IconFile, IconFilePlus, IconFolder, IconFolderPlus, IconPointFilled, IconTrash } from "@tabler/icons-react";

export default function Page() {
  const [notes, setNotes] = React.useState<Note.Type[]>([]);
  const [current, setCurrent] = React.useState<Note.Type|null>(null);
  const editorRef = React.useRef<HTMLDivElement | null>(null);
  const editor = React.useRef<EditorJS | null>(null);
  const [content, setContent] = React.useState<Partial<Note.Content>>({});


  const init = async () => {
    if (!editorRef.current) return;
    const EditorJS = (await import('@editorjs/editorjs')).default;
    editor.current = new EditorJS({
      placeholder: '开始输入...',
      holder: editorRef.current,
      onChange: async (api) => {
        const data = await api.saver.save();
        setContent(prev => ({...prev, content: JSON.stringify(data)}))
      },
      tools: {
        paragraph: (await import('@editorjs/paragraph')).default as ToolConstructable,
        header: (await import('@editorjs/header')).default as unknown as ToolConstructable,
        quote: (await import('@editorjs/quote')).default,
        warning: (await import('@editorjs/warning')).default,
        delimiter: (await import('@editorjs/delimiter')).default,
        list: (await import('@editorjs/list')).default,
        checkList: (await import('@editorjs/checklist')).default,
        table: (await import('@editorjs/table')).default,
        code: (await import('@editorjs/code')).default,
        raw: (await import('@editorjs/raw')).default,
        marker: (await import('@editorjs/marker')).default,
        underline: (await import('@editorjs/underline')).default,
        textVariantTune: (await import('@editorjs/text-variant-tune')).default,
        link: {
          class: (await import('@editorjs/link-autocomplete')).default,
          config: {
            endpoint: 'http://localhost:3000/',
            queryParam: 'search'
          }
        },
        image: {
          class: (await import('@editorjs/image')).default,
          config: {
            endpoints: {
              byFile: '/api/upload',
              byUrl: '/api/upload'
            }
          }
        }
      }
    });
  }
  React.useEffect(() => {
    init();
    api.note.list().then(({data}) => setNotes(data??[]));
  }, []);
  React.useEffect(() => {
    if(current && !current.type) {
      api.note.content(current.id).then(({data}) => {
        if(data) {
          setContent(data);
          console.log(data.content);
          editor.current?.render(JSON.parse('{"time":1770440089954,"blocks":[{"id":"N1CwEeUT_I","type":"paragraph","data":{"text":"123456"}}],"version":"2.31.1"}') as unknown as OutputData);
          setContent(data);
        }
      });
    }
  }, [current]);
  const parseTree = (parent_id:number = 0): TreeNodeData[] => notes.filter(i => i.parent_id == parent_id).map(item => ({
    label: item.name,
    value: item.name,
    nodeProps: item,
    children: parseTree(item.id)
  }));
  // const parseTree = () => [];
  return (
    <Container size="xl" className="flex-auto flex">
        <Box component="aside" w={"300"}>
          <Tree
            data={parseTree()}
            levelOffset={23}
            renderNode={ ({ node,level, expanded, hasChildren, elementProps }) => {
              const note = node.nodeProps as Note.Type;
              const {className, style, onClick, ...props} = elementProps;
              return (
                <Group {...props} gap={0} 
                  className={`${className} hover:bg-(--mantine-color-placeholder) ${!note.type ? 'bg-(--mantine-color-placeholder)' : ''} ps-0!`} 
                  style={style}
                >
                  <Box className="flex-auto flex items-center" onClick={e => {onClick(e); !note.type && setCurrent(note)}}>
                    <div className="arrow">
                      { Array.from({length: level-1}).map((_, i) => <span key={i} />) }
                    </div>
                    {hasChildren ? (
                      <IconChevronRight className={`size-[1em] inline ${expanded ? 'rotate-90' : 'rotate-0'}`} />
                    ) : (
                      <IconPointFilled className={`size-[1em] inline opacity-30`} />
                    )}
                    {note.type ? (
                      <IconFolder className={`size-[1em] inline`} />
                    ) : (
                      <IconFile className={`size-[1em] inline`} />
                      )}
                    {node.label}
                  </Box>
                  <Box className="controlls hidden">
                    <ActionIcon onClick={(e) => {
                      e.preventDefault;
                    }}><IconEdit/></ActionIcon>
                    <IconTrash/>
                    <IconFolderPlus/>
                    <IconFilePlus/>
                  </Box>
                </Group>
              )
            } }
            />
        </Box>
        <Box component="main" w="500" flex="1">
          <Box display={Boolean(content) ? 'block': 'hidden'} w="100%" ref={editorRef} />
          <Box display={Boolean(content) ? 'hidden': 'block'} w="100%">
            <div className="bg-(--mantine-color-body) w-full h-full top-0 left-0 z-99">
              hello world
            </div> 
          </Box>
        </Box>
    </Container>
  );
}