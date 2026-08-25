import type { Tables } from "./supabase";

export interface Paginate<T=any> {
    data: T;
    page: number;
    count: number;
    total: number;
    size: number;
}

export namespace Searchor {
  export type Detail = Tables<'searchors'>
  export type Type = Tables<'searchor_types'>
  export type Item = Type & { searchors: Detail[] }
}
export namespace Note {
  export type Type = Tables<'note_types'>
  export type Content = Tables<'note_contents'>
}
export namespace Video {
  export type Detail = Tables<'videos'>
  export type Origin = Tables<'video_origins'>
}


export namespace YNP {
    export type Token = Tables<'younongpais'>

    export interface User {
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
    export interface DrawInfo {
        balance: number;
        freezeBalance: number;
        totalBalance: number;
        tocUsedBalance: number;
        getCashImg: string;
    }
    export interface DrawLog {
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
    export interface GrowthInfo {
        growth: number;
        allGrowth: number;
        isSign: number;
    }
    export interface GrowthLog {
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
    export interface ZhunongInfo {
        userId?: number;
        header: string;
        nickName: string;
        memberType: number;
        isCountyServer: number;
        znPoint: number;
        znUsedPoint: number;
        znFreezePoint: number;
        recommendProducts: {
            productMainId: number;
            [key: string]: any;
        }[];
        specials: {
            specialId: number;
            [key: string]: any;
        }[];
        topAdvs?: any;

    }
    export interface Task {
        taskType: string;
        taskName: string;
        taskDes: string;
        isFinish: number;
        finishTimes: number;
        allTimes: number;
        growth: number;
        maxGrowth: number;
    }

}