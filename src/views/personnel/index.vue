<template>
    <div class="outContainer">
        <div class="personContainer">
            <el-row></el-row>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="所在单位">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
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
            console.log('submit!');
        }
    }
}
</script>

<style lang="scss" scoped>
.outContainer {
    display: flex;
    justify-content: center;
    align-items: center;
}
.personContainer {
    margin-top: 40px;
    width: 900px;
    height: 900px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(220, 223, 223);
}
</style>