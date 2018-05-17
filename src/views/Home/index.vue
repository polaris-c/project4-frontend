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
      role: {{ role }}
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
