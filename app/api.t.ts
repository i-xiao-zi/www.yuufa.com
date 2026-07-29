export interface Paginate<T=any> {
    data: T;
    page: number;
    count: number;
    total: number;
    size: number;
}

export interface Video {
    actor: string;
    area: string;
    author: string;
    behind: string;
    blurb: string;
    class: string;
    content: string;
    director: string;
    douban_id: number;
    douban_score: number;
    duration: string;
    en: string;
    id: number;
    isend: number;
    lang: string;
    level: number;
    name: string;
    origin_id: number;
    pic: string;
    pic_slide: string;
    pic_thumb: string;
    pubdate: string;
    remarks: string;
    state: string;
    status: number;
    sub: string;
    tags: string;
    time: number;
    total: number;
    urls: string;
    version: string;
    vod_id: number;
    writer: string;
    year: string;
}

export interface VideoOrigin {
    id: number;
    name: string;
    title: string;
    home: string;
    url: string;
    sort: number;
}