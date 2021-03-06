<template>
  <div class="app-container">
    <!-- 筛选条件 -->
    <div class="filter-box">
      <el-form ref="filterForm" :inline="true" size="medium" :model="filterForm">
        <el-form-item prop="publisher">
          <el-input style="width: 300px" v-model="filterForm.publisher" placeholder="发布者" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" round @click="handleQuery">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh" round plain @click="handleReset('filterForm')">重置</el-button>
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
      <el-table-column label="发布日期" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.publishTime }}
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
  </div>
</template>

<script>
import { getAnnouncementsList } from '@/api/announcement'
import formatDate from '@/utils/formatDate'

export default {
  data() {
    return {
      listTotal: 0,
      filterForm: {
        publisher : '',
        pageNo: 1,
        pageSize: 10
      },
      list: [],
      showList: [],
      listLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
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
    fetchData() {
      this.listLoading = true
      getAnnouncementsList(this.filterForm).then(response => {
        this.listTotal = response.data.length;
        this.list = response.data;
        // 处理时间格式
        this.list.forEach(item => {
          item.publishTime = formatDate(item.publishTime)
          return item
        });
        // 取前十条数据给到表格
        this.showList = this.list.slice(0,10)
        this.listLoading = false
      })
    }
  }
}
</script>
