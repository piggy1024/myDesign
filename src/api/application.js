import request from '@/utils/request'

// 获取当前用户申请的进度
export function getApplyList(params) {
  return request({
    url: '/applications/applyProcess',
    method: 'get',
    params
  })
}

// 取消申请
export function deleteApply(params) {
  return request({
    url: '/applications/deleteApply',
    method: 'post',
    params
  })
}

// 获取未审批列表
export function getAuditList(params) {
  return request({
    url: '/applications/auditList',
    method: 'get',
    params
  })
}

// 获取已审批列表
export function getAuditedList(params) {
  return request({
    url: '/applications/auditedList',
    method: 'get',
    params
  })
}

// 审批通过
export function resolveApply(params) {
  return request({
    url: '/applications/resolveApply',
    method: 'post',
    params
  })
}

// 审批驳回
export function rejectApply(params) {
  return request({
    url: '/applications/rejectApply',
    method: 'post',
    params
  })
}

// 撤回审批
export function withdrawApply(params) {
  return request({
    url: '/applications/withdrawApply',
    method: 'post',
    params
  })
}
