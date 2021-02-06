import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      roles: ['editor', 'admin']
    },
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '首页',
        icon: 'dashboard'
      }
    }]
  },
  // 个人中心
  {
    path: '/personnel',
    component: Layout,
    meta: {
      roles: ['editor', 'admin']
    },
    children: [{
      path: 'index',
      name: 'Personnel',
      component: () => import('@/views/personnel/index'),
      meta: {
        title: '个人中心',
        icon: 'form'
      }
    }]
  },

  // 公告 管理
  {
    path: '/announcementManagement',
    component: Layout,
    redirect: '/announcementManagement/announcementManage',
    name: 'AnnouncementManagement',
    meta: {
      title: '公告管理',
      icon: 'nested',
      roles: ['admin']
    },
    children: [{
        path: 'announcementManage',
        component: () => import('@/views/announcementManagement/announcementManage'), // Parent router-view
        name: 'announcementManage',
        meta: {
          title: '公告列表'
        },
      },
      {
        path: 'studentManage',
        component: () => import('@/views/accountManagement/studentManage'),
        name: 'StudentManage',
        meta: {
          title: '学生账号管理'
        }
      }
    ]
  },

  // 公告列表路由
  {
    path: '/announcement',
    component: Layout,
    meta: {
      roles: ['editor', 'admin']
    },
    children: [{
      path: 'index',
      name: 'Announcement',
      component: () => import('@/views/announcement/index'),
      meta: {
        title: '公告列表',
        icon: 'form'
      }
    }]
  },
  // 教室使用情况
  {
    path: '/classroom',
    component: Layout,
    redirect: '/classroom/classroomList',
    name: 'Classroom',
    meta: {
      title: '教室使用情况',
      icon: 'el-icon-s-help',
      roles: ['editor', 'admin']
    },
    children: [{
        path: 'classroomList',
        name: 'ClassroomList',
        component: () => import('@/views/classroomList/index'),
        meta: {
          title: '教室列表',
          icon: 'table'
        }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: {
          title: 'Tree',
          icon: 'tree'
        }
      }
    ]
  },
  // 表单
  {
    path: '/form',
    meta: {
      roles: ['editor', 'admin']
    },
    component: Layout,
    children: [{
      path: 'index',
      name: 'Form',
      component: () => import('@/views/form/index'),
      meta: {
        title: 'Form',
        icon: 'form'
      }
    }]
  },
  // 审核情况
  {
    path: '/approveList',
    component: Layout,
    redirect: '/approveList/notApprove',
    name: 'ApproveList',
    meta: {
      title: '审核情况',
      icon: 'nested',
      roles: ['admin']
    },
    children: [{
        path: 'approved',
        component: () => import('@/views/approveList/approved/index'),
        name: 'Approved',
        meta: {
          title: '已审核列表'
        }
      },
      {
        path: 'notApprove',
        component: () => import('@/views/approveList/notApprove/index'),
        name: 'NotApprove',
        meta: {
          title: '未审核列表'
        },
        // children: [{
        //     path: 'menu1-1',
        //     component: () => import('@/views/nested/menu1/menu1-1'),
        //     name: 'Menu1-1',
        //     meta: {
        //       title: 'Menu1-1'
        //     }
        //   },
        //   {
        //     path: 'menu1-2',
        //     component: () => import('@/views/nested/menu1/menu1-2'),
        //     name: 'Menu1-2',
        //     meta: {
        //       title: 'Menu1-2'
        //     },
        //     children: [{
        //         path: 'menu1-2-1',
        //         component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
        //         name: 'Menu1-2-1',
        //         meta: {
        //           title: 'Menu1-2-1'
        //         }
        //       },
        //       {
        //         path: 'menu1-2-2',
        //         component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
        //         name: 'Menu1-2-2',
        //         meta: {
        //           title: 'Menu1-2-2'
        //         }
        //       }
        //     ]
        //   },
        //   {
        //     path: 'menu1-3',
        //     component: () => import('@/views/nested/menu1/menu1-3'),
        //     name: 'Menu1-3',
        //     meta: {
        //       title: 'Menu1-3'
        //     }
        //   }
        // ]
      }
    ]
  },
  // 我的申请进度
  {
    path: '/applicationProgress',
    component: Layout,
    meta: {
      roles: ['editor', ]
    },
    children: [{
      path: 'index',
      name: 'Form',
      component: () => import('@/views/applicationProgress/index'),
      meta: {
        title: '我的申请进度',
        icon: 'form'
      }
    }]
  },
  // 账号管理
  {
    path: '/accountManagement',
    component: Layout,
    redirect: '/accountManagement/adminManage',
    name: 'AccountManagement',
    meta: {
      title: '账号管理',
      icon: 'nested',
      roles: ['admin']
    },
    children: [{
        path: 'adminManage',
        component: () => import('@/views/accountManagement/adminManage'), // Parent router-view
        name: 'AdminManage',
        meta: {
          title: '管理员账号管理'
        },
      },
      {
        path: 'studentManage',
        component: () => import('@/views/accountManagement/studentManage'),
        name: 'StudentManage',
        meta: {
          title: '学生账号管理'
        }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]


/**
 * asyncRoutes   动态路由  根据后端返回的身份决定是否拥有权限进入的路由
 *
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/form/index',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: 'Permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   }
  // },
  // {
  //   path: '/form',
  //   component: Layout,
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Form',
  //   meta: {
  //     title: 'Form',
  //     icon: 'lock',
  //     roles: ['editor', 'admin'] // you can set roles in root nav
  //   },
  // 表单
  // {
  //   path: '/form',
  //   alwaysShow: true,
  //   component: Layout,
  //   roles: ['admin'],
  //   children: [{
  //     path: 'index',
  //     name: 'Form',
  //     component: () => import('@/views/form/index'),
  //     meta: {
  //       title: 'Form',
  //       icon: 'form',
  //       roles: ['admin']
  //     }
  //   }]
  // },
  // children: [{
  //   path: 'index',
  //   name: 'Form',
  //   component: () => import('@/views/form/index'),
  //   meta: {
  //     title: 'Form',
  //     icon: 'form',
  //     roles: ['editor', 'admin']
  //   }
  // }]
  // },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
