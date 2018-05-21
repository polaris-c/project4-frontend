import service from '@/utils/request'

/* 人员管理 */
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

/* 常见样本 */
export function getExploSampleList(params) {
  return service({
    url: '/exploSamples/',
    method: 'get',
    params
  })
}

export function showExploSample(id) {
  return service({
    url: '/exploSamples/' + id + '/',
    method: 'get',
  })
}

export function updateExploSample(id, data) {
  return service({
    url: '/exploSamples/' + id + '/',
    method: 'patch',
    data
  })
}

export function deleteExploSample(id) {
  return service({
    url: '/exploSamples/' + id + '/',
    method: 'delete',
  })
}

export function getDevCompSampleList(params) {
  return service({
    url: '/devCompSamples/',
    method: 'get',
    params
  })
}

export function getDevShapeSamples(params) {
  return service({
    url: '/devShapeSamples/',
    method: 'get',
    params
  })
}

/* 案件物证 */
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
