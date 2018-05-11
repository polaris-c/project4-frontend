import Cookies from 'js-cookie'

const TokenKey = 'Token'

export function getToken() {
  console.log('*** utils/auth getToken Cookies.get: ', TokenKey)
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  console.log('*** utils/auth setToken Cookies.set: ', TokenKey, token)
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  console.log('*** utils/auth removeToken Cookies.remove: ', TokenKey)
  return Cookies.remove(TokenKey)
}
