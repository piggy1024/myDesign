import request from '@/utils/request'

// 增加申请
export function addPostApplication(params) {
  return request({
    url: '/applicationsPost/addPost',
    method: 'post',
    params
  })
}

// 修改申请
export function editPostApplication(params) {
  return request({
    url: '/applicationsPost/editPost',
    method: 'post',
    params
  })
}

// 获取当前用户申请的进度
export function getApplyPostList(params) {
  return request({
    url: '/applicationsPost/applyPostProcess',
    method: 'get',
    params
  })
}

// 取消申请
export function deletePostApply(params) {
  return request({
    url: '/applicationsPost/deletePostApply',
    method: 'post',
    params
  })
}

// 获取未审批列表
export function getAuditPostList(params) {
  return request({
    url: '/applicationsPost/auditPostList',
    method: 'get',
    params
  })
}

// 获取已审批列表
export function getAuditedPostList(params) {
  return request({
    url: '/applicationsPost/auditedPostList',
    method: 'get',
    params
  })
}

// 审批通过
export function resolvePostApply(params) {
  return request({
    url: '/applicationsPost/resolvePostApply',
    method: 'post',
    params
  })
}

// 审批驳回
export function rejectPostApply(params) {
  return request({
    url: '/applicationsPost/rejectPostApply',
    method: 'post',
    params
  })
}

// 撤回审批
export function withdrawPostApply(params) {
  return request({
    url: '/applicationsPost/withdrawPostApply',
    method: 'post',
    params
  })
}
