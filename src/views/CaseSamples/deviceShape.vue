<template>
  <div class="app-container">

    <div style="width: 100%;">

      <!-- 搜索输入框 -->
      <el-input
        placeholder="请输入搜索内容"
        v-model="searchInput"
        style="width:500px;"
        class="">
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="">
        </el-button>
      </el-input>

      <!-- 新增按钮 -->
      <el-button
        type="primary"
        style="margin-left:30px;"
        @click="handleCreate"
        round>
        NEW
      </el-button>

      <!-- 下载按钮 -->
      <el-button
        style="margin-left:20px"
        @click=""
        round>
        Download
      </el-button>
    </div>

    <!-- 数据表格 -->
    <el-table
      :data="currentList"
      v-loading="listLoading"
      element-loading-text="loading......"
      style="width:100%; margin-top:20px;"
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
        label="isCircuit"
        width="100">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.isCircuit === 0 ? 'success' : 'warning'">
            <span>{{scope.row.isCircuit === 0 ? "PCB" : "OTHERS"}}</span>
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="user_id"
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.user_id}}</span>
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
        label="mrfs"
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.mrfs}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="model"
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.model}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="trademark"
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.trademark}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="function"
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.function}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="belongTo"
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.belongTo}}</span>
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

    <el-dialog></el-dialog>

    <el-dialog title="编辑表单" :visible.sync="dialogFormVisible">
      <el-form
        :model="deviceShapeForm"
        ref="deviceShapeComponent"
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

        <el-form-item label="厂家" prop="mrfs">
          <el-input v-model="deviceShapeForm.mrfs" clearable></el-input>
        </el-form-item>

        <el-form-item label="型号" prop="model">
          <el-input v-model="deviceShapeForm.model" clearable></el-input>
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
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            >
            <img v-if="deviceShapeForm.originalUrl" :src="deviceShapeForm.originalUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon avatar-uploader"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="备注" prop="note">
          <el-input type="textarea" v-model="deviceShapeForm.note" clearable></el-input>
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
import { getShapeDataList, updateDeviceShapeData } from '@/api/table'
import { mapGetters } from 'vuex'

export default {
  name: 'deviceShapeCaseSamplesTable',
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
      dialogShowVisible: false,
      dialogFormVisible: false,

      deviceShapeForm: {
        id: null,
        sname: '',
        sampleID: '',
        isCircuit: null,
        user_id: '',
        inputDate: null,
        mrfs: '',
        model: '',
        trademark: '',
        function: '',
        belongTo: '',
        originalUrl: null,
        originalResolution: null,
        nomUrl: null,
        nomResolution: null,
        note: ''
      }
    }
  },

  computed: {
    ...mapGetters([
      'role'
    ])
  },

  filters: {

  },

  created() {
    this.fetchData()
    // console.log(' --- getShapeDataList function: ', getShapeDataList)
  },

  methods: {
    fetchData() {
      this.listLoading = true
      getShapeDataList().then(response => {
        this.list = response.data.items
        this.listLength = response.data.items.length
        this.listLoading = false
        this.handleCurrentChange(1)
        // console.log(' --- response: ', response)
      })
    },

    handleCreate() {
      this.$router.push('/CaseSamples/addDeviceShape')
    },

    handleEdit(index, row) {
      console.log(' --- deviceShape :', this)
      this.deviceShapeForm = Object.assign({}, row)
      this.deviceShapeForm.inputDate = new Date(row.inputDate)
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['deviceShapeComponent'].clearValidate()
      })
    },

    updateEdit() {
      this.$refs['deviceShapeComponent'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.deviceShapeForm)
          updateDeviceShapeData(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === tempData.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, tempData)
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
      console.log(' --- handleDelete: ', index, row)
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

    beforeAvatarUpload(file) {
      console.log('--- beforeAvatarUpload', file)
      window.URL = window.URL || window.webkitURL
      this.deviceShapeForm.originalUrl = window.URL.createObjectURL(file)
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
    width: 200px;
    height: 200px;
    display: block;
  }

</style>
