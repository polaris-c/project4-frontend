<template>
  <scroll-bar>
    <el-menu 
      mode="vertical" 
      :default-active="$route.path" 
      :collapse="isCollapse" 
      background-color="#304156" 
      text-color="#fff" 
      active-text-color="#409EFF"> 
      <!-- #304156 0593D3 unique-opened-->

      <sidebar-item :routes="permissionRouters"></sidebar-item>
      
    </el-menu>
  </scroll-bar> 
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'permissionRouters',
      'sidebar'
    ]),
    // routes() {
    //   console.log('*** Sidebar $router.options.routes: ', this.$router.options.routes)
    //   return this.$router.options.routes
    // },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
