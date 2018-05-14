import service from '@/utils/request'

export function login(username, password) {
  return service({
    url: '/login/',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token, username) {
  return service({
    url: '/users/' + username + '/',
    method: 'get',
    data: { 
      token, 
      username
    }
  })
}

export function logout() {
  return service({
    url: '/login/',
    method: 'post'
  })
}
