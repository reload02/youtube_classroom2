export const getLocalStorageData = (key: string) => {
  const data = localStorage.getItem(key);
  if (data === null) return "[]";
  else return data;
};

export const setLocalStorageData = (key: string, data: string) => {
  localStorage.setItem(key, data);
};
