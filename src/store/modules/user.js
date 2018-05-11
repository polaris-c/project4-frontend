import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      console.log('*** store/user SET_TOKEN: ', state.token)
    },
    SET_NAME: (state, name) => {
      state.name = name
      console.log('*** store/user SET_NAME: ', state.name)
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
      console.log('*** store/user SET_AVATAR: ', state.avatar)
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
      console.log('*** store/user SET_ROLES: ', state.roles)
    }
  },

  actions: {
    /* 登录 */
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password)
          .then(response => {
            const data = response.data
            setToken(data.token)
            commit('SET_TOKEN', data.token)
            console.log('*** store/user Login is OK, response: ', response)
            resolve()
          })
          .catch(error => {
            console.log('*** store/user Login is error: ', error)
            reject(error)
          })
      })
    },

    /* 获取用户信息 */
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token)
          .then(response => {
            const data = response.data
            commit('SET_ROLES', data.roles)
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.avatar)
            console.log('*** store/user GetInfo is OK, response: ', response)
            resolve(response)
          })
          .catch(error => {
            console.log('*** store/user GetInfo error: ', error)
            reject(error)
          })
      })
    },

    /* 登出 */
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout()
          .then((response) => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            console.log('*** store/user LogOut is OK, response: ', response)
            resolve()
          })
          .catch(error => {
            console.log('*** store/user LogOut error: ', error)
            reject(error)
          })
      })
    },

    /* 前端 登出 */
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        console.log('*** store/user FedLogOut is OK, response: ', resolve)
        resolve()
      })
    }
  }
}

export default user
