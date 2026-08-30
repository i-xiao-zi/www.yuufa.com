"use client";

import React from "react";
import { ActionIcon, Box, Container, Flex, Group, Tree, TreeNodeData } from "@mantine/core";
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from "@tiptap/starter-kit";
import "./page.css";
import api, { NoteCategory } from "@/api";
import { Note } from "@/api/types";
import { IconChevronRight, IconEdit, IconFile, IconFilePlus, IconFolder, IconFolderPlus, IconPointFilled, IconTrash } from "@tabler/icons-react";
import '@mantine/tiptap/styles.css';
export default function Page() {
  const [notes, setNotes] = React.useState<Note.Type[]>([]);
  const [current, setCurrent] = React.useState<Note.Type|null>(null);
  const [content, setContent] = React.useState<Partial<Note.Content>>({});
  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    extensions: [StarterKit.configure({
      undoRedo: false,
      heading: {
        levels: [1,2,3]
      }
    })],
    content: '<p>Subtle rich text editor variant</p>',
    // onUpdate: (props) => {
    //   console.log(props);
    // }
  });

  React.useEffect(() => {
    api.note.list().then(({data}) => setNotes(data??[]));
  }, []);
  React.useEffect(() => {
    if(current && !current.type) {
      api.note.content(current.id).then(({data}) => {
        if(data) {
          setContent(data);
          console.log(data.content);
          editor.commands.setContent(data.content)
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
        <Box component="main" flex="1">
          <Box display={Boolean(content) ? 'block': 'none'} w="100%">
            <RichTextEditor editor={editor}>
              <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Undo />
                  <RichTextEditor.Redo />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Strikethrough />
                  <RichTextEditor.ClearFormatting />
                  <RichTextEditor.Highlight />
                  <RichTextEditor.Code />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H1 />
                  <RichTextEditor.H2 />
                  <RichTextEditor.H3 />
                  <RichTextEditor.H4 />
                  <RichTextEditor.H5 />
                  <RichTextEditor.H6 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Blockquote />
                  <RichTextEditor.Hr />
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                  <RichTextEditor.Subscript />
                  <RichTextEditor.Superscript />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Link />
                  <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.AlignLeft />
                  <RichTextEditor.AlignCenter />
                  <RichTextEditor.AlignJustify />
                  <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>
              <RichTextEditor.Content />
            </RichTextEditor>
          </Box>
          <Box display={Boolean(content) ? 'none': 'block'} w="100%">
            <div className="bg-(--mantine-color-body) w-full h-full top-0 left-0 z-99">
              hello world
            </div>
          </Box>
        </Box>
    </Container>
  );
}