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
      <el-table-column label="申请开始使用时间">
        <template slot-scope="scope">
          {{ scope.row.app_id.app_start_time }}
        </template>
      </el-table-column>
      <el-table-column label="申请结束使用时间">
        <template slot-scope="scope">
          {{ scope.row.app_id.app_end_time }}
        </template>
      </el-table-column>
      <el-table-column label="申请联系人" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.app_id.app_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请联系方式" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.app_id.app_phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="教室规模" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.app_id.app_size }}
        </template>
      </el-table-column>
      <el-table-column label="教室类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.app_id.app_roomType ? "多媒体教室" : "非多媒体" }}
        </template>
      </el-table-column>
      <el-table-column label="活动类型" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.app_id.app_type }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="onSuccess(scope.row.app_id._id)">审批通过</el-button>
          <el-button type="danger" @click="onFail(scope.row.app_id._id)">审批驳回</el-button>
          <el-button type="" @click="detail(scope.row)">详情</el-button>
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

    <!-- 审批通过弹窗 -->
    <el-dialog title="审批通过" :visible.sync="dialogResolveFormVisible">
      <el-form :model="resolveForm">
        <el-form-item label="审批理由">
          <el-input v-model="resolveForm.reason" auto-complete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogResolveFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="resolveSubmit">确 定</el-button>
      </div>
    </el-dialog>
     <!-- 审批驳回弹窗 -->
    <el-dialog title="审批驳回" :visible.sync="dialogRejectFormVisible">
      <el-form :model="rejectForm">
        <el-form-item label="审批理由">
          <el-input v-model="rejectForm.reason" auto-complete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRejectFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="rejectSubmit">确 定</el-button>
      </div>
    </el-dialog>
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
import { getAuditList, resolveApply, rejectApply } from "@/api/application"
import moment from "moment"
import store from '@/store'
import formatDate from '@/utils/formatDate'

export default {
  data() {
    return {
      checked: true,
      listTotal: 0,
      list: [],
      showList: [],
      listLoading: false,
      resolveForm: {
        _id: '',    // 审批的application的id
        reason: '',  // 审批理由
        app_passTime: '',  // 审批时间
        apartment: store.getters.apartment // 当前人的所在部门(审批)
      },
      dialogResolveFormVisible: false,
      dialogTableVisible: false,
      details: {},
      rejectForm: {
        _id: '',
        reason: '',
        app_passTime: '',
        apartment: store.getters.apartment
      },
      dialogRejectFormVisible: false,

    };
  },
  created() {
    this.fetchData();
  },
  mounted() {},
  methods: {
    // 查看详情
    detail(detail){
      this.details = detail.app_id
      this.dialogTableVisible = true
    },
    changePage(page){
      this.showList = this.list.slice(10*(page-1),10*page)
    },
    // 确认通过
    resolveSubmit(){
      resolveApply(this.resolveForm).then(res=>{
        // console.log(res);
        this.$message.success('操作成功!')
      })
      this.dialogResolveFormVisible = false
      this.fetchData();
    },
    // 确认驳回
    rejectSubmit(){
      rejectApply(this.rejectForm).then(res=>{
        // console.log(res);
      })
      this.dialogRejectFormVisible = false
      this.fetchData();
    },
    // 审批通过
    onSuccess(id){
      this.dialogResolveFormVisible = true
      this.resolveForm._id = id
      this.resolveForm.app_passTime = moment(new Date()).format()
    },
    // 审批驳回
    onFail(id){
      this.dialogRejectFormVisible = true
      this.rejectForm._id = id
      this.rejectForm.app_passTime = moment(new Date()).format()
    },
    // 获取列表数据
    fetchData() {
      this.listLoading = true;
      getAuditList({ apartment: store.getters.apartment }).then(res => {
        this.listTotal = res.data.length;
        this.list = res.data;
        // 处理时间格式
        this.list.forEach(item => {
          item.app_id.app_start_time = formatDate(item.app_id.app_start_time)
          item.app_id.app_end_time = formatDate(item.app_id.app_end_time)
          return item
        });
        // console.log(res.data);
        // 取前十条数据给到表格
        this.showList = this.list.slice(0,10)
        this.listLoading = false;
      });
    }
  }
};
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
