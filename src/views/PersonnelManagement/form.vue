<template>
  <div class="people-container people-text">

    <el-form 
      :model="peopleInfoForm" 
      :rules="rules" 
      ref="peopleInfoComponent" 
      label-width="100px" 
      class="">

      <el-row :gutter="60">

        <el-col :span="12">

          <!-- 表单左栏 -->
          <div>

            <el-form-item label="人员编号" prop="username">
              <el-input v-model="peopleInfoForm.username" clearable></el-input>
            </el-form-item>

            <el-form-item label="人员姓名" prop="name">
              <el-input v-model="peopleInfoForm.name" clearable></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input  
                  v-model="peopleInfoForm.password" 
                  type="password" 
                  auto-complete="off" 
                  clearable>
                </el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="checkPassword">
                <el-input 
                  v-model="peopleInfoForm.checkPassword" 
                  type="password" 
                  auto-complete="off" 
                  clearable>
                </el-input>
            </el-form-item>

            <el-form-item label="性别" prop="gender">
                <el-radio-group v-model="peopleInfoForm.gender">
                  <el-radio label="male">男</el-radio>
                  <el-radio label="female">女</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="电话" prop="phone">
                <el-input v-model="peopleInfoForm.phone"></el-input>
            </el-form-item>

            <el-form-item label="权限" prop="role">
                <el-select v-model="peopleInfoForm.role" placeholder="请选择权限">
                  <el-option v-if = "superPermission" label="管理员" value=2></el-option>
                  <el-option label="用户" value=3></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="备注" prop="note">
                <el-input type="textarea" v-model="peopleInfoForm.note"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('peopleInfoComponent')">确定</el-button>
                <el-button type="warning" @click="resetForm('peopleInfoComponent')" plain>重置</el-button>
                <el-button type="" @click="goBack()">取消</el-button>
            </el-form-item>

          </div>

        </el-col>

        <el-col :span="12">

          <!-- 表单右栏 -->
          <div>

            <div class="people-text">
              照片上传
            </div>

            <el-form-item prop="picUrl">
              <el-upload 
                class=""
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                >
                <!-- :on-change="showAvatar" -->
                <img v-if="peopleInfoForm.picUrl" :src="peopleInfoForm.picUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon avatar-uploader"></i>
              </el-upload>
            </el-form-item>

          </div>

        </el-col>

      </el-row>

    </el-form>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addPeople } from '@/api/create'

export default {
  name: 'addPeople',

  computed: {
    ...mapGetters([
      'roles'
    ])
  },

  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.peopleInfoForm.checkPassword !== '') {
          // console.log('--- validatePassword this.$refs: ', this.$refs)
          // console.log('--- validatePassword this.peopleInfoForm: ', this.peopleInfoForm)
          this.$refs.peopleInfoComponent.validateField('checkPassword')
        }
        callback(console.log('--- validatePassword is OK'))
      }
    }

    const validateCheckPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.peopleInfoForm.password) {
        callback(new Error('两次输入不一致'))
      } else {
        callback(console.log('--- validateCheckPassword is OK'))
      }
    }

    const validateRole = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请设置权限'))
      } else {
        callback(console.log('--- validateRole is OK'))
      }
      // if (value === '1') {
      //   if (this.roles.indexOf('superAdmin') === -1) {
      //     callback(new Error('无权限设置此用户为管理员'))
      //   } else {
      //     callback(console.log('--- validateRole is OK - 注意：此用户将被设置为管理员'))
      //   }
      // } else {
      //   callback(console.log('--- validateRole is OK'))
      // }
    }

    return {
      superPermission: false,
      peopleInfoForm: {
        username: '',
        name: '',
        password: null,
        checkPassword: null,
        gender: null,
        phone: '',
        role: null,
        picUrl: null,
        note: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入人员编号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入人员姓名', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, required: true, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validateCheckPassword, required: true, trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        role: [
          { validator: validateRole, required: true, trigger: 'blur' }
        ]
      }
    }
  },

  mounted() {

    if (this.roles === 3) {
      this.superPermission = true
      console.log('--- You are the superPermission!!!', this.roles)
    }
  },

  methods: {
    handleAvatarSuccess(res, file) {
      console.log('--- handleAvatarSuccess', res, file)
    },
    beforeAvatarUpload(file) {
      console.log('--- beforeAvatarUpload', file)
      window.URL = window.URL || window.webkitURL
      this.peopleInfoForm.picUrl = window.URL.createObjectURL(file)
      console.log('--- this.picUrl: ', this.peopleInfoForm.picUrl)
    },
    // showAvatar(file, fileList) {
    //   console.log('--- showAvatar', file, fileList)
    // },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log('--- submitForm peopleInfoForm: ', this.peopleInfoForm)
        if (valid) {
          addPeople(this.peopleInfoForm).then((res) => {
            console.log('submit! res: ', res)
            this.goBack()
          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
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
