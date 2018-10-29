<template>
  <div class="menu-wrapper">
    <!-- :routes="permissionRouters",permissionRouters来自于Vuex 
        item.hidden默认为false -->

    <!-- router非隐藏，有children（根组件Layout），再渲染 -->
    <template 
      v-for="item in routes" 
      v-if="!item.hidden && item.children"> 

      <!-- 仅单个一级菜单项 即单个children，且children无子children 直接router-link-->  
      <router-link 
        v-if="item.children.length === 1 && !item.children[0].children && !item.alwaysShow"  
        :to="item.path+'/'+item.children[0].path" 
        :key="item.children[0].name">

        <!-- 一级菜单项标题 -->
        <el-menu-item 
          :index="item.path+'/'+item.children[0].path" 
          :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon 
            v-if="item.children[0].meta && item.children[0].meta.icon" 
            :icon-class="item.children[0].meta.icon">
          </svg-icon>
          <span v-if="item.children[0].meta && item.children[0].meta.title">
            {{item.children[0].meta.title}}
          </span>
        </el-menu-item>

      </router-link>

      <!-- 有二级菜单项 即多个children或children有子children 先使用submenu生成二级菜单-->
      <el-submenu   
        v-else :index="item.name||item.path" 
        :key="item.name">

        <!-- 一级菜单标题 仅作为标题 无router-link-->
        <template slot="title">
          <svg-icon 
            v-if="item.meta && item.meta.icon" 
            :icon-class="item.meta.icon">
          </svg-icon>
          <span v-if="item.meta && item.meta.title">
            {{item.meta.title}}
          </span>
        </template>

        <template 
          v-for="child in item.children" 
          v-if="!child.hidden">

          <!-- item的children还有子children 则此children递归调用当前组件 -->
          <sidebar-item 
            :is-nest="true" 
            class="nest-menu" 
            v-if="child.children && child.children.length > 0" 
            :routes="[child]" 
            :key="child.path">
          </sidebar-item>

          <!-- item的children无子children 即多个children，当前children直接router-link -->
          <router-link 
            v-else :to="item.path+'/'+child.path" 
            :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <svg-icon 
                v-if="child.meta&&child.meta.icon" 
                :icon-class="child.meta.icon">
              </svg-icon>
              <span v-if="child.meta&&child.meta.title">
                {{child.meta.title}}
              </span>
            </el-menu-item>
          </router-link>

        </template>

      </el-submenu>

    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  }
}
</script>
