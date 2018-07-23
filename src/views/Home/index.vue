<template>
  <!-- 人员信息 -->
  <div class="dashboard-container">

    <div class="avatar-wrapper">
      <img class="user-avatar" :src="avatar">
        <!-- :src="avatar+'?imageView2/1/w/80/h/80'" -->
    </div>

    <div class="dashboard-text">
      账户: {{ username }}
    </div>

    <div class="dashboard-text">
      姓名: {{ name }}
    </div>

    <div class="dashboard-text">
      系统职权: {{ roleStr }}
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
      'role',
      'avatar'
    ])
  },
  data() {
    return {
      roleStr: null
    }
  },
  mounted() {
    switch(this.role) {
      case 1: this.roleStr = '超级管理员'
        break
      case 2: this.roleStr = '管理员'
        break
      case 3: this.roleStr = '普通用户'
        break
      default: this.roleStr = '未指定'
        break
    }
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
