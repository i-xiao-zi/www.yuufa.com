import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import qs from "qs";
dayjs.extend(utc);
dayjs.extend(timezone);

const fetcher = (uri: string, data: {[key: string]: any} = {}) => {
        const headers = {
            'o': 'oUe5g7FGLV9frAZ_uYKandx_5V80',
            'apiFrom': 'WXMA',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090c33)XWEB/13639',
            'Content-Type': 'application/x-www-form-urlencoded',
            accessToken: data['accessToken'],
        };
        return new Promise<any>(async (resolve, reject) => {
            const response = await fetch(`https://wcxapi.gxwcx.com/apiWxStore/v2/${uri}`, {
                method: 'POST', 
                headers: headers, 
                body: qs.stringify(data),
            });
            if (response.ok) {
                const json = await response.json()
                resolve(json.data)
            }
            resolve({})
        })
    }

namespace YNP {

    
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

    // 抽奖
    export const startDraw = (token: string) => fetcher('/index/startDraw', {accessToken: token});
    export const zhunongLogs = (token: string) => fetcher('/userIntegral/findUserZnPoiontLogs', {page: 1,type: 1,pageSize: 1000,accessToken: token});
    export const zhunongInfo = (token: string) => fetcher('/userIntegral/free/findZnIndex', {accessToken: token});
    // 抽奖状态
    export const getDrawIndex = (token: string) => fetcher('/index/getDrawIndex', {accessToken: token});
    export const findUserBalance = (token: string) => fetcher('/getCash/findUserBalance', {accessToken: token});
    export const userInfo = (token: string) => fetcher('/account/findUserInfo', {accessToken: token});
    export const findMoneyLogs = (token: string) => fetcher('/getCash/findMoneyLogs', {page: 1,type: 1,startDay: '20260101',endDay: dayjs().tz('Asia/Shanghai').format('YYYYMMDD'),pageSize: 1000,accessToken: token});
    export const freeIndex = (token: string) => fetcher('/index/free/index', {accessToken: token});
    // 成长信息
    export const growthInfo = (token: string) => fetcher('/growth/findUserGrowthInfo', {accessToken: token});
    // 成长任务
    export const growthTask = (token: string) => fetcher('/growth/findUserGrowthTask', {accessToken: token});
    // 成长日志
    export const growthLogs = (token: string) => fetcher('/growth/userGrowthDetail', {page: 1, pageSize: 1000,type: 1,accessToken: token,});
    // 签到
    export const growthSignIn = (token: string) => fetcher('/growth/signIn', {accessToken: token});
    // 浏览
    export const growthViewSign = (token: string, id: number) => fetcher('/growth/viewMallSign', {productMainId: id, accessToken: token});
    // 分享助农好货
    export const growthShareProduct = (token: string, id: number) => fetcher('/growth/shareProductSign', {productMainId: id, accessToken: token});
}

export default YNP;