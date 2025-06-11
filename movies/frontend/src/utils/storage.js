export const saveItem = (storageName, itemName) => {
  localStorage.setItem(`${storageName}`, `${itemName}`);
};

export const getItem = (storageName) => {
  localStorage.getItem(`${storageName}`);
};

export const removeItem = (storageName) => {
  localStorage.removeItem(`${storageName}`);
};
