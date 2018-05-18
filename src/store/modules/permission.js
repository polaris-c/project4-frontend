import { asyncRouterMap, constantRouterMap } from '@/router'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },

  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      console.log('*** store/permission SET_ROUTERS addRouters:', state.addRouters)
      state.routers = constantRouterMap.concat(routers)
      console.log('*** store/permission SET_ROUTERS all routers:', state.routers)
    }
  },

  actions: {
    generateRoutes({ commit }, data) {
      return new Promise(resolve => {
        console.log('*** store/permission generateRoutes data: ', data)
        let accessedRouters
        /**
         * roles中有1,2则加载全部asyncRouterMap
         * 否则调用filterAsyncRouter一个个解析roles里的元素
         */
        if (data.role === 1 || data.role === 2) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, data.role)
        }
        commit('SET_ROUTERS', accessedRouters)
        console.log('*** store/permission generateRoutes is OK, accessedRouters: ', accessedRouters)
        resolve()
      })
    }
  }
}

/* 递归调用filterAsyncRouter,解析出所有符合条件的路由 */
function filterAsyncRouter(asyncRouterMap, role) {
  const accessedRouters = asyncRouterMap.filter((route) => {
    /* 先对某一条路由route本身的权限进行判别 */
    if (accessPermission(role, route)) {
      /* 再对路由route.children进行权限判别,若有子路由,则递归调用filterAsyncRouter */
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, role)
      }
      return true
    } else {
      return false
    }
  })
  return accessedRouters
}

/* 对某一条路由route,将登陆者的role与route.meta.roles中的项比对 */
function accessPermission(role, route) {
  if (route.meta && route.meta.roles) {
    // return roles.some(role => route.meta.roles.indexOf(role) >= 0)
    return route.meta.roles.some(routeRole => routeRole === role)
  } else {
    /* 无附加条件,即对所有用户开放 */
    return true
  }
}

export default permission
