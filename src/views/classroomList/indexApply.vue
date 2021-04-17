<template>
  <div class="app-container">
    <!-- 筛选条件 -->
    <div class="filter-box">
      <el-form ref="filterForm" :inline="true" size="medium" :model="filterForm">
        <el-form-item prop="classroomName">
          <el-input style="width: 300px" v-model="filterForm.classroomName" placeholder="教室名称" />
        </el-form-item>
        <el-form-item prop="building">
          <el-input style="width: 300px" v-model="filterForm.building" placeholder="所属楼" />
        </el-form-item>
        <el-form-item prop="isMultimedia">
          <el-select v-model="filterForm.isMultimedia" placeholder="教室类型">
            <el-option label="多媒体教室" :value="true" />
            <el-option label="非多媒体教室" :value="false" />
          </el-select>
          <!-- <el-input style="width: 300px" v-model="filterForm.isMultimedia" placeholder="是否多媒体教室" /> -->
        </el-form-item>
        <el-form-item prop="size">
          <el-input style="width: 300px" v-model="filterForm.size" placeholder="教室规模" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" round @click="handleQuery">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh" round plain @click="handleReset('filterForm')">重置</el-button>
          <el-button type="success" icon="el-icon-refresh" round @click="addClassroom">新增教室</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="showList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ (filterForm.pageNo-1)*10 + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="教室名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.classroomName }}
        </template>
      </el-table-column>
      <el-table-column label="所属楼" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.building }}</span>
        </template>
      </el-table-column>
      <el-table-column label="教室规模" align="center">
        <template slot-scope="scope">
          {{ scope.row.size }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否多媒体教室" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.isMultimedia ? "多媒体教室" : "非多媒体教室" }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row._id)">编辑</el-button>
          <el-button type="danger" @click="deleteClassroom(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        @current-change="changePage"
        layout="prev, pager, next"
        :total="listTotal">
      </el-pagination>
    </div>
    <el-dialog title="编辑教室" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="教室名称" prop="classroomName">
          <el-input v-model="form.classroomName" type="text" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="所属楼" prop="building">
          <el-input v-model="form.building" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="是否多媒体教室" prop="isMultimedia">
          <el-select v-model="form.isMultimedia" placeholder="请选择">
            <el-option label="多媒体教室" value="true" />
            <el-option label="非多媒体教室" value="false" />
          </el-select>
        </el-form-item>
        <el-form-item label="教室规模" prop="size">
          <el-select v-model="form.size" placeholder="请选择">
            <el-option label="大教室" value="大" />
            <el-option label="中教室" value="中" />
            <el-option label="小教室" value="小" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel('form')">取 消</el-button>
        <el-button type="primary" @click="addSubmit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from "@/api/classroom";
import { addClassroom, getClassroomDetail, deleteClassroom } from "@/api/classroom";
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  computed: {
    ...mapGetters([
      'name',
      'user_id'
    ])
  },
  data() {
    return {
      filterForm: {
        classroomName : '',
        building: '',
        isMultimedia: '',
        size: '',
        pageNo: 1,
        pageSize: 10,
      },
      listTotal: 0, // 列表总条数
      list: [],
      showList: [],
      listLoading: false,
      dialogFormVisible: false,
      form: {
        c_id: "",
        classroomName: "",
        building: "",
        isMultimedia: "",
        size: ""
      },
      obj: {}
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    deleteClassroom(id) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        deleteClassroom({id: id}).then(res => {
          this.$message.success('删除成功!')
          this.fetchData();
        }).catch(err => {
          this.$message.error('删除失败!')
        })
      })
      .catch(() => {
      });
    },
    addClassroom () {
      this.dialogFormVisible = true;
      // 清空表单数据
      // this.form = this.$options.data().form;
    },
    // 改变页码
    changePage(page){
      this.filterForm.pageNo = page
      this.showList = this.list.slice(10*(page-1),10*page)
    },
    // 查询
    handleQuery() {
      this.listTotal = 0
      this.filterForm.pageNo = 1
      this.fetchData()
    },
    // 重置
    handleReset(form) {
      this.$refs[form].resetFields()
      this.handleQuery()
    },
    // 编辑教室
    edit(id) {
      this.dialogFormVisible = true;
      // 清空表单数据
      this.form = this.$options.data().form;
      getClassroomDetail({'c_id': id}).then(res => {
        this.form.c_id = res.data._id
        this.form.classroomName = res.data.classroomName
        this.form.building = res.data.building
        if(res.data.isMultimedia === true) {
          this.form.isMultimedia = "多媒体教室"
        } else {
          this.form.isMultimedia = "非多媒体教室"
        }
        this.form.size = res.data.size
      })
    },
    // 确认编辑
    addSubmit(formName) {
      this.obj.c_id = this.form.c_id
      this.obj.classroomName = this.form.classroomName
      this.obj.building = this.form.building
      this.obj.isMultimedia = this.form.isMultimedia
      this.obj.size = this.form.size
      if(this.obj.isMultimedia === "true" || this.obj.isMultimedia === "false") {
        if( this.obj.isMultimedia === "true") {
          this.obj.isMultimedia = true
        } else {
          this.obj.isMultimedia = false
        }
      }
      else {
        if( this.obj.isMultimedia === "多媒体教室") {
          this.obj.isMultimedia = true
        } else {
          this.obj.isMultimedia = false
        }
      }
      addClassroom(this.obj).then(res => {
        // 清空原来表单数据
        this.form = this.$options.data().form;
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        this.fetchData();
      }).catch(err => {
      });
      // 关闭弹框
      this.dialogFormVisible = false;
    },
    onCancel(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
    // 获取列表数据
    fetchData() {
      this.listLoading = true;
      getList(this.filterForm).then(response => {
        this.list = response.data;
        this.listTotal = response.data.length;
        // 取前十条数据给到表格
        this.showList = this.list.slice(0,10)
        this.listLoading = false;
      });
    }
  }
};
</script>

<style lang="scss">
.pagination {
  margin-top: 12px;
}
</style>
