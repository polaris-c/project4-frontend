<template>
  <div class="app-container">

    <div style="width: 100%;">

      <!-- 搜索输入框 -->
      <el-input 
        placeholder="请输入搜索内容" 
        v-model="searchInput" 
        style="width: 500px;"
        class="input-with-select">
        <el-button 
          slot="append" 
          icon="el-icon-search"
          @click = "handleSearch()" >
        </el-button>
      </el-input>

      <!-- 新增按钮 -->
      <el-button 
        type="primary" 
        style="margin-left: 30px;" 
        @click = "handleCreate()"
        round>
        新增样本
      </el-button>

      <!-- 更新按钮 -->
      <el-button 
        type="success" 
        style="margin-left: 20px;"
        @click="updateMatch()"
        round>
        更新结果
      </el-button>

      <!-- 下载按钮 -->
      <el-button 
        type="" 
        style="margin-left: 20px;"
        @click="handleDownloadList()"
        round>
        数据导出
      </el-button>

    </div>

    <!-- 数据表格 -->
    <el-table 
      :data="currentList" 
      v-loading.body="listLoading" 
      element-loading-text="载入中..." 
      style="width: 100%; margin-top: 20px;" 
      border fit highlight-current-row stripe>

      <el-table-column
        align="center"
        type="index"
        :index="startIndex"
        fixed="left"
        width="50">
      </el-table-column>

      <el-table-column 
        align="center" 
        label="sampleID" 
        fixed="left"
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.sampleID}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="sname" 
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.sname}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="inputDate" 
        width="150">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.inputDate}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="sampleState" 
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.sampleState}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="sampleOrigin" 
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.sampleOrigin}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="sampleType" 
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.sampleType}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="sampleMake" 
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.sampleMake}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="sampleDraw" 
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.sampleDraw}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="sampleAnalyse" 
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.sampleAnalyse}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="analyseCondition" 
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.analyseCondition}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center"
        fixed="right"
        label="操作"
        width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleDetail(scope.$index, scope.row)">
            <!-- @click="handleEdit(scope.$index, scope.row)" -->
            详 细
          </el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">
            编 辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        :total="listLength"
        layout="total, sizes, prev, pager, next, jumper"
        background>
      </el-pagination>
    </div>

    <!-- 弹出框 详细展示 -->
    <el-dialog title="详细展示" :visible.sync="dialogShowVisible">
      <div style="margin-left: 30px;">
        <img v-if="showExploSampleInfo.picUrl" :src="showExploSampleInfo.picUrl" class="avatar">
      </div>

      <ul>
        <li v-for="(value, key) in showExploSampleInfo" v-if="key !== 'picUrl' ">
          <!-- && key !== 'exploSampleFile' -->
          {{ key }}: {{ value }}
        </li>
      </ul>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleDownload()">导出</el-button>
        <el-button type="" @click="dialogShowVisible = false">返回</el-button>
      </div>

    </el-dialog>

    <!-- 弹出框 编辑功能 -->
    <el-dialog title="编辑表单" :visible.sync="dialogFormVisible">

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

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateEdit">提交</el-button>
        <el-button type="" @click="dialogFormVisible = false" plain>取消</el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
import { getExploSampleList, showExploSample, deleteExploSample, updateExploSample, updateExploMatch } from '@/api/table'
import { mapGetters } from 'vuex'

export default {
  name: 'explosiveCommonSamplesTable',

  data() {
    return {
      searchInput: '',
      list: [],
      listLength: 0,
      listLoading: false,
      currentList: [],
      currentPage: 1,
      pageSize: 10,
      startIndex: 1,

      dialogFormVisible: false,
      dialogShowVisible: false,

      showExploSampleInfo: {}, // 数据详情对象
      uploadForm: {}, // 上传用表单数据对象
      explosiveComSamplesForm: { // 显示用表单数据对象
        id: null,
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
      explosiveComSamplesRules: {
        sname: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px'
    }
  },

  computed: {
    ...mapGetters([
      'role'
    ])
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      this.listLoading = true
      getExploSampleList().then(response => {
        this.list = response.data
        this.listLoading = false
        this.handleCurrentChange(this.currentPage)
      })
    },

    handleSearch() {
      alert('Search: ' + this.searchInput)
    },

    handleCreate() {
      this.$router.push('/CommonSamples/addExplosive')
    },

    updateMatch() {
      updateExploMatch().then(res => {
        this.$notify({
          title: '通知',
          message: '已更新炸药和原材料匹配结果',
          type: 'success',
          duration: 10000
        });
      })
    },

    handleDownloadList() {
      alert('已导出！')
    },

    handleDetail(index, row) {
      showExploSample(row.id).then(res => {
        this.showExploSampleInfo = res.data
      })
      this.dialogShowVisible = true
    },

    handleEdit(index, row) {
      console.log('--- Edit: ', index, row)
      this.explosiveComSamplesForm = Object.assign({}, row)
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['explosiveComSamplesComponent'].clearValidate()
      })
    },

    updateEdit() {
      this.$refs['explosiveComSamplesComponent'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.explosiveComSamplesForm)

          updateData(tempData).then(() => {
            /* for...in循环 对Array的循环得到的是String而不是Numbe */
            for (const v in this.list) {
              if (this.list[v].id === tempData.id) {
                const index = v
                this.list.splice(index, 1, tempData)
                this.handleCurrentChange(this.currentPage)
                break
              }
            }
            this.dialogFormVisible = false
            // this.$notify({
            //   title: '成功',
            //   message: '更新成功',
            //   type: 'success',
            //   duration: 2000
            // })
          })
        }
      })
    },

    handleDelete(index, row) {
      console.log('--- Deleted: ', index, row, this.role)
      deleteExploSample(row.id).then(res => {
        console.log('--- Deleted! res: ', res)
        this.fetchData()
      })
    },

    handleDownload() {
      alert('已导出！')
    },

    handleSizeChange(newPageSize) {
      this.pageSize = newPageSize
      if (this.currentPage === 1) {
        this.handleCurrentChange(1)
      } else {
        this.currentPage = 1
      }
    },

    handleCurrentChange(currentPageNum) {
      this.currentList = []
      this.listLength = this.list.length

      const residueItemNum = this.listLength - (currentPageNum - 1) * this.pageSize
      let newItemIndex = (currentPageNum - 1) * this.pageSize
      this.startIndex = newItemIndex + 1
      for (let i = 0; i < this.pageSize && i < residueItemNum; i++) {
        this.currentList[i] = this.list[newItemIndex]
        newItemIndex++
      }
    },

    /* 弹出框 */
    beforeAvatarUpload(file) {
      console.log('--- beforeAvatarUpload', file)
      window.URL = window.URL || window.webkitURL
      this.explosiveComSamplesForm.picUrl = window.URL.createObjectURL(file)
      console.log('--- beforeAvatarUpload URL: ', this.explosiveComSamplesForm.picUrl)
    },
    handleAvatarSuccess(res, file) {
      console.log('--- handleAvatarSuccess', res, file)
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

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