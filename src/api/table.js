import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/classrooms/list',
    method: 'get',
    params
  })
}

export function getClassroomList(params) {
  return request({
    url: '/classrooms/list',
    method: 'get',
    params
  })
}
