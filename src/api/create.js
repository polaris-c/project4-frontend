import service from '@/utils/request'

/* 人员管理 */
export function addPeople(data) {
  return service({
    url: '/users/',
    method: 'post',
    data,
  })
}

/* 常见样本 */
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

export function addDevCompSample(data) {
  return service({
    url: '/devCompSample/',
    method: 'post',
    data
  })
}

export function addDevCompSampleFile(data) {
  return service({
    url: '/devCompSampleFile/',
    method: 'post',
    data
  })
}

export function addDevShapeSample(data) {
  return service({
    url: '/devShapeSample/',
    method: 'post',
    data
  })
}

/* 案件物证 */