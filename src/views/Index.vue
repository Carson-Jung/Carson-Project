<template>
    <div>
        <el-container class="indexBg">
            <el-header class="indexHeadTop" style="height: 60px">
                <el-row >
                    <el-col :lg="24">
                        <el-col :xs="5" :sm="6" :md="6" :lg="6" class="pull-left">
                            <img class="indexLogo pull-left" src="../assets/img/logo.png">
                            <div class="pull-left title">
                                <span>宜居</span><br/>
                                悦 | 享 | 生 | 活
                            </div>
                        </el-col>
                        <el-col :xs="3" :sm="4" :md="6" :lg="6" id="getLocation" class="pull-left">
                            <span class="el-icon-location"></span>
                            <span id="city">广州</span>
                        </el-col>
                        <el-col :xs="10" :sm="10" :md="8" :lg="8" class="indexNav pull-left">
                            <router-link to="index">首页</router-link>
                            <router-link to="findHouse">租房</router-link>
                            <router-link to="homePage" v-if="this.$store.state.isLogin">个人主页</router-link>
                            <router-link to="homeSend" v-if="this.$store.state.isLogin">发布房源</router-link>
                        </el-col>
                        <el-col :xs="6" :sm="4" :md="4" :lg="4" class="login">
                            <router-link to="login">登录</router-link>
                            <span>|</span>
                            <router-link to="register">注册</router-link>
                        </el-col>
                    </el-col>
                </el-row>
            </el-header>
            <el-main style="height: 240px; overflow:hidden">
                <el-row >
                    <el-col :lg="24" class="headMid" >
                        <div class="headMidContent">
                            <span >宜居，悦享租房新方式</span>
                            <h3 >Enjoy the leisure life in the fun !</h3>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
            <el-footer class="headFoot" style="height: 240px">
                <el-row>
                    <el-col :lg="24">
                        <el-col :xs="{offset:0}" :sm="{offset:1}" :lg="{offset:4}" :offset="2">
                            <img src="../assets/img/familyGo.png" alt="">
                        </el-col>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :lg="24">
                        <el-col :xs="{span:8,offset:0}" :sm="{span:8,offset:1}" :md="8" :lg="{span:6 ,offset:4}" :offset="2">
                            <div>
                                <span class="el-icon-location iconLable"></span>
                                <el-cascader
                                    :options="options"
                                    v-model="selectedOptions"
                                    :props="{value:'label'}"
                                    @change="handleChange"
                                    placeholder="请选择目的地、城市">
                                </el-cascader>
                            </div>
                        </el-col>
                        <el-col :xs="16" :sm="15"  :md="14" >
                            <div>
                                <el-date-picker
                                    v-model="time"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="入住日期"
                                    end-placeholder="退房日期"
                                    unlink-panels
                                    value-format="yyyy-MM-dd">
                                </el-date-picker>
                                <el-button id="toFindHouse" @click="toFindHouse">开始找房</el-button>
                            </div>
                        </el-col>
                    </el-col>
                </el-row>
            </el-footer>
        </el-container>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { regionData } from 'element-china-area-data'
export default {
  data () {
    return {
      options: regionData,
      selectedOptions: [],
      time: ''
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  methods: {
    handleChange (value) {
      console.log(value)
    },
    toFindHouse () {
      this.$router.push('findHouse')
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
.title{
    padding-left: 5px;
    color: #f7a11f;
}
/* 首页背景 */
.indexBg{
    position: fixed;
    background-image: url("../assets/img/indexbg.jpg");
    background-repeat: no-repeat;
    min-width: 850px;
    height: 540px;
    width: 100%;
    background-size: 100%;
    box-shadow: 0 2px 2px rgba(0,0,0,0.2);
    z-index: -1;
}
/* 首页头部 */
.indexHeadTop{
    height: 60px;
    background-color: rgba(0,0,0,0.1);
    color: white;
    padding-top: 10px;
}
/* 首页图标 */
.indexLogo{
    height: 40px;
    padding-left:20px ;
}
/* 首页定位 */
#getLocation{
    background-image: url("../assets/img/locationbg.png");
    background-repeat: no-repeat;
    height: 30px;
    font-size: small;
    padding-left: 13px;
    padding-top: 5px;
    margin-top: 3px;
    border-radius: 5px;
}
#getLocation span {
    text-align: center;
    margin-left: 5px;
}

/* 跳转导航 */
.indexNav>a,.login>a {
    margin-top: 5px;
    color: white;
    font-size: large;
    padding-bottom: 10px;
    text-decoration: none;
    cursor: pointer;
}
.indexNav>a{
    margin-right: 20px;
}
.indexNav>a:last-child{
    margin-right: 10px;
}
.indexNav>a:hover {
    color: white;
    text-decoration: none;
    border-bottom: #e7af85 3px solid;
}
.login a:hover {
    color: #e7af85;
}
/* 首页主体介绍 */
.headMid {
    position: relative;
    height: 240px;
}
.headMidContent{
    position: absolute;
    top: 30px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    color: white;
    width: 500px;
    height: 150px;
    text-align: right;
}
.headMidContent span{
    font-size: 50px;
    margin-bottom: 20px;
}

/* 底部搜索栏 */
.headFoot {
    height: 150px;
}
.headFoot img{
    height: 100px;
}
/* 图标标签 */
.iconLable{
    padding: 6px 12px;
    background-color: #fff;
    font-weight: normal;
    line-height: 1;
    color: #555;
    text-align: center;
    height: 24px;
    line-height: 24px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
/* 按钮样式 */
#toFindHouse{
    background-color: #f7a11f;
    color: white;
    border-radius: 5px;
}
</style>
