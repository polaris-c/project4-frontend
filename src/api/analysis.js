import service from '@/utils/request'

/* -------- -------- -------- 常见样本 -------- -------- -------- */
/* 炸药与原材料 */
export function exploMatchs() {
  return service({
    url: '/exploMatchs/',
    method: 'get',
  })
}

