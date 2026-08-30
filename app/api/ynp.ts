import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import qs from "qs";
import CryptoJS from "crypto-js";
import JSEncrypt from "jsencrypt";
dayjs.extend(utc);
dayjs.extend(timezone);

const IV = "1234567890123456";
const SALT = "MyAppSalt2026";
const PUBLIC_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCy3vHVBNU8l1ro3nZGjpzTWMJOOO6F99VC9DeYeb8y9fJ5AqxP45Bk99O8gKxo7z8bhc6qQjX2B8g6/h1i1rZ92la/kY83KVW+plLQ93PDQT8IWeLipn71T88AKeW+NsPGLLCV/02WIC426TJCowxDKkfP4fXINZUlfW3myFTMswIDAQAB";
const BASE_URL = "https://wcxapi.younongpai.com/apiApp/v3/"; // https://wcxapi.gxwcx.com/apiWxStore/v2/

const fetcher = (uri: string, data: {[key: string]: any} = {}) => {
  const headers = {
    'o': 'oUe5g7FGLV9frAZ_uYKandx_5V80',
    'apiFrom': 'APP',// WXMA
    'User-Agent': 'Mozilla/5.0 (Linux; Android 12; 24031PN0DC Build/V417IR; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/110.0.5481.154 Safari/537.36 uni-app (Immersed/24.296297) Html5Plus/1.0',
    'Content-Type': 'application/x-www-form-urlencoded',
    accessToken: data['accessToken'],
  };
  return new Promise<any>(async (resolve, reject) => {
    const response = await fetch(`${BASE_URL}${uri}`, {
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

const aesEncrypt = (plain: string, key: string, iv: string) => {
  const k = CryptoJS.enc.Utf8.parse(key);
  const i = CryptoJS.enc.Utf8.parse(iv);
  const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plain), k, {
    iv: i,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString(); // Base64 密文
}

const rsaEncrypt = (plain: string) => {
  const encryptor = new JSEncrypt({ default_key_size: "2048" });
  encryptor.setPublicKey(PUBLIC_KEY);
  return encryptor.encrypt(plain);
}

const sha256 = (input: string) => {
  return CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
}

const cryptoFetcher = (uri: string, token: string, params: {[key: string]: any} = {}) => {
  console.log('integral');
  const plain = JSON.stringify(params);
  const aesKey = randomString(16);
  const encryptData = aesEncrypt(plain, aesKey, IV);
  const rsaAesKey = rsaEncrypt(aesKey);
  const timestamp = Math.floor(Date.now() / 1000);
  const nonce = randomString(10);
  const sign = sha256(encryptData + timestamp + nonce + SALT);

  return new Promise<any>(async (resolve, reject) => {
    const response = await fetch(`${BASE_URL}${uri}`, {
      method: 'POST', 
      headers: {
        'apiFrom': 'APP',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 12; 24031PN0DC Build/V417IR; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/110.0.5481.154 Safari/537.36 uni-app (Immersed/24.296297) Html5Plus/1.0',
        accessToken: token,
      }, 
      body: qs.stringify({ encryptData, rsaAesKey, timestamp: String(timestamp), nonce, sign}),
    });
    if (response.ok) {
      const json = await response.json()
      resolve(json.data)
    }
    resolve({})
  })
}

const randomString = (n: number = 16) => {
  const cs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return new Array(n).fill(0).map(() => cs.charAt(Math.floor(Math.random() * cs.length))).join("");
}

export const login = (phone: string, pwd: string) => cryptoFetcher('/account/free/loginOrRegister', "", {phone,loginType: 0, pwd: CryptoJS.MD5(pwd).toString(),code: ""});
// 抽奖
export const startDraw = (token: string) => cryptoFetcher('/index/startDraw', token);
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
export const integral = (token: string) => cryptoFetcher('/index/integralDraw', token, {});
export const fl = (token: string) => fetcher('/index/findFLData', {accessToken: token});
export const couponInfo = (token: string) => fetcher('/userCoupon/findHmCouponSummary', {accessToken: token});
export const couponLogs = (token: string) => fetcher('/userCoupon/findHmCouponList', {page: 1, size: 10, accessToken: token});

// /userCoupon/findHmCouponSummary
// /userCoupon/findHmCouponList
// 