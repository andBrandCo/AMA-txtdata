const auth = {
  setToken(value, tokenKey) {
    if (!value || value.length <= 0) {
      return;
    }
    console.log("set token to LS - ", value);

    localStorage.setItem(tokenKey, value);
    return;
  },
  getToken(tokenKey) {
    return (localStorage && localStorage.getItem(tokenKey)) || null;
  },
  isAuthenticated(tokenKey) {
    if (localStorage && localStorage.getItem(tokenKey)) {
      return true;
    }
    return false;
  },
  clearToken() {}
};

export default auth;
