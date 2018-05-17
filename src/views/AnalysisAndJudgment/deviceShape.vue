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
            最新分析结果
          </el-button>

          <el-button
            size="mini"
            type="primary"
            @click="analysis(scope.$index, scope.row)">
            分析处理
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

    <el-dialog></el-dialog>
    
  </div>
</template>

<script>
import { getShapeDataList } from '@/api/table'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      searchInput: '',
      list: [],
      listLength: 0,
      listLoading: false,
      startIndex: 1,
      currentList: [],
      dialogShowVisible: false,
      dialogFormVisible: false
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

    analysis(index, row) {
      console.log(' --- analysis: ', index, row)
      this.$router.push('/AnalysisAndJudgment/deviceShapeAnalysis')
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
