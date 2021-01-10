// 存储
const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}
// 获取
const getStorage = <T>(key: string): T => {
  let value = localStorage.getItem(key) as any
  return <T> JSON.parse(value)
}
// 删除
const removeStorage = (key: string) => {
  localStorage.removeItem(key)
}
// 清空
const removeAllStorage = () => void localStorage.clear()
export {
  removeAllStorage,
  removeStorage,
  getStorage,
  setStorage
}
