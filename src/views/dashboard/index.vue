<template>
  <div class="dashboard-container">
    <div class="dashboard-text">你好: {{ name }}</div>
    欢迎使用学校资源使用申请审批系统!<br>
    1.系统介绍:<br>
	学校的教师分配使用,需要申请审批得到多方盖章同意才可以进行使用,因盖章审批需要到各审批处过于不方便,因此开发一套教室使用审批系统.<br>
  2.身份简介:<br>
    分别有三种身份使用该系统<br>
    申请教室使用方: 申请教室的使用
    审批方:审核教室使用的申请
    管理员方:给使用和审批方创建账号<br>
  5.系统需求<br>
      首先进入登录界面，可选择的身份有：<br>
            使用方
            审核方
            管理员
            退出<br>
      每个身份都需要进行验证后，进入子菜单<br>
            使用方要输入：学号，姓名，登录密码
            使用方要输入：职工号，姓名，登录密码；
            管理员要输入：管理员姓名，登录密码；<br>
      使用方具体功能<br>
          申请预约  ---- 预约教室
          查看自身预约 ---- 查看自己的预约状态
          查看所有预约 ---- 查看全部的预约信息以及预约状态
          取消预约 ---- 取消自身预约，预约成功或审核中的预约均可取消
          注销登录 ---- 退出登录<br>
      审核方具体功能<br>
          查看所有预约 ---- 查看全部预约信息以及预约状态
          审核预约 ---- 对审核方的预约进行审核
          注销登录 ---- 退出登录<br>
      管理员具体功能<br>
          添加账号 ---- 添加申请方或审批方的账号，需要检测申请者编号或审批方号是否重复
          查看账号 ---- 可以选择查看申请或审批方的全部信息
          查看机房 ---- 查看所有教室的信息
          清空预约 ---- 清空所有预约记录
          注销登录 ---- 退出登录<br>

          <h5>最新公告</h5>
          content: 土巴兔招聘

          <el-time-picker
            is-range
            @change="changeTime"
            v-model="value4"
            value-format="HH:mm"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围">
          </el-time-picker>
          <el-time-picker
            is-range
            arrow-control
            @change="changeTime"
            v-model="value5"
            value-format="HH:mm"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围">
          </el-time-picker>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
          <template slot-scope="scope">
            <el-select @change="changeValue" @focus="changeVal1(scope.row.value2)" v-model="scope.row.value2" placeholder="请选择第一行预约时间">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <el-button @click="addRow">添加一行</el-button>

      <el-select @change="changeVal" v-model="value22" placeholder="请选择第二行预约时间">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled">
        </el-option>
      </el-select>

      <div class="toolbar">
      <div class="pull-left page-plan-options">
        <el-radio-group v-model="currentPlanType">
          <el-radio-button :label="1">
            <i class="page-plan-flag"></i>
            <span>事件1</span>
          </el-radio-button>
          <el-radio-button :label="2">
            <i class="page-plan-flag range-color2"></i>
            <span>事件2</span>
          </el-radio-button>
        </el-radio-group>
      </div>
      <div class="pull-right">
        <el-button icon="h-icon-delete" @click="handleClear">清空</el-button>
      </div>
    </div>
    <h-plan-group label-width="80px" action-width="48px">
      <h-plan
        v-for="(value,index) in rangeData"
        :key="index"
        :current-type="currentPlanType"
        :custom-range-color="customRangeColor"
        v-model="rangeData[index]"
        @mouseenter="handleMouseEnter(index)"
        @timeerror="timeError"
        :step="1"
      >
        <span slot="label">{{week[index]}}</span>
        <!-- 复制功能 -->
        <el-popover
          slot="action"
          :ref="'popover'+index"
          placement="left"
          title="复制到"
          popper-class="page-plan-popover"
          trigger="click"
          @show="handlePopShow"
          @hide="handlePopHide"
        >
          <div>
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <el-checkbox-group
              v-model="checkedDays"
              @change="handleCheckedDaysChange"
            >
              <el-checkbox
                v-for="(day,n) in week"
                :disabled="n===index"
                :label="n"
                :key="day"
              >
                {{day}}
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <div style="text-align: right; margin: 0">
            <el-button type="text" size="mini" @click="handleCopyConfirm(index)">
              确定
            </el-button>
            <el-button
              type="text"
              size="mini"
              class="popover-cancel-btn"
              @click="closePopover(index)"
            >
              取消
            </el-button>
          </div>
          <el-button
            :class="{'btn-plan-copy':true,'show':focus===index}"
            icon="h-icon-copy"
            slot="reference"
          ></el-button>
        </el-popover>
      </h-plan>
    </h-plan-group>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const week = [
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
    '星期日'
];
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data (){
    return {
      tableData: [{
        value2: '',
        date: '111'
      },
      {
        value2: '',
        date: '111'
      }],
      value4: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      value5: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      options2: [{
        value: '00:00 - 00:30',
        label: '00:00 - 00:30'
      }, {
        value: '00:30 - 01:00',
        label: '00:30 - 01:00'
      }, {
        value: '01:00 - 01:30',
        label: '01:00 - 01:30'
      }, {
        value: '01:30 - 02:00',
        label: '01:30 - 02:00'
      }, {
        value: '02:30 - 03:00',
        label: '02:30 - 03:00'
      }],
      value2: '',
      value22: '',
      tableData: [
        {beginTime: "00:00", endTime: "00:30"},
        {beginTime: "01:00", endTime: "01:30"}
      ],
      hasSelectTime: [],
      week: week,
        checkedDays: [],
        currentPlanType: 1,
        rangeData: [
          [{ type: 1, from: 900, to: 86399 }],
          [
            { type: 2, from: 28800, to: 46800 },
            { type: 2, from: 72000, to: 78300 }
          ],
          [{ type: 1, from: 18000, to: 36000 }],
          [{ type: 1, from: 36900, to: 45000 }],
          [{ type: 2, from: 27000, to: 45000 }],
          [{ type: 1, from: 72000, to: 78300 }],
          [{ type: 1, from: 28800, to: 46800 }]
        ],
        customRangeColor: {
          '1': '#3d6ce5',
          '2': '#f8ab7c'
        },
        focus: 0,
        isPopoverShow: false,
        checkAll: false,
        isIndeterminate: false
    }
  },
  created() {
    // this.tableData.forEach(item=>{
    //   this.hasSelectTime.push(item.beginTime +" - " + item.endTime)
    // })
    // this.options2.forEach(item=>{
    //   if(this.hasSelectTime.indexOf(item.label)>=0){item.disabled = true}
    // })
  },
  methods: {
    addRow(){this.tableData.push({})},
    changeValue(e){
      let tempBegin = e.split(' - ')[0];
      let tempEnd = e.split(' - ')[1];
      // this.tableData.push({beginTime: tempBegin, endTime: tempEnd})
      console.log(e);
      this.hasSelectTime.push(e)
    },
    reflash(){
      this.hasSelectTime = []
      console.log(this.tableData);
      this.tableData.forEach(item=>{
        if(!item.time){
          this.hasSelectTime.push(item.beginTime +" - " + item.endTime)
        } else {
          this.hasSelectTime.push(item.time)
        }
      })
      console.log(this.hasSelectTime);
      this.options2.forEach(item=>{
        if(this.hasSelectTime.indexOf(item.label)>=0){item.disabled = true}
      })
      console.log(this.options2);
    },
    changeVal1(val){
      // console.log(val);
      this.reflash()
      this.hasSelectTime.push(val);
      this.options2.forEach(item=>{
        if(this.hasSelectTime.indexOf(item.label)>=0){item.disabled = true} else {item.disabled = false}
      })
      // console.log(this.hasSelectTime);
    },
    changeVal(e){
      // console.log(e);
      // console.log(this.value2);
      this.hasSelectTime.push(this.value2);
      this.options2.forEach(item=>{
        if(this.hasSelectTime.indexOf(item.label)>=0){item.disabled = true}
      })
    },
    changeTime(e){
      console.log(e[0].toString());
      console.log(e[1].toString());
    },
    handleClear() {
        this.rangeData = this.rangeData.map(item => {
          return [];
        });
      },
      handlePopShow() {
        this.isPopoverShow = true;
      },
      handlePopHide() {
        this.checkAll = false;
        this.checkedDays = [];
        this.isIndeterminate = false;
        this.isPopoverShow = false;
      },
      handleMouseEnter(index) {
        if (!this.isPopoverShow) {
          this.focus = index;
        }
      },
      closePopover(index) {
        this.$refs['popover' + index][0].doClose();
      },
      handleCopyConfirm(index) {
        const currentData = this.rangeData[index];
        this.checkedDays.forEach(val => {
          this.$set(
            this.rangeData,
            val,
            JSON.parse(JSON.stringify(currentData))
          );
        });
        this.closePopover(index);
      },
      handleCheckAllChange(checked) {
        this.checkedDays = checked ? [0, 1, 2, 3, 4, 5, 6] : [];
        this.isIndeterminate = false;
      },
      handleCheckedDaysChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.week.length;
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.week.length;
      },
      timeError() {
        console.error('timeError');
      }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
