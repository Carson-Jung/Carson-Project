<template>
    <el-container>
        <el-header class="header" style="height: 90px">
            <Header/>
        </el-header>
        <el-main>
            <el-row>
                <el-col :xs="24" :sm="24" :md="{span:20,offset:2}" :lg="{span:20,offset:2}">
                    <div class="houseResBase clearfix middle">
                        <div class="layout ">
                            <img src="../assets/img/layout.png" alt="房源布局">
                        </div>
                        <div class="baseMsg">
                            <div class="houseLocation clearfix">
                                <h2>{{houseInfo.title?houseInfo.title:''}}</h2>
                                <el-rate
                                    v-model="rate"
                                    disabled
                                    show-score
                                    text-color="#ff9900"
                                    score-template="{value}">
                                </el-rate>
                                共7条评价
                            </div>
                            <div class="resInfo">
                                <div class="title">户型</div>
                                <div>{{houseInfo.house_type}}</div>
                            </div>
                            <div class="resInfo">
                                <div class="title">面积</div>
                                <div>{{houseInfo.acreage}}m<sup>2</sup></div>
                            </div>
                            <div class="resInfo">
                                <div class="title">朝向</div>
                                <div>{{houseInfo.toward}}</div>
                            </div>
                            <div class="resInfo">
                                <div class="title">地址</div>
                                <div>{{houseInfo.city}}{{houseInfo.region}}{{houseInfo.address}}</div>
                            </div>
                            <div class="resInfo">
                                <div class="title">价格</div>
                                <div style="color: #df1717">{{houseInfo.rent}}/月</div>
                            </div>
                            <div class="resInfo">
                                <div class="title">付费方式</div>
                                <div>{{houseInfo.rent_way}}</div>
                            </div>
                            <div class="ownerIntroduction">
                                <div class="mrgb-20"><h2>房东有话说</h2></div>
                                <div class="owner mrgb-20">
                                    <span>房东昵称：{{houseInfo.user.name}}</span><br/>
                                    <span>联系方式：{{houseInfo.user.phone}}</span><br/>
                                    <span>房东认证：<img src="../assets/img/authen.png" class="authen" /> 已认证</span>
                                </div>
                                <div class="introduction mrgb-20">
                                    <p>房东介绍：{{houseInfo.introduction}}</p>
                                    <!-- <p>房源两室两居南北通透的两居室，主卧朝南，可以沐浴在阳光享受美好的生活,大大的落地窗，采光绝对没得说，楼上直接看到春晚</p> -->
                                </div>
                                <div >
                                    <el-dialog title="约看信息" :visible.sync="lookingFormVisible">
                                        <el-form :model="lookingInfo">
                                            <el-form-item label="地点" :label-width="formLabelWidth">
                                                <el-input v-model="lookingInfo.site" autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item label="日期" :label-width="formLabelWidth">
                                                <el-date-picker
                                                    v-model="lookingInfo.date"
                                                    type="date"
                                                    value-format="yyyy-MM-dd"
                                                    placeholder="选择日期">
                                                </el-date-picker>
                                            </el-form-item>
                                        </el-form>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button @click="lookingFormVisible = false">取 消</el-button>
                                            <el-button type="primary" @click="updateLookingInfo">确 定</el-button>
                                        </div>
                                    </el-dialog>
                                    <el-button type="warning" @click="lookingFormVisible = true">我要约看</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="border">
                        <Allocation/>
                    </div>
                    <div class="border">
                        <HouseComment/>
                    </div>
                </el-col>
            </el-row>
        </el-main>
        <el-footer>
            <Footer/>
        </el-footer>
    </el-container>
</template>
<script>
import {mapState} from 'vuex'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Allocation from '../components/Allocation'
import HouseComment from '../components/HouseComment'
export default {
  data () {
    return {
      formLabelWidth: '120px',
      lookingFormVisible: false,
      lookingInfo: {},
      houseId: '',
      houseInfo: {
        user: {
          name: '',
          phone: ''
        }
      },
      rate: 4.7
    }
  },
  methods: {
    updateLookingInfo () {
      let lookingInfo = this.lookingInfo
      console.log(lookingInfo)
      this.$axios({
        method: 'post',
        url: '/user/insertLooking',
        params: {
          looking: lookingInfo,
          userId: this.userInfo.user_id,
          houseId: this.houseId
        }
      }).then(res => {
        if (res) {
          this.$message.success('约看成功，请等待经纪人接单')
        } else {
          this.$message.error('约看失败，请重新预约')
        }
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
      this.lookingFormVisible = false
    }
  },
  components: {
    Header,
    Footer,
    Allocation,
    HouseComment
  },
  mounted () {
    this.houseId = this.$route.query.houseId
    const houseInfos = this.$store.state.houseInfos
    // 根据id获取房屋信息
    for (let item of houseInfos) {
      if (Number(item.house_id) === Number(this.houseId)) {
        this.houseInfo = item
        // console.log(this.houseInfo)
        return this.houseInfo
      }
    }
  },
  computed: {
    ...mapState(['houseInfos', 'userInfo'])
    // houseInfo () {
    //   for (let item of this.houseInfos) {
    //     if (Number(item.house_id) === Number(this.houseId)) {
    //       return item
    //     }
    //   }
    // }
  }
}
</script>

<style scoped>
.border {
    border-top: 1px #aaa solid;
}
.mrgb-20{
    margin-bottom: 20px;
}
.header>>> a:nth-child(2) {
  color: #f7a11f;
}
.header{
    border-bottom: 2px #df8e3e solid;
}
.houseResBase {
    min-width: 660px;
}
.layout{
    margin-right: 20px;
    width: 50%;
}
.baseMsg {
    margin-left: 20px;
    width: 50%;
}
.layout img {
    width: 100%;
}
.middle {
    display: flex;
    justify-content: center;
}
.houseLocation {
    margin: 20px 5px;
}
/* 具体信息 */
.resInfo {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
    font-size: 18px;
    line-height: 18px;
}
.resInfo .title {
    font-size: 20px;
    min-width: 60px;
    margin-right: 20px;
    color: #555;
}

.ownerIntroduction {
    display: flex;
    flex-direction: column;
}
.authen {
    width: 20px;
    height: 20px;
}

.owner span{
    font-size: 18px;
    line-height: 25px;
}
</style>
