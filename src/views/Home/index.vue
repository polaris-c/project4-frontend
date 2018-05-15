<template>
  <!-- 人员信息 -->
  <div class="dashboard-container">

    <div class="avatar-wrapper">
      <img class="user-avatar" :src="avatar">
        <!-- :src="avatar+'?imageView2/1/w/80/h/80'" -->
    </div>

    <div class="dashboard-text">
      username: {{ username }}
    </div>

    <div class="dashboard-text">
      name: {{ name }}
    </div>

    <div class="dashboard-text">
      roles: {{ roles }}
        <!-- <span  
          v-for='role in roles' 
          :key='role'>
          {{ role }}
        </span> -->
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'username',
      'name',
      'roles',
      'avatar'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.user {
  &-avatar {
    width: 300px;
    height: 200px;
  }
}
</style>
