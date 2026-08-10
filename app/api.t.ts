export interface Paginate<T=any> {
    data: T;
    page: number;
    count: number;
    total: number;
    size: number;
}