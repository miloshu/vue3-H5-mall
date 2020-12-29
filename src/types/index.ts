export type Goods = {
  id: number,
  name: string,
  classify: string
}
export interface Result<T> {
  ok: 0 | 1;
  data: T;
}
