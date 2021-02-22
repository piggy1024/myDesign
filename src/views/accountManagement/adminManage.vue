<template>
  <div class="app-container">
    <el-button type="primary" @click="addAccount">新增账号</el-button>
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
      <el-table-column label="名字">
        <template slot-scope="scope">
          {{ scope.row.admin_name }}
        </template>
      </el-table-column>
      <el-table-column label="所属单位" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.apartment }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工号" align="center">
        <template slot-scope="scope">
          {{ scope.row.admin_number }}
        </template>
      </el-table-column>
      <el-table-column label="联系方式" align="center">
        <template slot-scope="scope">
          {{ scope.row.admin_phone }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" align="center">
        <template slot-scope="scope">
          {{ scope.row.admin_email }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row._id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="deleteAccount(scope.row._id)"
            >删除</el-button
          >
          <el-button type="success" @click="resetPassword(scope.row._id)"
            >重置密码</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增弹窗 -->
    <el-dialog title="新增账号" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名字" :label-width="formLabelWidth">
          <el-input v-model="form.admin_name" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="所属单位" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="教务处" value="shanghai"></el-option>
            <el-option label="物业中心" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="所属单位" :label-width="formLabelWidth">
          <el-input v-model="form.apartment" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工号" :label-width="formLabelWidth">
          <el-input v-model="form.admin_number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="form.admin_phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.admin_email" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit(form._id)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAdminsList,
  findAdmin,
  addAdmin,
  deleteAdmin,
  resetPassword
} from "@/api/admin";

export default {
  data() {
    return {
      list: [],
      listLoading: false,
      dialogFormVisible: false,
      form: {
        _id: "",
        admin_name: "",
        apartment: "",
        admin_number: "",
        admin_phone: "",
        admin_email: ""
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 重置密码
    resetPassword(id) {
      this.$confirm("此操作将重置该账号为默认密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          resetPassword({ id: id }).then(res => {});
          this.$message({
            type: "success",
            message: "重置密码成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置!"
          });
        });
    },
    // 编辑账号
    edit(id) {
      findAdmin({ id: id }).then(res => {
        this.form = res.data;
        this.dialogFormVisible = true;
      });
    },
    // 删除账号
    deleteAccount(id) {
      this.$confirm("此操作将永久删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteAdmin({ id: id }).then(res => {
            console.log(res);
            this.fetchData();
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 确认新增
    addSubmit(id) {
      this.form._id = id;
      addAdmin(this.form).then(res => {
        // console.log(res);
        // 新增后重新刷新列表数据
        this.fetchData();
        this.dialogFormVisible = false;
      });

    },
    // 新增账号
    addAccount() {
      this.form._id = "";
      this.dialogFormVisible = true;
    },
    // 获取列表数据
    fetchData() {
      this.listLoading = true;
      getAdminsList().then(response => {
        this.list = response.data;
        // 强制页面重新更新数据
        this.$set(this.list);
        this.listLoading = false;
      });
    }
  }
};
</script>
