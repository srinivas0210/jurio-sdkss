export function setItem(key: string, value: string) {
  return localStorage.setItem(key, value);
}

export function getItem(key: string) {
  return localStorage.getItem(key);
}
