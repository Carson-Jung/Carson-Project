<template>
    <div>
        <el-container>
            <el-header class="header" style="height: 90px">
                <Header/>
            </el-header>
            <el-main>
                <el-row>
                    <el-col :md="{span:20,offset:2}" :lg="{span:18,offset:3}">
                        <div class="container">
                            <el-tabs :tab-position="tabPosition" type="border-card" value="userInfo">
                                <el-tab-pane label="个人资料" name="userInfo">
                                    <UserInfo/>
                                </el-tab-pane>
                                <el-tab-pane label="房东验证" name="landlordInfo">
                                    <LandlordInfo/>
                                </el-tab-pane>
                                <el-tab-pane label="经纪人验证" name="agentCheck">
                                    <AgentCheck/>
                                </el-tab-pane>
                                <el-tab-pane label="我的约看" name="myLooking">
                                    <MyLooking/>
                                </el-tab-pane>
                                <el-tab-pane label="我的收藏">我的收藏</el-tab-pane>
                                <el-tab-pane label="我的评论">我的评论</el-tab-pane>
                                <el-tab-pane label="我的房源" v-if="this.userInfo.role_id===5">我的房源</el-tab-pane>
                                <el-tab-pane label="经纪人信息" name="agentInfo" v-if="this.userInfo.role_id===3">
                                    <AgentInfo/>
                                </el-tab-pane>
                                <el-tab-pane label="约看平台" name="lookingList" v-if="this.userInfo.role_id===3">
                                    <LookingList/>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
            <el-footer>
                <Footer/>
            </el-footer>
        </el-container>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import Header from '../components/Header'
import Footer from '../components/Footer'
import UserInfo from '../components/UserInfo'
import LandlordInfo from '../components/LandlordInfo'
import AgentInfo from '../components/AgentInfo'
import AgentCheck from '../components/AgentCheck'
import MyLooking from '../components/MyLooking'
import LookingList from '../components/LookingList'
export default {
  data () {
    return {
      tabPosition: 'left'
    }
  },
  components: {
    Header,
    Footer,
    UserInfo,
    LandlordInfo,
    MyLooking,
    AgentCheck,
    AgentInfo,
    LookingList
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped>
.header>>> a:nth-child(3) {
  color: #f7a11f;
}
.header{
    border-bottom: 2px #df8e3e solid;
}
.container {
    height: 100%;
    min-height: 600px;
    min-width: 640px;
}
.el-tabs {
    height: 100%;
}
</style>
