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
      <el-table-column label="申请使用时间">
        <template slot-scope="scope">
          {{ scope.row.app_time }}
        </template>
      </el-table-column>
      <el-table-column label="申请联系人" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.applicant }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请联系方式" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.app_phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="教室规模" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.app_size }}
        </template>
      </el-table-column>
      <el-table-column label="教室类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.app_roomType ? "多媒体教室" : "非多媒体" }}
        </template>
      </el-table-column>
      <el-table-column label="活动类型" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.app_type }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <el-button type="success">审批通过</el-button>
        <el-button type="danger">审批驳回</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getApplicationsList } from "@/api/application";

export default {
  data() {
    return {
      list: [],
      listLoading: false
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {},
  methods: {
    fetchData() {
      this.listLoading = true;
      getApplicationsList().then(response => {
        this.list = response.data;
        this.listLoading = false;
      });
    }
  }
};
</script>
