<template>
  <div class="app-container">
    <div style="padding: 20px">
        <el-button type="primary" @click="addAnnouncement">新增公告</el-button>
    </div>
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
      <el-table-column label="公告主题">
        <template slot-scope="scope">
          {{ scope.row.theme }}
        </template>
      </el-table-column>
      <el-table-column label="公告详细内容" align="center">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column label="发布日期" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.publishTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="400px">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row._id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="deleteAnnouncement(scope.row._id)"
            >撤销</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增弹窗 -->
    <el-dialog title="新增公告" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="公告主题" :label-width="formLabelWidth">
          <el-input v-model="form.theme" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公告详细内容" :label-width="formLabelWidth">
          <el-input v-model="form.content" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="form.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" auto-complete="off"></el-input>
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
  getAnnouncementsList,
  findAnnouncement,
  addAnnouncement,
  deleteAnnouncement
} from "@/api/announcement";
import store from '@/store'

export default {
  data() {
    return {
      list: [],
      listLoading: false,
      dialogFormVisible: false,
      form: {
        _id: "",          // 公告_id
        theme: "",        // 公告主题
        content: "",      // 公告内容
        publisher: store.getters.name,    // 发布者
        phone: "",        // 联系方式
        publishTime: "",  // 发布时间
        remark: "",       // 备注
        isPublish: true   // 是否发布
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 编辑公告
    edit(id) {
      findAnnouncement({ id: id }).then(res => {
        this.form = res.data;
        this.dialogFormVisible = true;
      });
    },
    // 删除公告
    deleteAnnouncement(id) {
      this.$confirm("此操作将永久撤销该公告, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteAnnouncement({ id: id }).then(res => {
            this.fetchData();
          });
          this.$message({
            type: "success",
            message: "撤销成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消撤销"
          });
        });
    },
    // 确认新增
    addSubmit(id) {
      this.form._id = id;
      if(!this.form.publishTime){
        this.form.publishTime = new Date();
      }
      addAnnouncement(this.form).then(res => {
        // console.log(res);
        // 新增后重新刷新列表数据
        this.fetchData();
        this.dialogFormVisible = false;
      });

    },
    // 新增公告
    addAnnouncement() {
        // this.$refs[form].resetFields()
        this.form._id = "";
        this.dialogFormVisible = true;
    },
    // 获取列表数据
    fetchData() {
      this.listLoading = true;
      getAnnouncementsList().then(response => {
        this.list = response.data;
        // Object.assign(this.list,  response.data)
        // 强制页面重新更新数据
        this.$set(this.list);
        this.listLoading = false;
      });
    }
  }
};
</script>
