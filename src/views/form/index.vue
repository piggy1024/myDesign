<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="活动主题及内容">
        <el-input v-model="form.app_theme" type="textarea" />
      </el-form-item>
      <el-form-item label="申请单位">
        <el-input v-model="form.applicant" />
      </el-form-item>
      <el-form-item label="申请联系人">
        <el-input v-model="form.app_name" />
      </el-form-item>
      <el-form-item label="申请联系电话">
        <el-input v-model="form.app_phone" />
      </el-form-item>
      <el-form-item label="教室类型">
        <el-select v-model="form.app_roomType" placeholder="请选择">
          <el-option label="多媒体教室" value="true" />
          <el-option label="非多媒体教室" value="false" />
        </el-select>
      </el-form-item>
      <el-form-item label="教室规模">
        <el-select v-model="form.app_size" placeholder="请选择">
          <el-option label="大教室" value="大" />
          <el-option label="中教室" value="中" />
          <el-option label="小教室" value="小" />
        </el-select>
      </el-form-item>
      <el-form-item label="申请使用时间">
        <el-date-picker
          v-model="form.app_time"
          type="datetime"
          placeholder="选择日期时间"
        >
        </el-date-picker>
        <!-- <el-col :span="11">
          <el-date-picker v-model="form.app_time" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="Pick a time" style="width: 100%;" />
        </el-col> -->
      </el-form-item>
      <el-form-item label="活动类型">
        <template>
          <el-radio-group v-model="form.app_type">
            <el-radio label="教学活动">教学活动</el-radio>
            <el-radio label="学生活动">学生活动</el-radio>
            <el-radio label="其他活动">其他活动</el-radio>
          </el-radio-group>
        </template>
      </el-form-item>
      <el-form-item label="主题内容">
        <el-input v-model="form.app_content" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addApplication } from "../../api/submit";
export default {
  data() {
    return {
      form: {
        app_theme: "",
        app_phone: "",
        app_type: "",
        app_roomType: "",
        applicant: "",
        app_size: "",
        app_time: "",
        app_content: "",
        app_passTime: "",
        status: false
      }
    };
  },
  methods: {
    onSubmit() {
      addApplication(this.form).then(res => {
        console.log(res);
      });
      this.$message("submit!");
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning"
      });
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
