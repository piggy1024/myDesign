import request from '@/utils/request'

export function getStudentsList(params) {
  return request({
    url: '/students/list',
    method: 'get',
    params
  })
}

// 查找账号
export function findStudent(params) {
  return request({
    url: '/students/findAccount',
    method: 'post',
    params
  })
}

// 新增管理员账号
export function addStudent(params) {
  return request({
    url: '/students/addAccount',
    method: 'post',
    params
  })
}

// 删除账号
export function deleteStudent(params) {
  return request({
    url: '/students/deleteAccount',
    method: 'post',
    params
  })
}

// 重置账号密码
export function resetPassword(params) {
  return request({
    url: '/students/resetStudentPassword',
    method: 'post',
    params
  })
}
