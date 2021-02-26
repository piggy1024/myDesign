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
      <el-table-column label="申请单位" width="110">
        <template slot-scope="scope">
          {{ scope.row.app_id.applicant }}
        </template>
      </el-table-column>
      <el-table-column label="申请联系人" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.app_id.app_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审批时间" width="110" align="center">
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
          <span v-if="scope.row.app_id.status !== 0">{{ scope.row.app_id.status == 1 ? "已通过" : "被驳回" }}</span>
          <span v-if="scope.row.app_id.status === 0">未审批</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getApplyList } from '@/api/application'
import store from '@/store'

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
