import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  console.log('*** Permission router.beforeEach to: ', to)
  console.log('*** Permission router.beforeEach from: ', from)
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo') // 拉取用户信息
          .then(res => {
            console.log('*** Permission router.beforeEach store.dispatch(GetInfo) then res: ', res)
            const roles = res.data.roles
            store.dispatch('generateRoutes', { roles })
              .then(() => {
                router.addRoutes(store.getters.addRouters)
                console.log('*** Permission router.beforeEach store.dispatch(generateRoutes)')
                next({ ...to, replace: true })
              })
          })
          .catch(() => {
            store.dispatch('FedLogOut')
              .then(() => {
                console.log('*** Permission router.beforeEach store.dispatch(FedLogOut)')
                Message.error('验证失败,请重新登录')
                next({ path: '/login' })
              })
          })
      } else {
        console.log('*** Permission router.beforeEach UserInfo is OK, router: ', router)
        next() // 当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  console.log('*** Permission router.afterEach')
  NProgress.done() // 结束Progress
})
