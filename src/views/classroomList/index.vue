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
      <el-table-column label="教室名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.classroomName }}
        </template>
      </el-table-column>
      <el-table-column label="所属楼" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.building }}</span>
        </template>
      </el-table-column>
      <el-table-column label="教室规模" align="center">
        <template slot-scope="scope">
          {{ scope.row.size }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否多媒体教室" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.isMultimedia ? "多媒体教室" : "非多媒体" }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="apply(scope.row._id)"
            >申请使用</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="申请使用" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="活动主题及内容" prop="app_theme">
          <el-input v-model="form.app_theme" type="text" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="申请单位" prop="applicant">
          <el-input v-model="form.applicant" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="申请联系人" prop="app_name">
          <el-input v-model="form.app_name" placeholder="请输入" disabled />
        </el-form-item>
        <el-form-item label="申请联系电话" prop="app_phone">
          <el-input v-model="form.app_phone" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="教室类型" prop="app_roomType">
          <el-select v-model="form.app_roomType" placeholder="请选择">
            <el-option label="多媒体教室" value="true" />
            <el-option label="非多媒体教室" value="false" />
          </el-select>
        </el-form-item>
        <el-form-item label="教室规模" prop="app_size">
          <el-select v-model="form.app_size" placeholder="请选择">
            <el-option label="大教室" value="大" />
            <el-option label="中教室" value="中" />
            <el-option label="小教室" value="小" />
          </el-select>
        </el-form-item>
        <el-form-item label="申请使用时间" prop="app_start_time">
          <!-- <el-date-picker
            v-model="form.app_time"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker> -->
          <el-col :span="11">
            <el-date-picker
              v-model="form.app_start_time"
              type="datetime"
              placeholder="开始时间"
              style="width: 100%;"
            />
          </el-col>
          <el-col :span="2" class="line" align="center">至</el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="form.app_end_time"
              type="datetime"
              placeholder="结束时间"
              style="width: 100%;"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="活动类型" prop="app_type">
          <template>
            <el-radio-group v-model="form.app_type">
              <el-radio label="教学活动">教学活动</el-radio>
              <el-radio label="学生活动">学生活动</el-radio>
              <el-radio label="其他活动">其他活动</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item label="主题内容" prop="app_content">
          <el-input
            v-model="form.app_content"
            type="textarea"
            placeholder="请输入"
          />
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button @click="onCancel('form')">Cancel</el-button>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel('form')">取 消</el-button>
        <el-button type="primary" @click="addSubmit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from "@/api/table";
import applicationForm from "@/views/form/index";
import { addApplication } from "../../api/submit";
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  components: { applicationForm },
  computed: {
    ...mapGetters([
      'name',
      'user_id'
    ])
  },
  data() {
    return {
      list: [],
      listLoading: false,
      dialogFormVisible: false,
      form: {
        c_id: "",
        app_theme: "",
        stu_id: store.getters.user_id,  // 当前申请人的学号或者工号
        app_name: store.getters.name,
        app_phone: "",
        app_type: "",
        app_roomType: "",
        applicant: "",
        app_size: "",
        app_start_time: "",
        app_end_time: "",
        app_content: "",
        app_passTime: "",
        status: 0
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 申请使用
    apply(id) {
      this.dialogFormVisible = true;
      // 将教室的c_id 放进要提交表单
      this.form.c_id = id;
    },
    // 确定申请
    addSubmit(formName) {
      addApplication(this.form).then(res => {
        // 清空原来表单数据
      });
      // 关闭弹框
      this.dialogFormVisible = false;
    },
    onCancel(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
    onSubmit(formName) {
      addApplication(this.form).then(res => {
        console.log(res);
      });
      this.$message("submit!");
      this.$refs[formName].resetFields();
    },

    // 获取列表数据
    fetchData() {
      this.listLoading = true;
      getList().then(response => {
        this.list = response.data;
        this.listLoading = false;
      });
    }
  }
};
</script>
