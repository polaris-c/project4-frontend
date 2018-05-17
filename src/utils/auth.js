import Cookies from 'js-cookie'

const TokenKey = 'Token'
const UserKey = 'UserName'

export function getToken() {
  console.log('*** utils/auth getToken Cookies.get: ', TokenKey)
  return Cookies.get(TokenKey)
}

export function getName() {
  return Cookies.get(UserKey)
}

export function setToken(token) {
  console.log('*** utils/auth setToken Cookies.set: ', TokenKey, token)
  return Cookies.set(TokenKey, token)
}

export function setName(name) {
  return Cookies.set(UserKey, name)
}

export function removeToken() {
  console.log('*** utils/auth removeToken Cookies.remove: ', TokenKey)
  return Cookies.remove(TokenKey)
}

export function removeName() {
  return Cookies.remove(UserKey)
}
