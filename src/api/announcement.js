import request from '@/utils/request'

// 公告列表
export function getAnnouncementsList(params) {
  return request({
    url: '/announcements/list',
    method: 'get',
    params
  })
}


// 查找公告
export function findAnnouncement(params) {
  return request({
    url: '/announcements/findAnnouncement',
    method: 'post',
    params
  })
}

// 新增公告
export function addAnnouncement(params) {
  return request({
    url: '/announcements/addAnnouncement',
    method: 'post',
    params
  })
}

// 删除公告
export function deleteAnnouncement(params) {
  return request({
    url: '/announcements/deleteAnnouncement',
    method: 'post',
    params
  })
}
