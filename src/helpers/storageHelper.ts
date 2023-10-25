export const clearLocal = (key: string) => {
  localStorage.removeItem(key)
}

export const saveInLocal = <T, > (key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify({ ...value }))
}

export const getFromLocal = (key: string) => {
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : null
}
