<template>
    <div class="outContainer">
        <div class="personApplyCondition">
            <div class="detail">
                <el-row class="title">用户当前总申请数</el-row>
                <el-row class="value">{{ userApplyData.userApplyCount }}</el-row>
            </div>
            <div class="detail">
                <el-row class="title">用户当前生效申请个数</el-row>
                <el-row class="value">{{ userApplyData.userActiveCount }}</el-row>
            </div>
            <div class="detail">
                <el-row class="title">用户当前处于申请中的个数</el-row>
                <el-row class="value">{{ userApplyData.userApplyingCount }}</el-row>
            </div>
        </div>
        <div class="personContainer">
            <!-- <el-row>1</el-row> -->
            <el-row>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="姓名">
                        <el-input v-model="form.stu_name" :disabled="isEdit"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-input v-model="form.stu_sex" :disabled="isEdit"></el-input>
                    </el-form-item>
                    <el-form-item label="所在单位">
                        <el-input v-model="form.stu_academy" :disabled="isEdit"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="form.stu_phone" :disabled="isEdit"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="form.stu_email" :disabled="isEdit"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.stu_password" :disabled="isEdit"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">编辑</el-button>
                        <el-button @click="confirm">确认</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
            <!-- <el-row>3</el-row> -->
        </div>
    </div>
</template>

<script>
import store from '@/store'
import { getStudentInfo, addStudent } from '@/api/student'
import { getUserApplyData } from '@/api/user'
export default {
    data() {
        return {
            form: {
                _id: '',
                stu_name: '',
                stu_password: '',
                stu_academy: '',
                stu_email: '',
                stu_phone: '',
                stu_sex: ''
            },
            isEdit: true,
            userApplyData: {
                userApplyingCount: '',
                userActiveCount: '',
                userApplyCount: ''
            }
        }
    },
    created() {
        this.getStudentInfo()
        this.getUserApplyData()
    },
    methods: {
        // 获取学生信息
        getStudentInfo() {
            getStudentInfo({id: store.getters.user_id}).then(res => {
                this.form = res.data
            })
        },
        getUserApplyData() {
            getUserApplyData({user_id: store.getters.user_id}).then(res => {
                this.userApplyData = res.data
            })
        },
        onSubmit() {
            this.isEdit = false
        },
        confirm() {
            this.$confirm('是否确认修改信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.isEdit = true
                addStudent(this.form).then(res => {
                    console.log(res)
                })
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                });
            }).catch(err => {
               this.isEdit = true
            })

        }
    }
}
</script>

<style lang="scss" scoped>
.outContainer {
    // display: flex;
    // justify-content: center;
    // align-items: center;
}
.personApplyCondition {
  margin: 16px 16px 0 16px;
  height: 200px;
  // background: rgb(108, 245, 238);
  display: flex;
  justify-content: space-between;
  .detail {
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    width: 400px;
    background: rgb(108, 245, 238);
    // background: rgb(147, 247, 172);
    .title {
      font-size: 24px;
      font-weight: bold;
      padding: 48px 0;
    }
    .value {
      font-size: 36px;
      color: rgb(247, 74, 44);
    }
  }
}
.personContainer {
    border-radius: 16px;
    margin: 0 16px;
    margin-top: 20px;
    // width: 900px;
    height: 540px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(108, 245, 238);
}
</style>