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
      <el-table-column label="公告内容">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column label="公告主题" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.theme }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布者" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.publisher }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
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
      // this.listLoading = true
      // getList().then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
    }
  }
}
</script>
