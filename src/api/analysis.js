import service from '@/utils/request'

/* -------- -------- -------- 常见样本 -------- -------- -------- */
/* 炸药与原材料 */
export function getExploMatchsList() {
  return service({
    url: '/exploMatchs/',
    method: 'get',
  })
}

export function getExploMatchsItem(id) {
  return service({
    url: '/exploMatchs/' + id + '/',
    method: 'get',
  })
}

// /* -------- -------- -------- 案件物证 -------- -------- -------- */
// /* 炸药与原材料 */
// export function getExploMatchsList() {
//   return service({
//     url: '/exploMatchs/',
//     method: 'get',
//   })
// }

// export function getExploMatchsItem(id) {
//   return service({
//     url: '/exploMatchs/' + id + '/',
//     method: 'get',
//   })
// }


export function getData(dataURL) {
  return service({
    url: dataURL,
    method: 'get',
  })
}

