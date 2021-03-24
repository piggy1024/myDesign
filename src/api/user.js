import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }
export function login(data) {
  return request({
    url: '/users/login',
    method: 'post',
    data
  })
}


export function getInfo(token) {
  return request({
    url: '/users/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: '/users/logout',
    method: 'post'
  })
}

// 查询用户申请相关数据
export function getUserApplyData(params) {
  return request({
    url: '/applications/userApplyData',
    method: 'get',
    params: params
  })
}
