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
      <el-table-column label="教室名称">
        <template slot-scope="scope">
          {{ scope.row.classroomName }}
        </template>
      </el-table-column>
      <el-table-column label="所属楼" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.building }}</span>
        </template>
      </el-table-column>
      <el-table-column label="教室规模" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.size }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="是否多媒体教室" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.isMultimedia }}</span>
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
                "$oid": "5fc8c04a5183896ff40cedda"
            },
            "classroomName": "404",
            "building": "综合楼",
            "isUsed": false,
            "isMultimedia": true,
            "size": "大"
        },
        {
            "_id": {
                "$oid": "5fc8e297b85beb113c241258"
            },
            "classroomName": "101",
            "building": "教学楼",
            "isUsed": true,
            "isMultimedia": true,
            "size": "小",
            "__v": 0
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
