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

      <!-- 下载按钮 -->
      <el-button 
        type="" 
        style="margin-left: 20px;"
        @click = "handleDownloadList()"
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
            @click="dialogShowVisible = true">
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

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleDownload()">导出</el-button>
        <el-button type="" @click="dialogShowVisible = false">返回</el-button>
      </div>

    </el-dialog>

    <!-- 弹出框 编辑功能 -->
    <el-dialog title="编辑表单" :visible.sync="dialogFormVisible">

      <el-form
        :model="deviceIngredientForm"
        :rules="explosiveComSamplesRules"
        ref="deviceIngredientComponent"
        label-width="100px" >

        <el-form-item label="样品名称" prop="sname">
          <el-input v-model="deviceIngredientForm.sname" clearable></el-input>
        </el-form-item>

        <el-form-item label="样本编号" prop="sampleID">
          <el-input v-model="deviceIngredientForm.sampleID" clearable></el-input>
        </el-form-item>

        <el-form-item label="处理人员编号" prop="user_id">
          <el-input v-model="deviceIngredientForm.user_id" clearable></el-input>
        </el-form-item>

        <el-form-item label="录入时间" prop="inputDate">
          <el-date-picker 
            v-model="deviceIngredientForm.inputDate"
            type="datetime"
            placeholder="请输入录入时间"
            style="width: 100%;">
          </el-date-picker>
          <!-- {{ deviceIngredientForm.inputDate }} -->
        </el-form-item>

        <el-form-item label="样品状态" prop="sampleState">
          <el-input v-model="deviceIngredientForm.sampleState" clearable></el-input>
        </el-form-item>

        <el-form-item label="样品产地" prop="sampleOrigin">
          <el-input v-model="deviceIngredientForm.sampleOrigin" clearable></el-input>
        </el-form-item>

        <el-form-item label="样品种类" prop="sampleType">
          <el-input v-model="deviceIngredientForm.sampleType" clearable></el-input>
        </el-form-item>

        <el-form-item label="样品制备方法" prop="sampleMake">
          <el-input v-model="deviceIngredientForm.sampleMake" clearable></el-input>
        </el-form-item>

        <el-form-item label="样品提取方法" prop="sampleDraw">
          <el-input v-model="deviceIngredientForm.sampleDraw" clearable></el-input>
        </el-form-item>

        <el-form-item label="样品分析方法" prop="sampleAnalyse">
          <el-input v-model="deviceIngredientForm.sampleAnalyse" clearable></el-input>
        </el-form-item>

        <el-form-item label="分析条件" prop="analyseCondition">
          <el-input v-model="deviceIngredientForm.analyseCondition" clearable></el-input>
        </el-form-item>

        <el-form-item label="图片描述" prop="picDescrip">
          <el-input v-model="deviceIngredientForm.picDescrip" clearable></el-input>
        </el-form-item>

        <el-form-item label="样本图片" prop="picUrl">
          <el-upload 
            class=""
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            >
            <img v-if="deviceIngredientForm.picUrl" :src="deviceIngredientForm.picUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon avatar-uploader"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="备注" prop="note">
          <el-input type="textarea" v-model="deviceIngredientForm.note" clearable></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateEdit">确定</el-button>
        <el-button type="" @click="dialogFormVisible = false">取消</el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
import { getDataList, updateData } from '@/api/table'
import { mapGetters } from 'vuex'

export default {
  name: 'deviceIngredientCaseSamplesTable',

  data() {
    return {
      searchInput: '',
      list: [],
      listLength: 0,
      listLoading: false,
      startIndex: 1,
      currentList: [],
      currentPage: 1,
      pageSize: 10,
      dialogFormVisible: false,
      dialogShowVisible: false,

      deviceIngredientForm: {
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
      },
      formLabelWidth: '120px'
    }
  },

  computed: {
    ...mapGetters([
      'role'
    ])
  },

  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },

  created() {
    this.fetchData()
    // console.log('--- PersonnelManagement this.$route: ', this.$route)
    // console.log('--- PersonnelManagement this.$router: ', this.$router)
  },

  methods: {
    fetchData() {
      this.listLoading = true
      getDataList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
        this.handleCurrentChange(1)
        // console.log('--- PersonnelManagement List: ', this.list)
      })
    },

    handleSearch() {
      alert('Search: ' + this.searchInput)
    },

    handleCreate() {
      this.$router.push('/CaseSamples/addDeviceIngredient')
    },

    handleDownloadList() {
      alert('已导出！')
    },

    handleEdit(index, row) {
      this.deviceIngredientForm = Object.assign({}, row)
      this.deviceIngredientForm.inputDate = new Date(row.inputDate)
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['deviceIngredientComponent'].clearValidate()
      })
    },

    updateEdit() {
      this.$refs['deviceIngredientComponent'].validate((valid) => {
        if (valid) {
          const tempdata = Object.assign({}, this.deviceIngredientForm)

          updateData(tempdata).then(() => {
            for (const v of this.list) {
              if (v.id === tempdata.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, tempdata)
                this.handleCurrentChange(this.currentPage)
                break
              }
            }
          })
          this.dialogFormVisible = false
        }
      })
    },

    handleDelete(index, row) {
      console.log('--- Deleted: ', index, row, this.role)
      
    },

    handleDownload() {
      alert('已导出！')
    },

    /* 分页 */
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
      this.deviceIngredientForm.picUrl = window.URL.createObjectURL(file)
    }

  }
}
</script>

<style type="text/css" scoped>
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