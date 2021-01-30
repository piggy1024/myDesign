import request from '@/utils/request'

export function addApplication(params) {
  return request({
    url: '/applications/add',
    method: 'post',
    params
  })
}
