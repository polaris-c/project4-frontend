<template>
  <div class="dashboard-container">

    <el-row :gutter="50">
      <!-- 左栏-物证信息 -->
        <el-col :span="10">
          <div>
            <el-form
              :model="explosiveCaseSamplesForm"
              :rules="explosiveComSamplesRules"
              ref="explosiveCaseSamplesComponent"
              label-width="100px" >

              <el-form-item label="案件编号" prop="caseID">
                <el-input v-model="explosiveCaseSamplesForm.caseID" clearable></el-input>
              </el-form-item>

              <el-form-item label="物证编号" prop="evidenceID">
                <el-input v-model="explosiveCaseSamplesForm.evidenceID" clearable></el-input>
              </el-form-item>

              <el-form-item label="处理人员编号" prop="user_id">
                <el-input v-model="explosiveCaseSamplesForm.user_id" clearable></el-input>
              </el-form-item>

              <el-form-item label="录入时间" prop="inputDate">
                <el-date-picker 
                  v-model="explosiveCaseSamplesForm.inputDate"
                  type="datetime"
                  placeholder="请输入录入时间"
                  style="width: 100%;">
                </el-date-picker>
                <!-- {{ explosiveCaseSamplesForm.inputDate }} -->
              </el-form-item>

              <el-form-item label="物证状态" prop="eviState">
                <el-input v-model="explosiveCaseSamplesForm.eviState" clearable></el-input>
              </el-form-item>

              <el-form-item label="物证制备方法" prop="eviMake">
                <el-input v-model="explosiveCaseSamplesForm.eviMake" clearable></el-input>
              </el-form-item>

              <el-form-item label="物证提取方法" prop="eviDraw">
                <el-input v-model="explosiveCaseSamplesForm.eviDraw" clearable></el-input>
              </el-form-item>

              <el-form-item label="物证分析方法" prop="eviAnalyse">
                <el-input v-model="explosiveCaseSamplesForm.eviAnalyse" clearable></el-input>
              </el-form-item>

              <el-form-item label="分析条件" prop="analyseCondition">
                <el-input v-model="explosiveCaseSamplesForm.analyseCondition" clearable></el-input>
              </el-form-item>

              <el-form-item label="图片描述" prop="picDescrip">
                <el-input v-model="explosiveCaseSamplesForm.picDescrip" clearable></el-input>
              </el-form-item>

              <el-form-item label="物证图片" prop="picUrl">
                <el-upload 
                  class=""
                  action=""
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                  >
                  <img v-if="explosiveCaseSamplesForm.picUrl" :src="explosiveCaseSamplesForm.picUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon avatar-uploader"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label="备注" prop="note">
                <el-input type="textarea" v-model="explosiveCaseSamplesForm.note" clearable></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="warning" @click="resetForm('explosiveCaseSamplesComponent')" plain>重置物证信息</el-button>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('explosiveCaseSamplesComponent')">全部提交</el-button>
                <el-button type="" @click="goBack()">取消</el-button>
              </el-form-item>

            </el-form>
          </div>
        </el-col>

      <!-- 右栏-文件信息 -->
        <el-col :span="10">
          <div v-for="fileItem in explosiveCaseSamplesFile" :key="fileItem.key">

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
                  <el-option label="XRD" value="3"></el-option>
                  <el-option label="XRF" value="4"></el-option>
                  <el-option label="GC-MS" value="5"></el-option>
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
                  :file-list="explosiveCaseSamplesFile.docUrl"
                  :before-upload="beforeFileUpload"
                  >
                  <el-button size="small" type="primary" @click="recordKey(fileItem)">点击上传</el-button>
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
import { addExploEvis, addExploEviFiles } from '@/api/create'

