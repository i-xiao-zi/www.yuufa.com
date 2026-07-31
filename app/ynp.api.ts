import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import qs from "qs";
dayjs.extend(utc);
dayjs.extend(timezone);

const fetch = (uri: string, data: {[key: string]: any} = {}) => {
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
    // 抽奖
    export const startDraw = (token: string) => fetch('/index/startDraw', {accessToken: token});
    export const zhunongLog = (token: string) => fetch('/userIntegral/findUserZnPoiontLogs', {page: 1,type: 1,pageSize: 1000,accessToken: token});
    export const zhunongInfo = (token: string) => fetch('/userIntegral/free/findZnIndex', {accessToken: token});
    // 抽奖状态
    export const getDrawIndex = (token: string) => fetch('/index/getDrawIndex', {accessToken: token});
    export const findUserBalance = (token: string) => fetch('/getCash/findUserBalance', {accessToken: token});
    export const userInfo = (token: string) => fetch('/account/findUserInfo', {accessToken: token});
    export const findMoneyLogs = (token: string) => fetch('/getCash/findMoneyLogs', {page: 1,type: 1,startDay: '20260101',endDay: dayjs().tz('Asia/Shanghai').format('YYYYMMDD'),pageSize: 1000,accessToken: token});
    export const freeIndex = (token: string) => fetch('/index/free/index', {accessToken: token});
    // 成长信息
    export const growthInfo = (token: string) => fetch('/growth/findUserGrowthInfo', {accessToken: token});
    // 成长任务
    export const growthTask = (token: string) => fetch('/growth/findUserGrowthTask', {accessToken: token});
    // 成长日志
    export const growthLogs = (token: string) => fetch('/growth/userGrowthDetail', {page: 1, pageSize: 1000,type: 1,accessToken: token,});
    // 签到
    export const growthSignIn = (token: string) => fetch('/growth/signIn', {accessToken: token});
    // 浏览
    export const growthViewSign = (id, token: string) => fetch('/growth/viewMallSign', {productMainId: id, accessToken: token});
    // 分享助农好货
    export const growthShareProduct = (id, token: string) => fetch('/growth/shareProductSign', {productMainId: id, accessToken: token});
}

export default YNP;