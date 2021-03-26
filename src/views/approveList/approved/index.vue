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
          {{ (filterForm.pageNo-1)*10 + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="申请单位">
        <template slot-scope="scope">
          {{ scope.row.app_id.applicant }}
        </template>
      </el-table-column>
      <el-table-column label="申请联系人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.app_id.app_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最近一次审批时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.app_id.app_passTime }}
        </template>
      </el-table-column>
      <el-table-column label="审批原因" align="center">
        <template slot-scope="scope">
          <span v-if="apartment ==='部门'">
            <span>{{ scope.row.department_reason }}</span>
          </span>
          <span v-if="apartment ==='后勤处'">
            <span>{{ scope.row.logistics_reason }}</span>
          </span>
          <span v-if="apartment ==='教务处'">
            <span>{{ scope.row.technology_center_reason }}</span>
          </span>
          <span v-if="apartment ==='教育技术中心'">
            <span>{{ scope.row.technology_center_reason }}</span>
          </span>
          <!-- {{ scope.row.app_id.reason }} -->
        </template>
      </el-table-column>
      <el-table-column label="审批状态" align="center">
        <template slot-scope="scope">
          <span v-if="apartment ==='部门'">
            <span>{{ scope.row.department_status === 0 ? "未审批" : "" }}</span>
            <span>{{ scope.row.department_status == 1 ? "已通过" : "被驳回" }}</span>
          </span>
          <span v-if="apartment ==='后勤处'">
            <span>{{ scope.row.logistics_status === 0 ? "未审批" : "" }}</span>
            <span>{{ scope.row.logistics_status == 1 ? "已通过" : "被驳回" }}</span>
          </span>
          <span v-if="apartment ==='教务处'">
            <span>{{ scope.row.technology_center_status === 0 ? "未审批" : "" }}</span>
            <span>{{ scope.row.technology_center_status == 1 ? "已通过" : "被驳回" }}</span>
          </span>
          <span v-if="apartment ==='教育技术中心'">
            <span>{{ scope.row.technology_center_status === 0 ? "未审批" : "" }}</span>
            <span>{{ scope.row.technology_center_status == 1 ? "已通过" : "被驳回" }}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="" @click="detail(scope.row)">详情</el-button>
          <el-button type="danger" @click="withdraw(scope.row.app_id._id)">撤回审批</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        background
        @current-change="changePage"
        layout="prev, pager, next"
        :total="listTotal">
      </el-pagination>
    </div>

    <!-- 详情对话框 -->
    <el-dialog title="申请详情" :visible.sync="dialogTableVisible" width="600px">
      <div class="row-table">
            <el-row>
              <div class="label">申请主题</div>
              <div class="value">{{ details.app_theme }}</div>
            </el-row>
            <el-row>
              <div class="label">申请活动类型</div>
              <div class="value">{{ details.app_type }}</div>
            </el-row>
            <el-row>
              <div class="label">申请教室类型</div>
              <div class="value">{{ details.app_roomType ? '多媒体教室' : '普通教室' }}</div>
            </el-row>
            <el-row>
              <div class="label">活动开始时间</div>
              <div class="value">{{ details.app_start_time }}</div>
            </el-row>
            <el-row>
              <div class="label">活动结束时间</div>
              <div class="value">{{ details.app_end_time }}</div>
            </el-row>
            <el-row>
              <div class="label">活动内容</div>
              <div class="value">{{ details.app_content }}</div>
            </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAuditedList, withdrawApply } from '@/api/application'
import store from '@/store'
import formatDate from '@/utils/formatDate'

export default {
  data() {
    return {
      apartment: store.getters.apartment,
      listTotal: 0,
      list: [],
      showList: [],
      listLoading: false,
      dialogTableVisible: false,
      details: {},
      filterForm: {
        size: '',
        pageNo: 1,
        pageSize: 10,
      }
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
    // 查看详情
    detail(detail){
      this.details = detail.app_id
      this.dialogTableVisible = true
    },
    // 撤回审批
    withdraw(id){
      this.$confirm("此操作将永久撤回该审批, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          withdrawApply({'_id':id, apartment: store.getters.apartment}).then(res=>{
            // console.log(res);
          })
          this.fetchData()
          this.$message({
            type: "success",
            message: "撤回成功!"
          });
        })
        .catch(() => {
        });

    },
    // 获取列表
    fetchData() {
      this.listLoading = true;
      getAuditedList({ apartment: store.getters.apartment }).then(response => {
        this.listTotal = response.data.length;
        this.list = response.data;
         // 处理时间格式
        this.list.forEach(item => {
          item.app_id.app_passTime = formatDate(item.app_id.app_passTime)
          return item
        });
        // console.log(this.list);
        // 取前十条数据给到表格
        this.showList = this.list.slice(0,10)
        this.listLoading = false;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.row-table {
  .el-row {
   display: flex;
   justify-content: center;
   margin-top: 24px;
  }
  .label,
  .value {
    border: 1px solid aqua;
    border-radius: 16px;
    padding: 8px;
    font-size: 18px;
    background: rgb(47, 218, 204);
    color: #fff;
  }
  .label {
    margin-right: 48px;
    width: 150px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .value {
    width: 200px;
  }
}
</style>
