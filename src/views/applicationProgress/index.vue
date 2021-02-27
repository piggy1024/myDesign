<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="申请单位" width="150">
        <template slot-scope="scope">
          {{ scope.row.app_id.applicant }}
        </template>
      </el-table-column>
      <el-table-column label="申请联系人" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.app_id.app_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审批时间" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.app_id.app_passTime }}
        </template>
      </el-table-column>
      <el-table-column label="审批原因" align="center">
        <template slot-scope="scope">
          {{ scope.row.app_id.reason }}
        </template>
      </el-table-column>
      <el-table-column label="审批状态" width="110" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.department_status === '0' && scope.row.logistics_status === '0' && scope.row.school_dean_status === '0' && scope.row.technology_center_status ==='0'">未审批</span>
          <span v-if="scope.row.department_status !== '0' && scope.row.logistics_status !== '0' && scope.row.school_dean_status !== '0' && scope.row.technology_center_status !=='0'">审批完成</span>
          <span v-else><span v-if="scope.row.department_status !== '0' || scope.row.logistics_status !== '0' || scope.row.school_dean_status !== '0' || scope.row.technology_center_status !=='0'">审批中</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot-scope="scope">
          <el-button @click="showDetail(scope.$index)">审批详情</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot-scope="scope">
          <el-button @click="cancelApplication(scope.row.app_id._id)">取消申请</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="审批详情" :visible.sync="dialogDetailVisible">
      <el-steps :active="detail.step" align-center>
            <el-step title="部门" :description="detail.department_reason"></el-step>
            <el-step title="后勤处" :description="detail.logistics_reason"></el-step>
            <el-step title="教务处中心" :description="detail.school_dean_reason"></el-step>
            <el-step title="教育技术中心理由" :description="detail.technology_center_reason"></el-step>
        </el-steps>
    </el-dialog>
  </div>
</template>

<script>
import { getApplyList, deleteApply } from '@/api/application'
import store from '@/store'

export default {
  data() {
    return {
      list: [],
      listLoading: false,
      dialogDetailVisible: false,
      detail: {
        step: 0,
        department_reason: '',
        logistics_reason: '',
        school_dean_reason: '',
        technology_center_reason: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 取消申请
    cancelApplication(id) {
      this.$confirm("此操作将永久取消申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteApply({'_id':id}).then(res=>{
            // console.log(res);
          })
          this.fetchData()
          this.$message({
            type: "success",
            message: "取消成功!"
          });
        })
        .catch(() => {
        });
    },
    // 显示审批详情
    showDetail(index){
      // 每次点击展示详情先初始化detail数据
      Object.assign(this.$data.detail, this.$options.data().detail);
      // 将当前行选中的审批详情复制给detail
      Object.assign(this.detail, this.list[index])

      if(this.detail.department_status !== '0') {
        this.detail.step = 1
      }
      if(this.detail.logistics_status !== '0') {
        this.detail.step = 2
      }
      if(this.detail.school_dean_status !== '0') {
        this.detail.step = 3
      }
      if(this.detail.technology_center_status !== '0') {
        this.detail.step = 4
      }
      // this.detail = this.list[index];
      // this.detail.step = 1;
      this.dialogDetailVisible = true
    },
    fetchData() {
      this.listLoading = true
      getApplyList({user_id: store.getters.user_id}).then(res => {
        this.list = res.data
        console.log(res.data);
        this.listLoading = false
      })
    }
  }
}
</script>
