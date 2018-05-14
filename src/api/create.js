import service from '@/utils/request'

export function addPeople(data) {
  return service({
    url: '/users/',
    method: 'post',
    data,
  })
}

export function addDataList(data) {
  return service({
    url: '/addData',
    method: 'post',
    data,
  })
}