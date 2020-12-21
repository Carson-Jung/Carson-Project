<template>
  <div>
    <el-row>
      <el-col :xs="{span:22,offset:1}" :sm="{span:20,offset:2}" :md="{span:20,offset:2}" :lg="{span:16,offset:4}">
        <div class="container">
          <div class="header">
            <h3>经纪人信息</h3>
          </div>
          <!-- 证件信息 -->
          <div class="agentInfo">
            <div class="info clearfix">
              <div class="label">
                <span>真实姓名:</span>
              </div>
              <div>
                <span>{{agentInfo.real_name}}</span>
              </div>
            </div>
            <div class="info clearfix">
              <div class="label">
                <span>工作时长:</span>
              </div>
              <div>
                <span>{{agentInfo.work_time}}年</span>
              </div>
            </div>
            <div class="info clearfix">
              <div class="label">
                <span>评分:</span>
              </div>
              <div>
                <el-rate
                  v-model="agentInfo.star"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}">
                </el-rate>
              </div>
            </div>
            <div class="info clearfix">
              <div class="label">
                <span>证件照:</span>
              </div>
              <div class="picture" v-if="agentInfo.photo_name">
                <img :src="`data:image/png;base64, ${agentInfo.photo_name}`" alt="经纪人证件">
              </div>
            </div>
            <div class="info clearfix">
              <div class="label">
                <span>验证状态: </span>
              </div>
              <div>
                <span>{{status?status:'待验证'}}</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      agentFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  methods: {
  },
  computed: {
    ...mapState(['agentInfo', 'userInfo']),
    status () {
      if (this.agentInfo.status === 0) {
        return '待审批'
      } else if (this.agentInfo.status === 1) {
        return '审批中'
      } else if (this.agentInfo.status === 2) {
        return '已认证'
      } else {
        return '待审批'
      }
    }
  },
  mounted () {
    this.$axios({
      method: 'get',
      url: '/user/findAgent',
      params: {
        userId: this.userInfo.user_id
      }
    }).then(res => {
      console.log(res)
      this.$store.dispatch('getAgentInfo', res)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  border: 1px solid #bbb;
  border-radius: 10px;

}
.header {
  height: 40px;
  margin: 10px;
  color: #f7a11f;
  border-bottom: 1px solid #ddd;
}
.info {
  margin: 20px;
}
.label {
  width: 25%;
  float: left;
  margin-right: 20px;
  text-align: right;
}
.optionBtn {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.picture img{
  width: 150px
}
</style>
