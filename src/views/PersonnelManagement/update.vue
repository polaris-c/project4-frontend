<template>
  <div class="people-container people-text">
    <div>{{ $route.params.userInfo }}</div>
    <el-button type="" @click="goBack()">取消</el-button>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addPeople } from '@/api/create'
import { getToken } from '@/utils/auth'

export default {
  name: 'addPeople',

  computed: {
    ...mapGetters([
      'role',
      'token'
    ])
  },

  data() {

    return {
      superPermission: false,
      uploadForm: {}, // 上传用表单数据对象
      peopleInfoForm: { // 显示用表单数据对象
        username: '',
        name: '',
        password: null,
        checkPassword: null,
        gender: null,
        phone: '',
        role: null,
        picUrl: null,
        note: ''
      }
    }
  },

  mounted() {
    console.log(this.$route.params.userInfo)
  },

  methods: {

    goBack() {
      this.$router.go(-1)
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.people {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 18px;
    line-height: 20px;
  }
}

  .avatar-uploader {
    border: 2px dashed #e9e9e9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-top: 10px;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
  }

  .avatar {
    width: 200px;
    height: 200px;
    display: block;
  }

</style>
