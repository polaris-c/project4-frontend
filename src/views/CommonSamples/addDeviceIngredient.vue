<template>
  <div class="dashboard-container">

    <el-row :gutter="50">
      <!-- 左栏-样本信息 -->
        <el-col :span="10">
          <div>
            <el-form
              :model="explosiveComSamplesForm"
              :rules="explosiveComSamplesRules"
              ref="explosiveComSamplesComponent"
              label-width="100px" >

              <el-form-item label="样品名称" prop="sname">
                <el-input v-model="explosiveComSamplesForm.sname" clearable></el-input>
              </el-form-item>

              <el-form-item label="样本编号" prop="sampleID">
                <el-input v-model="explosiveComSamplesForm.sampleID" clearable></el-input>
              </el-form-item>

              <el-form-item label="处理人员编号" prop="user_id">
                <el-input v-model="explosiveComSamplesForm.user_id" clearable></el-input>
              </el-form-item>

              <el-form-item label="录入时间" prop="inputDate">
                <el-date-picker 
                  v-model="explosiveComSamplesForm.inputDate"
                  type="datetime"
                  placeholder="请输入录入时间"
                  style="width: 100%;">
                </el-date-picker>
                <!-- {{ explosiveComSamplesForm.inputDate }} -->
              </el-form-item>

              <el-form-item label="样品状态" prop="sampleState">
                <el-input v-model="explosiveComSamplesForm.sampleState" clearable></el-input>
              </el-form-item>

              <el-form-item label="样品产地" prop="sampleOrigin">
                <el-input v-model="explosiveComSamplesForm.sampleOrigin" clearable></el-input>
              </el-form-item>

              <el-form-item label="样品种类" prop="sampleType">
                <el-input v-model="explosiveComSamplesForm.sampleType" clearable></el-input>
              </el-form-item>

              <el-form-item label="样品制备方法" prop="sampleMake">
                <el-input v-model="explosiveComSamplesForm.sampleMake" clearable></el-input>
              </el-form-item>

              <el-form-item label="样品提取方法" prop="sampleDraw">
                <el-input v-model="explosiveComSamplesForm.sampleDraw" clearable></el-input>
              </el-form-item>

              <el-form-item label="样品分析方法" prop="sampleAnalyse">
                <el-input v-model="explosiveComSamplesForm.sampleAnalyse" clearable></el-input>
              </el-form-item>

              <el-form-item label="分析条件" prop="analyseCondition">
                <el-input v-model="explosiveComSamplesForm.analyseCondition" clearable></el-input>
              </el-form-item>

              <el-form-item label="图片描述" prop="picDescrip">
                <el-input v-model="explosiveComSamplesForm.picDescrip" clearable></el-input>
              </el-form-item>

              <el-form-item label="样本图片" prop="picUrl">
                <el-upload 
                  class=""
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                  :on-success="handleAvatarSuccess"
                  >
                  <img v-if="explosiveComSamplesForm.picUrl" :src="explosiveComSamplesForm.picUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon avatar-uploader"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label="备注" prop="note">
                <el-input type="textarea" v-model="explosiveComSamplesForm.note" clearable></el-input>
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

      <!-- 右栏-文件信息 -->
        <el-col :span="10">
          <div v-for="fileItem in explosiveComSamplesFile" :key="fileItem.key">

            <el-form 
              :model="fileItem"
              ref="fileItems"
              label-width="150px">

              <el-form-item label="检测设备名称及型号" prop="detectDevice">
                <el-input v-model="fileItem.detectDevice" clearable></el-input>
              </el-form-item>

              <el-form-item label="仪器厂家" prop="detectMrfs">
                <el-input v-model="fileItem.detectMrfs" clearable></el-input>
              </el-form-item>

              <el-form-item label="检测数据类型" prop="detectType">
                <el-select v-model="fileItem.detectType" placeholder="请选择数据类型">
                  <el-option label="FTIR" value="1"></el-option>
                  <el-option label="Raman" value="2"></el-option>
                  <el-option label="GC-MS" value="3"></el-option>
                  <el-option label="XRD" value="4"></el-option>
                  <el-option label="XRF" value="5"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="录入文档格式" prop="docType">
                <el-select v-model="fileItem.docType" placeholder="请选择文档格式类型">
                  <el-option label="TXT" value="1"></el-option>
                  <el-option label="Excel" value="2"></el-option>
                  <el-option label="PDF" value="3"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="上传文件" prop="">
                <el-upload
                  class=""
                  action=""
                  :limit="1"
                  :file-list="explosiveComSamplesFile.docUrl"
                  >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>

              <el-form-item>
                <el-button type="warning" @click="resetFile(fileItem.key)" plain>重置此文件</el-button>
                <el-button type="danger" @click="removeFile(fileItem)" plain>删除此文件</el-button>
              </el-form-item>
              
            </el-form>

            <hr>

          </div>
          <el-button type="primary" @click="addFile">新增文件</el-button>
        </el-col>
      </el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'addDeviceIngredient',

  computed: {
    ...mapGetters([
      'name'
    ])
  },

  data() {
    return {
      explosiveComSamplesForm: {
        sname: '',
        sampleID: '',
        user_id: '',
        inputDate: null,
        sampleState: '',
        sampleOrigin: '',
        sampleType: '',
        sampleMake: '',
        sampleDraw: '',
        sampleAnalyse: '',
        analyseCondition: '',
        picUrl: null,
        picDescrip: '',
        note: ''
      },
      explosiveComSamplesFile: [
        {
          user_id: '',
          inputDate: null,
          detectDevice: '',
          detectMrfs: '',
          detectType: null,
          docType: null,
          docUrl: null,
          key: Date.now()
        }
      ],
      explosiveComSamplesRules: {
        sname: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        inputDate: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]
      }
    }
  },

  watch: {
    explosiveComSamplesFile: function() {
      // console.log(this.explosiveComSamplesFile)
    }
  },

  mounted() {
    this.explosiveComSamplesForm.inputDate = new Date()
    this.explosiveComSamplesForm.user_id = this.name
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      console.log(this.$refs)
      this.$refs[formName].resetFields()
    },
    goBack() {
      this.$router.go(-1)
    },

    beforeAvatarUpload(file) {
      console.log('--- beforeAvatarUpload', file)
      window.URL = window.URL || window.webkitURL
      this.explosiveComSamplesForm.picUrl = window.URL.createObjectURL(file)
    },
    handleAvatarSuccess(res, file) {
      console.log('--- handleAvatarSuccess', res, file)
    },

    addFile() {
      this.explosiveComSamplesFile.push(
        {
          user_id: '',
          inputDate: null,
          detectDevice: '',
          detectMrfs: '',
          detectType: null,
          docType: null,
          docUrl: null,
          key: Date.now()
        }
      )
    },
    resetFile(fileKey) {
      // console.log(fileKey, this.$refs)
      for (const fileIndex in this.$refs.fileItems) {
        if (this.$refs.fileItems[fileIndex].model.key === fileKey) {
          this.$refs.fileItems[fileIndex].resetFields()
          break
        }
      }
    },
    removeFile(fileItem) {
      const fileIndex = this.explosiveComSamplesFile.indexOf(fileItem)
      this.explosiveComSamplesFile.splice(fileIndex, 1)
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
    width: 300px;
    height: 200px;
    display: block;
  }
</style>
