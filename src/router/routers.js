//import Main from '@/view/main'
//import parentView from '@/components/parent-view'

var commonParent= {
  template: '<div><router-view></router-view></div>'
}

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */
const root= '';
export default [
  {
    path: '/walle',
    name: 'walle',
    component: () => import('@/view/walle/walle.vue')
  },
  {
    path: root,
    name: 'lucky',
    component: () => import('@/view/lucky/test.vue')
  },
  
  {
    path:'/hop',
    name: 'hop',
    meta: {
      description: '高阶组件',
      url: 'http://hcysun.me/vue-design/more/vue-hoc.html'
    },
    component: () => import('@/view/hop/hop.vue')
  },

  {
    path: '/slot',
    name: 'slot',
    component: commonParent,
    children: [
      {
        path: 'scope',
        name: 'scopeScope',
        meta: {
          description: 'slot-scope',
          url: 'https://juejin.im/post/5c64e11151882562e4726d98'
        },
        component: () => import('@/view/slot/slot-parent.vue')
      },
    ]
  },

  {
    path:'/directive',
    name: 'directive',
    meta: {
      description: 'vue自定义指令',
    },
    component: commonParent,
    children: [
      {
        path: 'slot-directive',
        name: 'slotDirective',
        meta: {
          description: 'slot-directive',
          url: 'https://juejin.im/post/5c64e11151882562e4726d98'
        },
        component: () => import('@/view/directive/slot-directive.vue')
      },
    ]
  },

  {
    path:'/star',
    component: () => import('@/view/star-perspective/star-perspective.vue')
  }
]
