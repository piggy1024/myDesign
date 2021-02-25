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
      <el-table-column label="申请开始使用时间">
        <template slot-scope="scope">
          {{ scope.row.app_start_time }}
        </template>
      </el-table-column>
      <el-table-column label="申请结束使用时间">
        <template slot-scope="scope">
          {{ scope.row.app_end_time }}
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
        <template slot-scope="scope">
          <el-button type="success" @click="onSuccess(scope.row._id)">审批通过</el-button>
          <el-button type="danger" @click="onFail(scope.row._id)">审批驳回</el-button>
        </template>
      </el-table-column>
    </el-table>
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
  </div>
</template>

<script>
import { getAuditList, resolveApply, rejectApply } from "@/api/application"
import moment from "moment"
export default {
  data() {
    return {
      checked: true,
      list: [],
      listLoading: false,
      resolveForm: {
        _id: '',    // 审批的application的id
        reason: '',  // 审批理由
        app_passTime: ''  // 审批时间
      },
      dialogResolveFormVisible: false,
      rejectForm: {
        _id: '',
        reason: '',
        app_passTime: ''
      },
      dialogRejectFormVisible: false,

    };
  },
  created() {
    // console.log(moment(new Date()).format());

    this.fetchData();
  },
  mounted() {},
  methods: {

    // 确认通过
    resolveSubmit(){
      resolveApply(this.resolveForm).then(res=>{
        // console.log(res);
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
      getAuditList().then(res => {
        this.list = res.data;
        this.listLoading = false;
      });
    }
  }
};
</script>

