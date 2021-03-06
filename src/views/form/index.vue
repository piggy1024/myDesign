<template>
  <div class="app-container">
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
        <el-form-item label="申请使用时间" prop="app_start_time">
          <el-col :span="11">
            <el-date-picker
              v-model="form.app_start_time"
              type="datetime"
              :picker-options="pickerOptions"
              placeholder="开始时间"
              style="width: 100%;"
            />
          </el-col>
          <el-col :span="2" class="line" align="center">至</el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="form.app_end_time"
              type="datetime"
              :picker-options="pickerOptions"
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
        <el-form-item label="宣传品类型" prop="app_post_type">
          <template>
            <el-radio-group v-model="form.app_post_type">
              <el-radio label="横幅">横幅</el-radio>
              <el-radio label="海报">海报</el-radio>
              <el-radio label="传单">传单</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item label="宣传品图片" v-if="form.app_post_type !=='' && form.app_post_type !=='横幅'">
          <el-upload
            class="avatar-uploader"
            :action="'http://localhost:3000/uploads'"
            :show-file-list="false"
            :on-success="afterUpload"
          >
            <img v-if="form.app_content" :src="form.app_content" width="300px" height="150px" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon">上传</i>
          </el-upload>
        </el-form-item>
        <el-form-item label="横幅内容" prop="app_content" v-if="form.app_post_type === '横幅'">
          <el-input
            v-model="form.app_content"
            type="textarea"
            placeholder="请输入"
          />
        </el-form-item>
    </el-form>
    <div>
      <el-button @click="onSubmit">提交申请</el-button>
    </div>

  </div>
</template>

<script>
import { addPostApplication } from "@/api/applicationPost";
import store from '@/store'

export default {
  data() {
    return {
      form: {
        c_id: "",
        app_theme: "",
        stu_id: store.getters.user_id,  // 当前申请人的学号或者工号
        app_name: store.getters.name,
        app_phone: "",
        app_type: "",
        app_post_type: "",
        applicant: "",
        app_size: "",
        app_start_time: "",
        app_end_time: "",
        app_content: "",
        app_passTime: ""
      },
      imgs: [],
      pickerOptions: {
        disabledDate(time) {
            return time.getTime() < Date.now() - 3600 * 1000 * 24;
        }
      }
    };
  },
  methods: {
    afterUpload(res) {
      this.$set(this.form, 'app_content', res.url)
      this.form.app_content = res.url
    },
    onSubmit() {
      this.$confirm("提起宣传品张贴申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          addPostApplication(this.form).then(res => {
            this.$message({
              type: "success",
              message: "申请成功!"
            });
          });
        })
        .catch(() => {
        });
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
