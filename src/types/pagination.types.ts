export interface IPagination {
  total: number
  current: number
}

export interface IParams {
  offset: number
  search: string
  limit?: number | string
}
