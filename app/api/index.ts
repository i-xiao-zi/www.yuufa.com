import { createClient } from '@supabase/supabase-js';
import YNP from "./ynp";
import { Database, Tables, TablesInsert, TablesUpdate } from "./supabase";
import { Searchor } from "./types";


export interface Searchor {
    id: number;
    name: string;
    value: string;
    icon: string;
    sort: number;
}
export interface SearchorType {
    id: number;
    name: string;
    sort: number;
    searchors?: Searchor[];
}
export interface NoteContent {
    id: number;
    category_id: number;
    title: string;
    content: string;
    sort: number;
}
export interface NoteCategory {
    id: number;
    parent_id: number;
    name: string;
    sort: number;
    children?: NoteCategory[];
    contents?: NoteContent[];
}

export interface Paginate<T=any> {
    data: T;
    page: number;
    count: number;
    total: number;
    size: number;
}

export const supabase = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!);

export default {
  searchor: {
    list: async () => {
      let lists: Searchor.Item[] = [];
      const searchor_types = (await supabase.from('searchor_types').select('*').order('sort')).data ?? [];
      for (const searchor_type of searchor_types) {
        lists.push({
          ...searchor_type, 
          searchors: (await supabase.from('searchors').select('*').eq('type', searchor_type.id).order('sort')).data ?? [],
        });
      }
      return lists;
    },
  },
  note: {
    list: () => supabase.from('note_categories').select('*').order('sort'),
    content: (id: number) => supabase.from('note_contents').select('*').eq('id', id).maybeSingle(),
    contentCreate: (data: TablesInsert<'note_contents'>) => supabase.from('note_contents').insert(data),
    contentUpdate: (id: number, data: TablesUpdate<'note_contents'>) => supabase.from('note_contents').update(data).eq('id', id),
  },
  video: {
    origin_list: () => supabase.from('video_origins').select('*').order('id'),
    origin_info: (id: number) => supabase.from('video_origins').select('*').eq('id', id).maybeSingle(),
    origin_active: () => supabase.from('video_origins').select('*').eq('active', true).maybeSingle(),
    list: async ({search, size = 10, page = 1}: {search?: string, size?: number, page?: number}) => {
      let query = supabase.from('videos').select('*', {count: 'exact'});
      if (search) {
        query = query.like('name', `%${search}%`);
      }
      const data = await query.range(size*(page-1), size*page - 1);
      return {
        page: page,
        total: Math.ceil((data.count ?? 0)/size),
        count: data.count ?? 0,
        data: data.data ?? [],
        size: size
      };
    },
    info: (video_id: number) => supabase.from('videos').select('*').eq('id', video_id).maybeSingle(),
  },
  ynp: {
    tokens: () => supabase.from('younongpais').select('*'),
    token: (id: number, token: string) => supabase.from('younongpais').update({token}).eq('id', id),
    user: (token: string) => YNP.userInfo(token),
    tasks: (token: string) => YNP.growthTask(token),
    drawInfo: (token: string) => YNP.findUserBalance(token),
    drawLogs: (token: string) => YNP.findMoneyLogs(token),
    growthInfo: (token: string) => YNP.growthInfo(token),
    growthLogs: (token: string) => YNP.growthLogs(token),
    zhunongInfo: (token: string) => YNP.zhunongInfo(token),
    zhunongLogs: (token: string) => YNP.zhunongLogs(token),
    draw: (token: string) => YNP.startDraw(token),
    view: (token: string, id: number) => YNP.growthViewSign(token, id),
    sign: (token: string) => YNP.growthSignIn(token),
    share: (token: string, id: number) => YNP.growthShareProduct(token, id),
  }
}