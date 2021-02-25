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
          {{ scope.row.applicant }}
        </template>
      </el-table-column>
      <el-table-column label="申请联系人" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.app_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审批时间" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.app_passTime }}
        </template>
      </el-table-column>
      <el-table-column label="审批原因" align="center">
        <template slot-scope="scope">
          {{ scope.row.reason }}
        </template>
      </el-table-column>
      <el-table-column label="审批状态" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.status }}
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
        this.listLoading = false
      })
    }
  }
}
</script>
