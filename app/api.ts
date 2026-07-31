import axios from "@/axios";
import { createClient } from '@supabase/supabase-js';
import * as http from "@/http";
import { Paginate, Video, VideoOrigin } from "./api.t";
import YNP from "./ynp.api";
import { Database } from "./supabase";


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
export interface YouNongPaiToken {
    id: number;
    name: string;
    token: string;
}

export interface YouNongPaiUser {
    nickName: string;
    userName: string;
    header: string;
    gender: number;
    birthday: number;
    phone: string;
    inviteName: string;
    verifyState: number;
    memberType: number;
    isOfficial: number;
    userId: number;
    referrerId: number;
    wechatNo: string;
    qrcode: string;
    selectPhone: null | string;
    createTime: number;
    unionName: string;
    unionPhone: string;
    areaServName: string;
    areaServPhone: string;
    isSetPayPwd: number; // 0 表示未设置支付密码
}
export interface YouNongPaiDrawInfo {
    balance: number;
    freezeBalance: number;
    totalBalance: number;
    tocUsedBalance: number;
    getCashImg: string;
}
export interface YouNongPaiDrawLog {
    logId: number;
    fromLogId: number;
    des: string;
    userId: number;
    hideLog: number;
    bizId: number;
    bizParam: string;
    amount: number;
    fromUser: number;
    inOutState: number;
    inOutType: number;
    inOutProp: number;
    createTime: number;
    productTime: number;
}
export interface YouNongPaiGrowthInfo {
    growth: number;
    allGrowth: number;
    isSign: number;
}
export interface YouNongPaiGrowthLog {
    growthId: number;
    userId: number;
    growthType: number;
    typeName: string;
    growthProp: number;
    createTime: number;
    dateYmd: string;
    growth: number;
    bizId: number;
    userName: null | string;
    headUrl: null | string;
    phone: null | string;
    growth1: null | number;
    growth2: null | number;
    beginTime: null | number;
    endTime: null | number;
    isSystem: null | number;

}
export interface YouNongPaiTask {
    taskType: string;
    taskName: string;
    taskDes: string;
    isFinish: number;
    finishTimes: number;
    allTimes: number;
    growth: number;
    maxGrowth: number;
}
export interface YouNongPai {
    user: YouNongPaiUser;
    tasks: YouNongPaiTask[],
}

export interface YouNongPaiDraw {
    info: YouNongPaiDrawInfo;
    logs: YouNongPaiDrawLog[];
}
export interface YouNongPaiGrowth {
    info: YouNongPaiGrowthInfo,
    logs: YouNongPaiGrowthLog[],
}
export interface YouNongPaiZhunong {
    info: any,
    logs: any[],
}

export const supabase = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!);

export default {
    searchor: () => http.get<SearchorType[]>('/searchor'),
    note: () => axios.get<NoteCategory[]>('/note'),
    noteContent: (id: number) => axios.get<NoteContent>(`/note/content/${id}`),
    noteContentCreate: (data: Partial<NoteContent>) => axios.post<NoteContent[]>(`/note/content`, data),
    noteContentUpdate: (id: number, data: Partial<NoteContent>) => axios.post<NoteContent[]>(`/note/content/${id}`, data),
    youNongPaiTokens: () => axios.get<YouNongPaiToken[]>('/you_nong_pai/tokens'),
    youNongPai: (token: string) => axios.post<YouNongPai>('/you_nong_pai', { token }),
    youNongPaiDraw: (token: string) => axios.get<YouNongPaiDraw>(`/you_nong_pai/draw?token=${token}`),
    youNongPaiGrowth: (token: string) => axios.get<YouNongPaiGrowth>(`/you_nong_pai/growth?token=${token}`),
    youNongPaiZhunong: (token: string) => axios.get<YouNongPaiZhunong>(`/you_nong_pai/zhunong?token=${token}`),
    youNongPaiTask: (token: string, name: string) => http.post<YouNongPaiTask[]>('/you_nong_pai/task', { token, name }),
    videoOrigin: () => http.get<VideoOrigin[]>('/video/origin'),
    videoOriginDetail: (id: number) => http.get<VideoOrigin>(`/video/origin/${id}`),
    videoList: ({video_name, origin_id, page, size}: {video_name?:string, origin_id?: number, page?: number, size?: number}) => http.get<Paginate<Video[]>>(`/video?video_name=${video_name || ''}&origin_id=${origin_id || ''}&page=${page || ''}&size=${size || ''}`),
    videoDetail: (id: number) => http.get<Video>(`/video/video/${id}`),
    ynp: {
        tokens: () => supabase.from('younongpais').select('*'),
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