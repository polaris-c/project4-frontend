<template>
  <div class="dashboard-container">

    <el-row >
      <!-- 样本信息 -->
        <el-col :span="6"></el-col>
        <el-col :span="12">
          <div>
            <el-form
              :model="deviceShapeForm"
              
              ref="explosiveComSamplesComponent"
              label-width="100px" >

              <el-form-item label="装置名称" prop="sname">
                <el-input v-model="deviceShapeForm.sname" clearable></el-input>
              </el-form-item>

              <el-form-item label="装置编号" prop="sampleID">
                <el-input v-model="deviceShapeForm.sampleID" clearable></el-input>
              </el-form-item>

              <el-form-item label="处理人员编号" prop="user_id">
                <el-input v-model="deviceShapeForm.user_id" clearable></el-input>
              </el-form-item>

              <el-form-item label="录入时间" prop="inputDate">
                <el-date-picker 
                  v-model="deviceShapeForm.inputDate"
                  type="datetime"
                  placeholder="请输入录入时间"
                  style="width: 100%;">
                </el-date-picker>
              </el-form-item>

              <el-form-item label="装置类别" prop="isCircuit">
                <el-radio-group v-model="deviceShapeForm.isCircuit">
                  <el-radio :label="0">电路板</el-radio>
                  <el-radio :label="1">非电路板</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="厂家" prop="mrfs">
                <el-input v-model="deviceShapeForm.mrfs" clearable></el-input>
              </el-form-item>

              <el-form-item label="型号" prop="sampleModel">
                <el-input v-model="deviceShapeForm.sampleModel" clearable></el-input>
              </el-form-item>

              <el-form-item label="商标" prop="trademark">
                <el-input v-model="deviceShapeForm.trademark" clearable></el-input>
              </el-form-item>

              <el-form-item label="功能" prop="function">
                <el-input v-model="deviceShapeForm.function" clearable></el-input>
              </el-form-item>

              <el-form-item label="所属装置" prop="belongTo">
                <el-input v-model="deviceShapeForm.belongTo" clearable></el-input>
              </el-form-item>

              <el-form-item label="样本图片" prop="originalUrl">
                <el-upload 
                  class=""
                  action=""
                  :show-file-list="false"
                  :before-upload="beforePicUpload"
                  >
                  <img v-if="deviceShapeForm.originalUrl" :src="deviceShapeForm.originalUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon avatar-uploader"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label="备注" prop="note">
                <el-input type="textarea" v-model="deviceShapeForm.note" clearable></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="warning" @click="resetForm('explosiveComSamplesComponent')" plain>重置样本信息</el-button>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('explosiveComSamplesComponent')">全部提交</el-button>
                <el-button type="" @click="goBack()">取消</el-button>
              </el-form-item>

            </el-form>
          </div>
        </el-col>
        <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addDevShapeSample } from '@/api/create'

export default {
  name: 'addDeviceShape',

  computed: {
    ...mapGetters([
      'name'
    ])
  },

  data() {
    return {
      uploadForm: {}, // 上传基本信息用表单数据对象
      deviceShapeForm: {
        sname: null,
        sampleID: null,
        isCircuit: null,
        user_id: null,
        inputDate: null,
        mrfs: null,
        sampleModel: null,
        trademark: null,
        function: null,
        belongTo: null,
        originalUrl: null,
        originalResolution: null,
        nomUrl: null,
        nomResolution: null,
        note: null
      }
    }
  },

  mounted() {
    this.deviceShapeForm.inputDate = new Date()
    this.deviceShapeForm.user_id = this.name
    this.uploadForm = new FormData()
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.uploadForm.append('sname', this.deviceShapeForm.sname)
          this.uploadForm.append('sampleID', this.deviceShapeForm.sampleID)
          this.uploadForm.append('isCircuit', this.deviceShapeForm.isCircuit)
          this.uploadForm.append('user_id', this.deviceShapeForm.user_id)
          this.uploadForm.append('inputDate', this.deviceShapeForm.inputDate)
          this.uploadForm.append('mrfs', this.deviceShapeForm.mrfs)
          this.uploadForm.append('sampleModel', this.deviceShapeForm.sampleModel)
          this.uploadForm.append('trademark', this.deviceShapeForm.trademark)
          this.uploadForm.append('function', this.deviceShapeForm.function)
          this.uploadForm.append('belongTo', this.deviceShapeForm.belongTo)
          this.uploadForm.append('originalResolution', this.deviceShapeForm.originalResolution)
          this.uploadForm.append('nomUrl', this.deviceShapeForm.nomUrl)
          this.uploadForm.append('nomResolution', this.deviceShapeForm.nomResolution)
          this.uploadForm.append('note', this.deviceShapeForm.note)

          addDevShapeSample(this.uploadForm).then(res => {
            console.log('uploadForm submit! res: ', res)
            this.goBack()
          })
        } else {
          console.log('++++ ++++ error submit! ++++ ++++')
          return false
        }
      })
    },
    resetForm(formName) {
      console.log(this.$refs)
      this.$refs[formName].resetFields()
    },
    beforePicUpload(file) {
      console.log('--- beforePicUpload', file)
      window.URL = window.URL || window.webkitURL
      this.deviceShapeForm.originalUrl = window.URL.createObjectURL(file)
      this.uploadForm.append('originalUrl', file, file.name)
      return false
    },

    goBack() {
      this.$router.go(-1)
    },
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
    width: 400px;
    height: 300px;
    display: block;
  }
</style>
