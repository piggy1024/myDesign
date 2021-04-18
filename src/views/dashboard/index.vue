<template>
  <div class="dashboard-container">
    <div class="carouselContainer">
      <div class="block" style="width: 100%">
        <el-carousel trigger="click" height="300px" type="card">
          <el-carousel-item v-for="item in urlList" :key="item">
            <!-- <h3>{{ item }}</h3> -->
            <img :src="item" alt="" width="100%" height="100%">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="announcementContainer">
      <div class="header"><i class="el-icon-document"></i><h1>最新公告</h1></div>
      <div class="contentContainer">
        <div class="theme">{{newAnnouncement.theme}}</div>
        <div class="info">
          <div class="publisher">发布者: {{newAnnouncement.publisher}}</div>
          <div class="time">发布时间: {{newAnnouncement.publishTime}}</div>
        </div>
        <div class="content">
          <!-- <el-input type="textarea" v-model="newAnnouncement.content" disabled size="large"></el-input> -->
              <span>{{nbsp}}</span>{{newAnnouncement.content}}
        </div>
      </div>
    </div>
    <!-- <div class="dashboard-text">你好: {{ name }}</div>
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
          注销登录 ---- 退出登录<br> -->


  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { findNewAnnouncement } from '@/api/announcement'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data (){
    return {
      nbsp: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',
      urlList: [require('../../assets/images/classroomApply.png'), require('../../assets/images/postApply.png'), require('../../assets/images/personCenter.png')],
      newAnnouncement: {
        theme: '',
        content: '',
        publisher: '',
        publishTime: '',
        phone: ''
      }
    }
  },
  created() {
    this.getNewAnnouncement()
  },
  methods: {
    getNewAnnouncement () {
      findNewAnnouncement().then(res => {
        this.newAnnouncement = res.data
      })
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
.carouselContainer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.announcementContainer {
  .header {
    display: flex;
    margin: 16px 0 0 16px;
    i {
      text-align: center;
      margin-top: 12px;
      font-size: 48px;
    }
  }
  border-radius: 32px;
  // margin-top: 10 px;
  height: 380px;
  background: rgb(108, 245, 238);
  .contentContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    .theme {
      font-size: 48px;
      margin: 16px 0;
    }
    .info {
      display: flex;
      font-size: 12px;
      color: gray;
      margin-bottom: 32px;
      .publisher {
        margin-right: 48px;
      }
    }
    .content {
      padding: 0 60px;
      font-size: 30px;
    }
  }
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>
