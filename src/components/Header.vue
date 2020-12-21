<template>
    <div class="headerContainer">
        <el-row align="middle" >
            <el-col :xs="{span:6,offset:0}" :sm="{span:6,offset:0}" :md="{span:6,offset:1}" :lg="{span:6,offset:2}">
                <div class="head">
                    <div class="logo">
                        <img class="logoImg pull-left" src="../assets/img/logo.png">
                        <div class="pull-left title">
                            <span>宜居</span><br/>
                            悦 | 享 | 生 | 活
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4">
                <div class="head pull-left">
                    <div class="location ">
                        <span class="el-icon-location"></span>
                        <span id="city">广州</span>
                    </div>
                </div>
            </el-col>
            <el-col :xs="10" :sm="10" :md="9" :lg="8">
                <div class="head indexHeadNav pull-left">
                    <router-link to="index">首页</router-link>
                    <router-link to="findHouse">租房</router-link>
                    <router-link to="homePage" v-if="this.$store.state.isLogin">个人主页</router-link>
                    <a v-if="this.$store.state.isLogin" @click="toHomeSend">发布房源</a>
                </div>
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4">
                <div class="login head"  v-if="this.$store.state.isLogin">
                    <span class="pull-right currUser">{{this.$store.state.userInfo.name}}</span>
                    <span @click="exitLogin" id="exit">退出</span>
                </div>
                <div class="head userLogin" v-else>
                    <img class="userImg" src="../assets/img/head_test.jpg">
                    <router-link to="login">登录</router-link>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  methods: {
    exitLogin () {
      const user = {
        isLogin: false,
        user: {}
      }
      this.$store.dispatch('exitLogin', user)
      alert('您已成功退出登录')
      this.$router.push('login')
    },
    toHomeSend () {
      if (this.$store.state.userInfo.role_id === 5 || this.$store.state.userInfo.role_id === 1) {
        this.$router.push('homeSend')
      } else {
        alert('请先通过房东验证再发布房源')
        if (window.location.href.search('homePage') === -1) {
          this.$router.push({
            name: 'homePage'
          })
        }
      }
    }
  }
}
</script>

<style scope>
.pull-left{
    float: left !important;
}
.pull-right{
    float: right !important;
}
.headerContainer{
    width:100%;
    min-width:660px;
}
.head{
    display: flex;
    height: 90px;
    flex-direction: row;
    align-items: center;
}
/* 标题 */
.title{
    padding-left: 5px;
    color: #f7a11f;
}
.title span{
    font-weight: bold;
}
/* 图标 */
.logo{
    min-width: 180px;
}
.logoImg{
    height: 40px;
    padding-left:20px ;
}
/* 首页定位 */
.location{
    min-width: 60px;
    height: 30px;
    font-size: small;
}
.location span {
    text-align: center;
    margin-left: 5px;
    padding: 5px 0;
}
.location {
    padding-right: 8px;
    border: 1px solid #999;
    border-radius: 10px;
}
/* 跳转导航 */
.indexHeadNav>a,.userLogin>a {
    margin-top: 5px;
    font-size: large;
    color: black;
    padding-bottom: 10px;
    text-decoration: none;
    cursor: pointer;
}
.indexHeadNav>a{
    margin-right: 20px;
}
.indexHeadNav>a:last-child{
    margin-right: 10px;
}
.indexHeadNav>a:hover {
    color: black;
    text-decoration: none;
    border-bottom: #e7af85 3px solid;
}

/* 当前用户 */
.currUser{
    margin-right: 10px;
}
/* 头像 */
.userImg{
    width: 60px;
    margin-right: 20px;
}
.userLogin a:hover{
    color: #f7a11f;
    text-decoration: underline;
}
#exit:hover{
    color: #f7a11f;
    text-decoration: underline;
    cursor: pointer;
}
</style>
