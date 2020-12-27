const TokenKey = 'mall_token';

export function getToken() {
  var token = {};
  try {
    token = localStorage.getItem(TokenKey);
  } catch (e) {
    token = {}
  }
  return token;
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, JSON.stringify(token));
}

export function removeToken() {
  return localStorage.removeItem(TokenKey);
}
