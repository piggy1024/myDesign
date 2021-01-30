import request from '@/utils/request'

// 获取管理员列表
export function getAdminsList(params) {
  return request({
    url: '/admins/list',
    method: 'get',
    params
  })
}

// 查找账号
export function findAdmin(params) {
  return request({
    url: '/admins/findAccount',
    method: 'post',
    params
  })
}

// 新增管理员账号
export function addAdmin(params) {
  return request({
    url: '/admins/addAccount',
    method: 'post',
    params
  })
}

// 删除账号
export function deleteAdmin(params) {
  return request({
    url: '/admins/deleteAccount',
    method: 'post',
    params
  })
}

// 重置账号密码
export function resetPassword(params) {
  return request({
    url: '/admins/resetAdminPassword',
    method: 'post',
    params
  })
}
