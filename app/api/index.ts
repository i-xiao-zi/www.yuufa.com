import { createClient } from '@supabase/supabase-js';
import * as ynp from "./ynp";
import { Database, Tables, TablesInsert, TablesUpdate } from "./supabase";
import { Searchor, YNP } from "./types";
import Cron from './cron';

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
    list: () => supabase.from('note_types').select('*').order('sort'),
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
    login: (phone: string, pwd: string): Promise<YNP.User> => ynp.login(phone, pwd),
    tokens: () => supabase.from('younongpais').select('*'),
    addAccount: (name: string, phone: string, pwd: string) => supabase.from('younongpais').insert({name, phone, pwd}),
    token: (id: number, token: string) => supabase.from('younongpais').update({token}).eq('id', id),
    user: (token: string) => ynp.userInfo(token),
    tasks: (token: string) => ynp.growthTask(token),
    drawInfo: (token: string) => ynp.findUserBalance(token),
    drawLogs: (token: string) => ynp.findMoneyLogs(token),
    growthInfo: (token: string) => ynp.growthInfo(token),
    growthLogs: (token: string) => ynp.growthLogs(token),
    zhunongInfo: (token: string) => ynp.zhunongInfo(token),
    zhunongLogs: (token: string) => ynp.zhunongLogs(token),
    draw: (token: string) => ynp.startDraw(token),
    view: (token: string, id: number) => ynp.growthViewSign(token, id),
    sign: (token: string) => ynp.growthSignIn(token),
    share: (token: string, id: number) => ynp.growthShareProduct(token, id),
    integral: (token: string) => ynp.integral(token),
    couponInfo: (token: string): Promise<YNP.CouponInfo> => ynp.couponInfo(token),
    couponLogs: (token: string): Promise<YNP.CouponLog[]> => ynp.couponLogs(token),
  },
  cron: {
    list: () => Cron.list(),
    get: (id: number) => Cron.get(id),
    put: () => Cron.put(),
    history: (id: number) => Cron.history(id),
  }
}