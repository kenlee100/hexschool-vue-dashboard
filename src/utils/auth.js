function defineStorage(key) {
  return {
    get() {
      return localStorage.getItem(key);
    },
    set(token) {
      return localStorage.setItem(key, token);
    },
    remove() {
      return localStorage.removeItem(key);
    },
  };
}

export const localToken = defineStorage("admin-token");
export const localUserName = defineStorage("username");
