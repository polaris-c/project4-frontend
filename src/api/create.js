import service from '@/utils/request'

/* -------- -------- -------- 人员管理 -------- -------- -------- */
export function addPeople(data) {
  return service({
    url: '/users/',
    method: 'post',
    data,
  })
}

/* -------- -------- -------- 常见样本 -------- -------- -------- */
/* 炸药与原材料 */
export function addExploSample(data) {
  return service({
    url: '/exploSamples/',
    method: 'post',
    data,
  })
}

export function addExploSampleFiles(data) {
  return service({
    url: '/exploSampleFiles/',
    method: 'post',
    data
  })
}

/* 爆炸装置成分 */
export function addDevCompSample(data) {
  return service({
    url: '/devCompSamples/',
    method: 'post',
    data
  })
}

export function addDevCompSampleFile(data) {
  return service({
    url: '/devCompSampleFiles/',
    method: 'post',
    data
  })
}

/* 爆炸装置形态 */
export function addDevShapeSample(data) {
  return service({
    url: '/devShapeSamples/',
    method: 'post',
    data
  })
}

/* -------- -------- -------- 案件物证 -------- -------- -------- */
/* 炸药与原材料 */
export function addExploEvis(data) {
  return service({
    url: '/exploEvis/',
    method: 'post',
    data
  })
}

export function addExploEviFiles(data) {
  return service({
    url: '/exploEviFiles/',
    method: 'post',
    data
  })
}

/* 爆炸装置成分 */
export function addDevCompEvis(data) {
  return service({
    url: '/devCompEvis/',
    method: 'post',
    data
  })
}

export function addDevCompEviFiles(data) {
  return service({
    url: '/devCompEviFiles/',
    method: 'post',
    data
  })
}

/* 爆炸装置形态 */
export function addDevShapeEvis(data) {
  return service({
    url: '/devShapeEvis/',
    method: 'post',
    data
  })
}