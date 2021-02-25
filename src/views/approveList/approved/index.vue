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
      <el-table-column label="申请单位">
        <template slot-scope="scope">
          {{ scope.row.applicant }}
        </template>
      </el-table-column>
      <el-table-column label="申请联系人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.app_phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审批时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.app_passTime }}
        </template>
      </el-table-column>
      <el-table-column label="审批原因" align="center">
        <template slot-scope="scope">
          {{ scope.row.reason }}
        </template>
      </el-table-column>
      <el-table-column label="审批状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.status == 1 ? "已通过" : "被驳回" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="danger" @click="withdraw(scope.row._id)">撤回审批</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAuditedList, withdrawApply } from '@/api/application'

export default {
  data() {
    return {
      list: [],
      listLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {

    // 撤回审批
    withdraw(id){
      withdrawApply({'_id':id}).then(res=>{
        // console.log(res);
      })
      this.fetchData()
    },
    // 获取列表
    fetchData() {
      this.listLoading = true;
      getAuditedList().then(response => {
        this.list = response.data;
        // console.log(this.list);
        this.listLoading = false;
      });
    }
  }
}
</script>
