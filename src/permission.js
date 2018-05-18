import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken, getName } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  console.log('<<<<<<<< Jump Start ======')
  // console.log('*** Permission router.beforeEach to: ', to)
  // console.log('*** Permission router.beforeEach from: ', from)
  NProgress.start()
  if (getToken() && getName()) {
    if (to.path === '/login') {
      // console.log('*** Permission router.beforeEach is to login ')
      next({ path: '/login' })
      NProgress.done()
    } else {
      // console.log('*** Permission router.beforeEach store.getters.role: ', store.getters.role)
      const currentRole = store.getters.role
      if (currentRole !== 1 && currentRole !== 2 && currentRole !== 3) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo') // 拉取用户信息
          .then(res => {
            console.log('*** Permission router.beforeEach store.dispatch(GetInfo) is OK then res: ', res)
            const role = res.data.role
            store.dispatch('generateRoutes', { role })
              .then(() => {
                router.addRoutes(store.getters.addRouters)
                console.log('*** Permission router.beforeEach store.dispatch(generateRoutes) is OK \n|||| |||| LOGIN & GETINFO complete. |||| |||| \n|||| |||| Prepare to redirection |||| ||||')
                next({ ...to, replace: true })
              })
          })
          .catch(err => {
            console.log('++++ ++++ Permission router.beforeEach store.dispatch(GetInfo) Error ++++ ++++', err)
            store.dispatch('FedLogOut')
              .then(() => {
                Message.error('验证失败,请重新登录')
                next({ path: '/login' })
              })
          })
      } else {
        console.log('*** Permission router.beforeEach UserInfo is already OK')
        next() // 当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      // console.log('*** Permission router.beforeEach in whiteList: ', whiteList)
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  console.log('*** Permission router.afterEach is OK \n====== Jump Over >>>>>>>>')
  NProgress.done() // 结束Progress
})
