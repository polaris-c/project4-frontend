import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, getName, setName, removeName } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    username: getName(),
    name: '',
    avatar: '',
    role: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      console.log('*** store/user SET_TOKEN: ', state.token)
    },
    SET_USERNAME: (state, username) => {
      state.username = username
      console.log('*** store/user SET_USERNAME: ', state.username)
    },
    SET_NAME: (state, name) => {
      state.name = name
      console.log('*** store/user SET_NAME: ', state.name)
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
      console.log('*** store/user SET_AVATAR: ', state.avatar)
    },
    SET_ROLES: (state, role) => {
      state.role = role
      console.log('*** store/user SET_ROLES: ', state.role)
    }
  },

  actions: {
    /* 登录 */
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      setName(username)
      commit('SET_USERNAME', username)

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
            console.log('++++ ++++ store/user Login is error ++++ ++++ ', error)
            reject(error)
          })
      })
    },

    /* 获取用户信息 */
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token, state.username)
          .then(response => {
            const data = response.data
            commit('SET_ROLES', data.role)
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.picUrl)
            console.log('*** store/user GetInfo is OK, response: ', response)
            resolve(response)
          })
          .catch(error => {
            console.log('++++ ++++ store/user GetInfo error ++++ ++++ ', error)
            reject(error)
          })
      })
    },

    /* 登出 */
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_NAME', '')
        commit('SET_TOKEN', '')
        commit('SET_ROLES', '')
        removeToken()
        removeName()
        console.log('*** store/user LogOut is OK')
        resolve()
      })
    },

    /* 前端 登出 */
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        commit('SET_ROLES', '')
        removeToken()
        removeName()
        console.log('*** store/user FedLogOut is OK, response: ', resolve)
        resolve()
      })
    }
  }
}

export default user
