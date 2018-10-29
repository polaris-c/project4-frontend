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
        新增物证
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
        type="selection"
        width="40">
      </el-table-column>

      <el-table-column
        align="center"
        type="index"
        :index="startIndex"
        fixed="left"
        width="50">
      </el-table-column>

      <el-table-column 
        align="center" 
        label="物证编号" 
        fixed="left"
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.evidenceID}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="案件编号" 
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.caseID}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="录入日期" 
        width="150">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.inputDate}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="物证状态" 
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.eviState}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="物证制备方法" 
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.eviMake}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="物证提取方法" 
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.eviDraw}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="物证分析方法" 
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.eviAnalyse}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="分析条件" 
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

  </div>
</template>

<script>
import { getExploEvisList, showExploEvis, updateExploEvis, deleteExploEvis } from '@/api/table'
import { mapGetters } from 'vuex'

export default {
  name: 'explosiveCaseSamplesTable',

  data() {
    return {
      searchInput: '',
      list: null,
      listLength: 0,
      listLoading: false,
      startIndex: 1,
      currentList: [],
      currentPage: 1,
      pageSize: 10,
      
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
      getExploEvisList().then(response => {
        this.list = response.data
        this.listLoading = false
        this.handleCurrentChange(this.currentPage)
      })
    },

    handleSearch() {
      alert('Search: ' + this.searchInput)
    },

    handleCreate() {
      this.$router.push('/CaseSamples/addExplosive')
    },

    handleDownloadList() {
      alert('已导出！')
    },

    handleDetail(index, row) {
      // showExploEvis(row.id).then(res => {
      //   this.showExploEvisInfo = res.data
      // })
      // this.dialogShowVisible = true
    },

    handleEdit(index, row) {
      // this.explosiveCaseSamplesForm = Object.assign({}, row)
      // this.explosiveCaseSamplesForm.inputDate = new Date(row.inputDate)
      // this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['explosiveCaseSamplesComponent'].clearValidate()
      // })
    },

    updateEdit() {
      // this.$refs['explosiveCaseSamplesComponent'].validate((valid) => {
      //   if (valid) {
      //     const tempData = Object.assign({}, this.explosiveCaseSamplesForm)
      //     updateExploEvis(tempData).then(() => {
      //       for (const v of this.list) {
      //         if (v.id === tempData.id) {
      //           const index = this.list.indexOf(v)
      //           this.list.splice(index, 1, tempData)
      //           this.handleCurrentChange(this.currentPage)
      //           break
      //         }
      //       }
      //     })
      //     this.dialogFormVisible = false
      //   }
      // })
    },

    handleDelete(index, row) {
      console.log('--- Deleted: ', index, row, this.role)
      deleteExploEvis(row.id).then(res => {
        console.log('--- Deleted! res: ', res)
        this.fetchData()
      })
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
    width: 300px;
    height: 200px;
    display: block;
  }

</style>