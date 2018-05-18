import service from '@/utils/request'


export function getDataList(params) {
  return service({
    url: '/table/explosiveList',
    method: 'get',
    params
  })
}

export function getShapeDataList(params) {
  return service({
    url: '/table/deviceShapeList',
    method: 'get',
    params
  })
}

export function getExlpoMatch(params) {
  return service({
    url: '/table/exlpoMatch ',
    method: 'get',
    params
  })
}

export function getDevCompMatch(params) {
  return service({
    url: '/table/devCompMatch',
    method: 'get',
    params
  })
}

export function getPeopleList(params) {
  return service({
    url: '/users/',
    method: 'get',
    params
  })
}

export function showPeople(username) {
  return service({
    url: '/users/' + username + '/',
    method: 'get',
  })
}

export function updatePeople(username, data) {
  console.log('--- api updatePeople username: ', username)
  console.log('--- api updatePeople data: ', data)
  return service({
    url: '/users/' + username + '/',
    method: 'patch',
    data
  })
}

export function deletePeople(username) {
  return service({
    url: '/users/' + username + '/',
    method: 'delete',
  })
}

export function updateData(data) {
  return service({
    url: '/table/explosiveListUpdate',
    method: 'post',
    data
  })
}

export function updateDeviceShapeData(data) {
  return service({
    url: '/table/deviceShapeListUpdate',
    method: 'post',
    data
  })
}
