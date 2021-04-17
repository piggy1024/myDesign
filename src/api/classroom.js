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

export function getClassroomDetail(params) {
  return request({
    url: '/classrooms/detailClassroom',
    method: 'get',
    params
  })
}

export function addClassroom(params) {
  return request({
    url: '/classrooms/addClassroom',
    method: 'post',
    params
  })
}

export function deleteClassroom(params) {
  return request({
    url: '/classrooms/deleteClassroom',
    method: 'post',
    params
  })
}
