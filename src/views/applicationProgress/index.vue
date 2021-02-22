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

export default {
  data() {
    return {
      list: [
        {
            "_id": {
                "$oid": "5fc8bdb55183896ff40cedd9"
            },
            "theme": "放假通知",
            "content": "10月1日-10月9号放假,不会进行审批管理.",
            "publisher": "admin",
            "publishTime": {
                "$date": "2020-09-30T16:00:00.000Z"
            },
            "isPublish": true
        }
      ],
      listLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getApplyList().then(res => {
        this.list = res.data
        console.log(res.data);
        this.listLoading = false
      })
    }
  }
}
</script>
