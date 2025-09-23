//local_storage set 함수
export function set_local_Storage(key, value) {
  const name = window.localStorage.setItem(`${key}`, `${value}`);
  console.log('set');
  return name;
}