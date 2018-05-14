const getters = {
  sidebar: state => state.app.sidebar,

  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  name: state => state.user.name,
  roles: state => state.user.roles,
  
  addRouters: state => state.permission.addRouters,
  permissionRouters: state => state.permission.routers
}
export default getters
