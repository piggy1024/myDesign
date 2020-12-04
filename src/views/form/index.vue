<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="活动主题及内容">
        <el-input v-model="form.name"  type="textarea" />
      </el-form-item>
      <el-form-item label="申请单位">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="申请联系人">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="教室类型">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="多媒体教室" value="shanghai" />
          <el-option label="非多媒体教室" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="申请使用时间">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="Pick a time" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item label="活动类型">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="教学活动" name="type" />
          <el-checkbox label="学生活动" name="type" />
          <el-checkbox label="其他活动" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

