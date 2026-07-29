"use client";
import React from "react";
import { Button, Input } from "@mantine/core";
import api, { NoteContent } from "@/api";
import type EditorJS from "@editorjs/editorjs"
import useNoteStore from "@/store/note";
import _ from "lodash";
import { ToolConstructable } from "@editorjs/editorjs";
import Switch from "./switch";

export default function NoteEditor() {
  const [welcome, setWelcome] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [content, setContent] = React.useState<Partial<NoteContent>>({});
  const editorRef = React.useRef<HTMLDivElement | null>(null);
  const editor = React.useRef<EditorJS | null>(null);
  const {id} = useNoteStore();

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
  }, []);
  const onSave = () => {
    setSaving(true);
    api.noteContentUpdate(id!, content).finally(()=>setSaving(false))
  }
  React.useEffect(() => {
    if (id) {
      console.log({id});
      setWelcome(false);
      setLoading(true);
      api.noteContent(id).then(res => {
        setLoading(false);
        setContent(res.data || {});
        editor.current!.render(JSON.parse(res.data?.content || '{}'));
      })
    }
  }, [id]);
  return (
    <main className="flex-auto relative flex flex-col gap-2" ref={editorRef}>
      <Switch value={welcome}>
        <Switch.Case case={true}>
          <div className="absolute bg-(--mantine-color-body) w-full h-full top-0 left-0 z-99">
            hello world
          </div> 
        </Switch.Case>
        <Switch.Case case={false}>
          <div className="flex items-center gap-2 order-first">
            <Input 
              className="flex-auto"
              placeholder="输入标题" 
              value={content.title || ''} 
              onChange={e => setContent({...content, title: e.target.value})} 
            />
            <Button loading={saving} onClick={onSave}>保存</Button>
          </div>
        </Switch.Case>
      </Switch>
    </main>
  );
}
