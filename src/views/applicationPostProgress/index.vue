<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="showList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ (filterForm.pageNo-1)*10 + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="申请单位" width="150">
        <template slot-scope="scope">
          {{ scope.row.app_id.applicant }}
        </template>
      </el-table-column>
      <el-table-column label="申请联系人" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.app_id.app_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最近一次处理时间" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.app_id.app_passTime }}
        </template>
      </el-table-column>
      <el-table-column label="最近一次处理原因" align="center">
        <template slot-scope="scope">
          {{ scope.row.app_id.reason }}
        </template>
      </el-table-column>
      <el-table-column label="处理状态" width="110" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.app_id.status === 2">审批完成</span>
          <span v-else>
            <span v-if="scope.row.department_status === '0' && scope.row.propagandaDepartment_status === '0'">未审批</span>
            <span v-if="scope.row.department_status !== '0' && scope.row.propagandaDepartment_status !== '0'">审批完成</span>
            <span v-else><span v-if="scope.row.department_status !== '0' || scope.row.propagandaDepartment_status !== '0'">审批中</span>
          </span>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="详情" align="center">
        <template slot-scope="scope">
          <el-button @click="showDetail(scope.$index)">审批详情</el-button>
        </template>
      </el-table-column>
      <el-table-column label="审批结果" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.app_id.status === 2">
            已驳回
          </span>
          <span v-else>
           {{ scope.row.app_id.status === 1 ? '已通过' : '审批中' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="info" @click="edit(scope.row.app_id)" v-if="scope.row.app_id.status === 0">编辑</el-button>
          <el-button type="danger" @click="cancelApplication(scope.row.app_id._id)">取消申请</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        background
        @current-change="changePage"
        layout="prev, pager, next"
        :total="listTotal">
      </el-pagination>
    </div>
    <el-dialog title="审批详情" :visible.sync="dialogDetailVisible">
      <el-steps :active="detail.step" align-center>
            <el-step title="部门" :description="detail.department_reason"></el-step>
            <el-step title="宣传部" :description="detail.propagandaDepartment_reason"></el-step>
        </el-steps>
    </el-dialog>
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel('form')">取 消</el-button>
        <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getApplyPostList, editPostApplication, deletePostApply } from '@/api/applicationPost'
import store from '@/store'
import formatDate from '@/utils/formatDate'

export default {
  data() {
    return {
      listTotal: 0,
      list: [],
      showList: [],
      listLoading: false,
      dialogDetailVisible: false,
      detail: {
        step: 0,
        department_reason: '',
        propagandaDepartment_reason: ''
      },
      filterForm: {
        size: '',
        pageNo: 1,
        pageSize: 10,
      },
      form: {
        _id: "",
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
      dialogFormVisible: false,
      pickerOptions: {
        disabledDate(time) {
            return time.getTime() < Date.now() - 3600 * 1000 * 24;
        }
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    afterUpload(res) {
      this.$set(this.form, 'app_content', res.url)
      this.form.app_content = res.url
    },
    // 编辑按钮
    edit(detail) {
      this.form = detail
      this.dialogFormVisible = true
    },
    onCancel(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
    onSubmit(formName) {
      editPostApplication(this.form).then(res => {
        this.$message.success("修改成功!");
      });
      this.dialogFormVisible =false;
    },
    changePage(page){
      this.filterForm.pageNo = page
      this.showList = this.list.slice(10*(page-1),10*page)
    },
    // 取消申请
    cancelApplication(id) {
      this.$confirm("此操作将永久取消申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deletePostApply({'_id':id}).then(res=>{
            // console.log(res);
          })
          this.fetchData()
          this.$message({
            type: "success",
            message: "取消成功!"
          });
        })
        .catch(() => {
        });
    },
    // 显示审批详情
    showDetail(index){
      // 每次点击展示详情先初始化detail数据
      Object.assign(this.$data.detail, this.$options.data().detail);
      // 将当前行选中的审批详情复制给detail
      Object.assign(this.detail, this.list[index])

      if(this.detail.department_status !== '0') {
        this.detail.step = 1
      }
      if(this.detail.propagandaDepartment_status !== '0') {
        this.detail.step = 2
      }
      // this.detail = this.list[index];
      // this.detail.step = 1;
      this.dialogDetailVisible = true
    },
    fetchData() {
      this.listLoading = true
      getApplyPostList({user_id: store.getters.user_id}).then(res => {
        this.listTotal = res.data.length;
        this.list = res.data;
        // 处理时间格式
        this.list.forEach(item => {
          // 如果有审批时间,转化审批时间格式
          if(item.app_id.app_passTime){
            item.app_id.app_passTime = formatDate(item.app_id.app_passTime)
          }
          return item
        });
        // 取前十条数据给到表格
        this.showList = this.list.slice(0,10)
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss">
.pagination {
  margin-top: 12px;
}
</style>