export default {
  name: 'addExplosiveComSamples',

  computed: {
    ...mapGetters([
      'name'
    ])
  },

  data() {
    return {
      uploadForm: {}, // 上传基本信息用表单数据对象
      explosiveCaseSamplesForm: {
        caseID: null,
        evidenceID: null,
        user_id: null,
        inputDate: null,
        eviState: null,
        eviMake: null,
        eviDraw: null,
        eviAnalyse: null,
        analyseCondition: null,
        picUrl: null,
        picDescrip: null,
        note: null
      },
      uploadFileIndex: -1, // 上传数据文件时记录数据文件信息号
      uploadFileForm: [], // 上传数据文件信息用表单数据对象
      explosiveCaseSamplesFile: [
        {
          detectDevice: null,
          detectMrfs: null,
          detectType: null,
          docType: null,
          docUrl: null,
          key: Date.now()
        }
      ],
      explosiveComSamplesRules: {
        caseID: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        inputDate: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]
      }
    }
  },

  watch: {
    explosiveCaseSamplesFile: function() {
      // console.log(this.explosiveCaseSamplesFile)
    }
  },

  mounted() {
    this.explosiveCaseSamplesForm.inputDate = new Date()
    this.explosiveCaseSamplesForm.user_id = this.name
    this.uploadForm = new FormData()
    let formData = new FormData()
    this.uploadFileForm.push(formData)
  },

  methods: {
    /* 提交物证基本信息 */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.uploadForm.append('caseID', this.explosiveCaseSamplesForm.caseID)
          this.uploadForm.append('evidenceID', this.explosiveCaseSamplesForm.evidenceID)
          this.uploadForm.append('user_id', this.explosiveCaseSamplesForm.user_id)
          this.uploadForm.append('inputDate', this.explosiveCaseSamplesForm.inputDate)
          this.uploadForm.append('eviState', this.explosiveCaseSamplesForm.eviState)
          this.uploadForm.append('eviMake', this.explosiveCaseSamplesForm.eviMake)
          this.uploadForm.append('eviDraw', this.explosiveCaseSamplesForm.eviDraw)
          this.uploadForm.append('eviAnalyse', this.explosiveCaseSamplesForm.eviAnalyse)
          this.uploadForm.append('analyseCondition', this.explosiveCaseSamplesForm.analyseCondition)
          this.uploadForm.append('picDescrip', this.explosiveCaseSamplesForm.picDescrip)
          this.uploadForm.append('note', this.explosiveCaseSamplesForm.note)

          addExploEvis(this.uploadForm).then(res => {
            console.log('uploadForm submit! res: ', res)
            this.submitFiles(res.data.id)
          })
        } else {
          console.log('++++ ++++ error submit! ++++ ++++')
          return false
        }
      })
    },

    /* 提交物证数据文件 */
    submitFiles(id) {
      for (const i in this.$refs.fileItems) {
        this.$refs.fileItems[i].validate(valid => {
          if(valid) {
            this.uploadFileForm[i].append('exploEvi', id) 
            this.uploadFileForm[i].append('detectDevice', this.explosiveCaseSamplesFile[i].detectDevice) 
            this.uploadFileForm[i].append('detectMrfs', this.explosiveCaseSamplesFile[i].detectMrfs) 
            this.uploadFileForm[i].append('detectType', this.explosiveCaseSamplesFile[i].detectType) 
            this.uploadFileForm[i].append('docType', this.explosiveCaseSamplesFile[i].docType) 
            addExploEviFiles(this.uploadFileForm[i]).then(res => {
              console.log('uploadFileForm submit! res: ', res)
            })
          } else {
            console.log('++++ ++++ error submitFiles! ++++ ++++')
            return false
          }
        })
      }
      this.goBack()
    },

    /* 物证基本信息表单操作 */
    resetForm(formName) {
      console.log(this.$refs)
      this.$refs[formName].resetFields()
    },
    beforeAvatarUpload(file) {
      console.log('--- beforeAvatarUpload', file)
      window.URL = window.URL || window.webkitURL
      this.explosiveCaseSamplesForm.picUrl = window.URL.createObjectURL(file)
      this.uploadForm.append('picUrl', file, file.name)
      return false
    },

    /* 物证文件信息表单操作 */
    addFile() {
      this.explosiveCaseSamplesFile.push(
        {
          detectDevice: null,
          detectMrfs: null,
          detectType: null,
          docType: null,
          docUrl: null,
          key: Date.now()
        }
      )
      let formData = new FormData()
      this.uploadFileForm.push(formData)
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
      const fileIndex = this.explosiveCaseSamplesFile.indexOf(fileItem)
      this.explosiveCaseSamplesFile.splice(fileIndex, 1)
      this.uploadFileForm.splice(fileIndex, 1)
    },
    recordKey(fileItem) {
      this.uploadFileIndex = this.explosiveCaseSamplesFile.indexOf(fileItem)
      console.log('--- recordKey uploadFileIndex', this.uploadFileIndex)
    },
    beforeFileUpload(file) {
      console.log('--- beforeFileUpload uploadFileIndex', this.uploadFileIndex)
      if(this.uploadFileIndex >= 0) {
        this.uploadFileForm[this.uploadFileIndex].append('docUrl', file, file.name)
      } else {
        console.log('++++ ++++ error beforeFileUpload! ++++ ++++')
      }
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
