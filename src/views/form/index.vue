<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="'/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="form.icon" :src="form.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
        icon: ''
      }
    };
  },
  methods: {
    afterUpload(res) {
      // 明确告诉vue赋值 form.icon = res.url
      this.$set(this.form, 'icon', res.url)
      // this.form.icon = res.url
    },
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
