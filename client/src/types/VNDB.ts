
export interface VNQueryResponse<T> {
    num: number,
    more: boolean,
    status: string,
    searchType: string,
    items: T[]
}