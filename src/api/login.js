import service from '@/utils/request'

export function login(username, password) {
  return service({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return service({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return service({
    url: '/user/logout',
    method: 'post'
  })
}
