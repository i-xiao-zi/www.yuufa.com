import config from "@/config";

export interface Response<T = null> {
  code: number;
  msg: string;
  data: T;
}

export interface HttpOptions {
  revalidate?: number;
  method?: string | 'GET' | 'POST';
  headers?: Record<string, string>;
  body?: BodyInit;
}

export const request = <T = null>(uri: string, options: HttpOptions): Promise<Response<T>> => {
    const url = `${config.base_api}${uri}`;
    const init: RequestInit = {
      method: options.method || 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      next:{revalidate: options.revalidate || 0},
      body: options.body,
    }
    return new Promise<Response<T>>(async (resolve, reject) => {
      const response = await fetch(url, init)
      if (response.ok) {
        return resolve(await response.json())
      }
      return reject(response.statusText)
    });
  }
export const get = <T = any>(uri: string, options: HttpOptions = {}): Promise<Response<T>> => {
  return request(uri, {...options, method: 'GET'});
}
export const post = <T = any>(uri: string, data: any, options: HttpOptions = {}): Promise<Response<T>> => {
  return request(uri, {...options, method: 'POST', body: JSON.stringify(data)});
}