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
        新增人员
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
      element-loading-text="Loading......" 
      style="width: 100%; margin-top: 20px;" 
      border fit highlight-current-row stripe>

      <!-- <el-table-column 
        align="center" 
        label='ID' 
        fixed="left" 
        width="50">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column> -->

      <el-table-column
        align="center"
        type="index"
        :index="startIndex"
        fixed="left"
        width="50">
      </el-table-column>

      <el-table-column 
        align="center" 
        label='userID' 
        fixed="left"
        width="100">
        <template slot-scope="scope">
          {{scope.row.userID}}
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="name" 
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="gender" 
        width="100">
        <template slot-scope="scope">
          <el-tag 
            :type="scope.row.gender == '0' ? 'success' : ''">
            <span>{{scope.row.gender == "0" ? "Woman" : "Man"}}</span>
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="phone">
        <template slot-scope="scope">
          <span>{{scope.row.phone}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center" 
        label="role">
        <template slot-scope="scope">
          <span>{{scope.row.role}}</span>
        </template>
      </el-table-column>

      <el-table-column 
        align="center"
        class-name="status-col" 
        label="isDelete" 
        width="150" >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.isDelete === 0 ? 'success' : 'danger'"
            close-transition>
            {{scope.row.isDelete === 0 ? "inservice " : "Dimission"}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column 
        align="center"
        fixed="right"
        label="操作"
        width="300">
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
        :model="peopleInfoForm" 
        :rules="rules" 
        ref="peopleInfoComponent" 
        label-width="100px" 
        class="">

        <el-form-item label="照片上传" prop="picUrl">
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

        <el-form-item label="人员编号" prop="userID">
          <el-input v-model="peopleInfoForm.userID" clearable></el-input>
        </el-form-item>

        <el-form-item label="人员姓名" prop="name">
          <el-input v-model="peopleInfoForm.name" clearable></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input  
            v-model="peopleInfoForm.password" 
            type="password" 
            auto-complete="on" 
            clearable>
          </el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPassword">
          <el-input 
            v-model="peopleInfoForm.checkPassword" 
            type="password" 
            auto-complete="on" 
            clearable>
          </el-input>
        </el-form-item>

        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="peopleInfoForm.gender">
            <el-radio label="0">Woman</el-radio>
            <el-radio label="1">Man</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="电话" prop="phone">
          <el-input v-model="peopleInfoForm.phone"></el-input>
        </el-form-item>

        <el-form-item label="权限" prop="role">
          <el-select v-model="peopleInfoForm.role" placeholder="请选择权限">
            <el-option v-if = "superPermission" label="管理员" value="admin"></el-option>
            <el-option label="用户" value="user"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注" prop="note">
          <el-input type="textarea" v-model="peopleInfoForm.note"></el-input>
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
import { getPeopleList, updatePeople } from '@/api/table'
import { mapGetters } from 'vuex'

export default {
  name: 'peopleTable',

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
      if (value === '1') {
        if (this.roles.indexOf('superAdmin') === -1) {
          callback(new Error('无权限设置此用户为管理员'))
        } else {
          callback(console.log('--- validateRole is OK - 注意：此用户将被设置为管理员'))
        }
      } else {
        callback(console.log('--- validateRole is OK'))
      }
    }

    return {
      currentPage: 1,
      pageSize: 10,
      searchInput: '',
      list: [],
      listLength: 0,
      listLoading: false,
      startIndex: 1,
      currentList: [],
      dialogFormVisible: false,
      dialogShowVisible: false,

      superPermission: false,

      peopleInfoForm: {
        id: undefined,
        userID: '',
        name: '',
        password: '',
        checkPassword: '',
        gender: '',
        phone: '',
        role: 'user',
        picUrl: null,
        note: ''
      },
      rules: {
        userID: [
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
        role: [
          { validator: validateRole, required: true, trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px'
    }
  },

  computed: {
    ...mapGetters([
      'roles'
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
    console.log('--- created fetchData')
    // console.log('--- PersonnelManagement this.$route: ', this.$route)
    // console.log('--- PersonnelManagement this.$router: ', this.$router)
  },

  mounted() {
    // this.handleCurrentChange(1)
    // console.log('--- mounted handleCurrentChange')
  },

  methods: {
    fetchData() {
      this.listLoading = true
      getPeopleList().then(response => {
        this.list = response.data.items
        this.listLength = this.list.length
        this.listLoading = false
        console.log('--- PersonnelManagement fetchData List: ', this.list.length)
        this.handleCurrentChange(1)
      })
    },

    handleSearch() {
      alert('Search:  ' + this.searchInput)
    },

    handleCreate() {
      this.$router.push('/PersonnelManagement/form')
    },

    handleDownloadList() {
      alert('已导出！')
    },

    handleEdit(index, row) {
      console.log('--- Edit: ', index, row)
      this.dialogFormVisible = true
      this.peopleInfoForm = Object.assign({}, row)
    },

    updateEdit() {
      this.$refs['peopleInfoComponent'].validate((valid) => {
        if(valid) {
          const tempData = Object.assign({}, this.peopleInfoForm)
          updatePeople(tempData).then(() => {
            for(const v of this.list)
            {
              if(v.id === tempData.id) {
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
      console.log('--- Deleted: ', index, row, this.roles)
      if (this.roles.indexOf('superAdmin') >= 0) {
        alert('--- superAdmin权限 允许删除 ---')
      } else if (this.roles.indexOf('admin') >= 0) {
        alert('--- admin权限  可删除user ---')
      } else {
        alert('--- 无删除权限 ---')
      }
    },

    handleDownload() {
      alert('已导出！')
    },

    /* 弹出框 编辑功能 */
    beforeAvatarUpload(file) {
      console.log('--- beforeAvatarUpload', file)
      window.URL = window.URL || window.webkitURL
      this.peopleInfoForm.picUrl = window.URL.createObjectURL(file)
      console.log('--- this.picUrl: ', this.peopleInfoForm.picUrl)
    },
    handleAvatarSuccess(res, file) {
      console.log('--- handleAvatarSuccess', res, file)
    },
    // showAvatar(file, fileList) {
    //   console.log('--- showAvatar', file, fileList)
    // },


    /* 分页 */
    handleSizeChange(val) {
      // console.log('--- handleSizeChange 每页个数： ', val)
      this.pageSize = val
      /*
       * 修改pageSize的值会跳转至第一页
       * 默认当前页为1,在第一页改变pageSize,不会触发@current-change="handleCurrentChange"
       * 所以这里会对currentPage进行判断,若currentPage是1，则调用handleCurrentChange,
       * 否则直接设置currentPage为1，自动触发handleCurrentChange
       */
      if (this.currentPage === 1) {
        this.handleCurrentChange(1)
      } else {
        this.currentPage = 1
      }
    },

    handleCurrentChange(val) {
      console.log(`--- handleCurrentChange 当前页${val}`)
      console.log('--- pageSize: ', this.pageSize)
      this.currentList = []
      this.listLength = this.list.length

      const residueItemNum = this.list.length - (val - 1) * this.pageSize // 剩余数据量
      let newItemIndex = (val - 1) * this.pageSize // 当前数据列表的起始数据在原数据列表中的下标号
      this.startIndex = newItemIndex + 1 // 当前数据列表的起始数据的序号

      /* 对当前数据列表赋值 */
      for (let i = 0; i < this.pageSize && i < residueItemNum; i++) {
        this.currentList[i] = this.list[newItemIndex]
        newItemIndex++
      }

      console.log('--- handleCurrentChange currentList: ', this.startIndex, this.currentList)
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