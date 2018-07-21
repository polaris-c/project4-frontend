import service from '@/utils/request'

/* -------- -------- -------- 人员管理 -------- -------- -------- */
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

/* -------- -------- -------- 常见样本 -------- -------- -------- */
/* 炸药与原材料 */
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

export function updateExploMatch() {
  return service({
    url: '/updateExploMatch/',
    method: 'get',
  })
}

/* 爆炸装置成分 */
export function getDevCompSampleList(params) {
  return service({
    url: '/devCompSamples/',
    method: 'get',
    params
  })
}

export function showDevCompSample(id) {
  return service({
    url: '/devCompSamples/' + id + '/',
    method: 'get',
  })
}

export function updateDevCompSample(id, data) {
  return service({
    url: '/devCompSamples/' + id + '/',
    method: 'patch',
    data
  })
}

export function deleteDevCompSample(id) {
  return service({
    url: '/devCompSamples/' + id + '/',
    method: 'delete',
  })
}

export function updateDevCompMatch() {
  return service({
    url: '/updateDevCompMatch/',
    method: 'get',
  })
}

/* 爆炸装置形态 */
export function getDevShapeSampleList(params) {
  return service({
    url: '/devShapeSamples/',
    method: 'get',
    params
  })
}

export function showDevShapeSample(id) {
  return service({
    url: '/devShapeSamples/' + id + '/',
    method: 'get',
  })
}

export function updateDevShapeSample(id, data) {
  return service({
    url: '/devShapeSamples/' + id + '/',
    method: 'patch',
    data
  })
}

export function deleteDevShapeSample(id) {
  return service({
    url: '/devShapeSamples/' + id + '/',
    method: 'delete',
  })
}

export function updateDevShapeMatch() {
  return service({
    url: '/updateDevShapeMatch/',
    method: 'get',
  })
}

/* -------- -------- -------- 案件物证 -------- -------- -------- */
/* 炸药与原材料 */
export function getExploEvisList(params) {
  return service({
    url: '/exploEvis/',
    method: 'get',
    params
  })
}

export function showExploEvis(id) {
  return service({
    url: '/exploEvis/' + id + '/',
    method: 'get',
  })
}

export function updateExploEvis(id, data) {
  return service({
    url: '/exploEvis/' + id + '/',
    method: 'patch',
    data
  })
}

export function deleteExploEvis(id) {
  return service({
    url: '/exploEvis/' + id + '/',
    method: 'delete',
  })
}

/* 爆炸装置成分 */
export function getDevCompEvisList(params) {
  return service({
    url: '/devCompEvis/',
    method: 'get',
    params
  })
}

export function showDevCompEvis(id) {
  return service({
    url: '/devCompEvis/' + id + '/',
    method: 'get',
  })
}

export function updateDevCompEvis(id, data) {
  return service({
    url: '/devCompEvis/' + id + '/',
    method: 'patch',
    data
  })
}

export function deleteDevCompEvis(id) {
  return service({
    url: '/devCompEvis/' + id + '/',
    method: 'delete',
  })
}

/* 爆炸装置形态 */
export function getDevShapeEvisList(params) {
  return service({
    url: '/devShapeEvis/',
    method: 'get',
    params
  })
}

export function showDevShapeEvis(id) {
  return service({
    url: '/devShapeEvis/' + id + '/',
    method: 'get',
  })
}

export function updateDevShapeEvis(id, data) {
  return service({
    url: '/devShapeEvis/' + id + '/',
    method: 'patch',
    data
  })
}

export function deleteDevShapeEvis(id) {
  return service({
    url: '/devShapeEvis/' + id + '/',
    method: 'delete',
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

