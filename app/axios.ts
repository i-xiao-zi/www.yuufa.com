import Axios, { type AxiosRequestConfig, AxiosError, type Method } from "axios";
import config from "@/config";
// import { stringify } from "qs";

const defaultConfig: AxiosRequestConfig = {
    baseURL: config.base_api,
    timeout: 6000,
    headers: { "Content-Type": "application/json;charset=utf-8" },
    // paramsSerializer: { serialize: stringify }
};

export interface Response<T = any> {
    code: number;
    message?: string;
    data?: T;
}

class HttpClient {
    private instance = Axios.create(defaultConfig);

    constructor(config?: AxiosRequestConfig) {
        this.instance = Axios.create({ ...defaultConfig, ...config });
        this.initInterceptors();
    }

    private initInterceptors() {
        this.instance.interceptors.request.use(cfg => {
        // 可添加 Token、时间戳等
            return cfg;
        });
        this.instance.interceptors.response.use(res => res.data, this.handleError);
    }

    private handleError(error: AxiosError) {
        console.log(error);
        if (!error.response) return Promise.reject(new Error("网络错误"));
        const status = error.response.status;
        const map: Record<number, string> = { 401: "未授权", 500: "服务器错误" };
        return Promise.reject(new Error(map[status] || `错误码：${status}`));
    }

    public request<T>(method: Method, url: string, config?: AxiosRequestConfig) {
        return this.instance.request<T, Response<T>>({ method, url, ...config });
    }

    public get<T>(url: string, config?: AxiosRequestConfig) {
        return this.instance.get<T, Response<T>>(url, config);
    }
    public post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        console.log(url, data, config);
        return this.instance.post<T, Response<T>>(url, data, config);
    }
    public put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.instance.put<T, Response<T>>(url, data, config);
    }
    public delete<T>(url: string, config?: AxiosRequestConfig) {
        return this.instance.delete<T, Response<T>>(url, config);
    }
}

export default new HttpClient();