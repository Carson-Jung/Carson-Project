<template>
    <div>
        <el-container>
          <el-header class="header" style="height:90px">
              <Header/>
          </el-header>
          <el-main style="overflow: hidden">
            <div>
              <!-- 查询 -->
              <el-row type="flex" justify="center">
                <el-col :md="20" :lg="16">
                  <!-- 关键字搜索 -->
                  <el-row type="flex" justify="center">
                    <el-col :xs="20" :sm="18" :md="12" :lg="12">
                      <div class="findHead clearfix">
                        <img src="../assets/img/logo.png">
                        <el-input placeholder="请输入内容" v-model="searchForm.title" class="input-with-select pull-right">
                          <el-button slot="append" icon="el-icon-search" @click="findHouse"></el-button>
                        </el-input>
                      </div>
                    </el-col>
                  </el-row>
                  <!-- 筛选条件框 -->
                  <div class="findCondition">
                    <!-- 地区 -->
                    <el-row>
                      <el-col :xs="4" :sm="4" :md="4" :lg="4" >
                        <div class="location">
                          <img src="../assets/img/lie.png" alt="">
                        </div>
                      </el-col>
                      <el-col :xs="18" :sm="16" :md="12" :lg="10">
                        <div class="region">
                          <el-cascader
                            :options="regionOptions"
                            v-model="searchForm.region"
                            :props="{value:'label'}"
                            placeholder="请选择城市及地区">
                          </el-cascader>
                        </div>
                      </el-col>
                    </el-row>
                    <!-- 出租类型 -->
                    <el-row class="border">
                      <el-col ::md="24" :lg="22" class="houseType">
                        <el-row class="middle">
                          <el-col :xs="4" :sm="5" :md="5" :lg="4">
                            <div class="titleCondition">
                              <span>出租类型</span>
                            </div>
                          </el-col>
                          <el-col :xs="20" :sm="19" :md="19" :lg="20">
                            <div>
                              <el-radio-group v-model="searchForm.rentType" class="typeBtn" fill="#f7a11f" text-color="#fff">
                                <el-radio-button label="整租"><img src="../assets/img/whole.png">整租</el-radio-button>
                                <el-radio-button label="合租2人"><img src="../assets/img/double.png">合租2人</el-radio-button>
                                <el-radio-button label="合租3人"><img src="../assets/img/double.png">合租3人</el-radio-button>
                                <el-radio-button label="合租4人+"><img src="../assets/img/double.png">合租4+人</el-radio-button>
                              </el-radio-group>
                            </div>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                    <!-- 价格 -->
                    <el-row class="border">
                      <el-col :md="24" :lg="20">
                        <el-row class="middle price">
                          <el-col :xs="4" :sm="4" :md="4" :lg="4">
                            <div class="titleCondition">
                              <span>价格</span>
                            </div>
                          </el-col>
                          <el-col>
                            <div class="priceContent">
                              <el-radio-group v-model="searchForm.price" size="small" fill="#f7a11f" text-color="#fff">
                                <el-radio-button label="不限" ></el-radio-button>
                                <el-radio-button label="1000元以下"></el-radio-button>
                                <el-radio-button label="1000-2000元"></el-radio-button>
                                <el-radio-button label="2000-3000元"></el-radio-button>
                                <el-radio-button label="3000元以上"></el-radio-button>
                              </el-radio-group>
                            </div>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                    <!-- 面积 -->
                    <el-row class="border">
                      <el-col :md="24" :lg="20">
                        <el-row class="middle area">
                          <el-col :xs="4" :sm="4" :md="4" :lg="4">
                            <div class="titleCondition">
                              <span>面积</span>
                            </div>
                          </el-col>
                          <el-col>
                            <div class="areaContent">
                              <el-radio-group v-model="searchForm.area" size="small" fill="#f7a11f" text-color="#fff">
                                <el-radio-button label="不限" ></el-radio-button>
                                <el-radio-button label="30以下">30m<sup>2</sup>以下</el-radio-button>
                                <el-radio-button label="30-50">30-50m<sup>2</sup></el-radio-button>
                                <el-radio-button label="50-70">50-70m<sup>2</sup></el-radio-button>
                                <el-radio-button label="70-90">70-90m<sup>2</sup></el-radio-button>
                                <el-radio-button label="90以上">90m<sup>2</sup>以上</el-radio-button>
                              </el-radio-group>
                            </div>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                    <!-- 电梯 -->
                    <el-row class="border">
                      <el-col :md="24" :lg="20">
                        <el-row class="middle price">
                          <el-col :xs="4" :sm="4" :md="4" :lg="4">
                            <div class="titleCondition">
                              <span>电梯</span>
                            </div>
                          </el-col>
                          <el-col>
                            <div class="priceContent">
                              <el-radio-group v-model="searchForm.elevatorS" size="small" fill="#f7a11f" text-color="#fff">
                                <el-radio-button label="有电梯" ></el-radio-button>
                                <el-radio-button label="无电梯"></el-radio-button>
                              </el-radio-group>
                            </div>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                    <!-- 特色 -->
                    <el-row class="border">
                      <el-col :md="24" :lg="24">
                        <el-row class="middle h-90">
                          <el-col :xs="4" :sm="4" :md="4" :lg="4">
                            <div class="titleCondition">
                              <span>特色</span>
                            </div>
                          </el-col>
                          <el-col>
                            <div class="featureContent">
                             <el-checkbox-group v-model="featureForm">
                                <el-checkbox v-for="feature in featureOptions" :label="feature" :key="feature" >{{feature}}</el-checkbox>
                              </el-checkbox-group>
                            </div>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                    <!-- 筛选条件 -->
                    <!-- <el-row >
                      <el-col :xs="6" :sm="4" :md="4" :lg="4">
                        <div class="condition">筛选条件</div>
                      </el-col>
                      <el-col :xs="18" :sm="20" :md="20" :lg="20">
                        <div v-for="(item,index) in condition" :key="index" class="pull-left">
                          <el-tag v-if="item!== ''">{{item}}</el-tag>
                        </div>
                      </el-col>
                    </el-row> -->
                    <el-row type="flex" justify="center" style="margin: 10px">
                      <el-col :xs="6" :sm="4" :md="4" :lg="4" >
                        <el-button type="primary" round @click="findHouse">查询</el-button>
                      </el-col>
                      <el-col :xs="6" :sm="4" :md="4" :lg="4" :offset="2">
                        <el-button round @click="resetForm()">重置</el-button>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </div>
            <el-divider>已为您找到 {{houseNum}} 套房</el-divider>
            <!-- 查询结果 -->
            <div class="houseDetail">
              <el-row>
                <el-col :xs="24" :sm="24" :md="{span:20,offset:2}" :lg="{span:16,offset:4}">
                  <div @click="toHouseResource(item)" v-for="(item,index) in houseInfos" :key="index" class="mrgb-20">
                    <el-card v-show='index<MAX_SHOW_HOUSE_COUNT*homeCurrentPage'>
                      <!-- 房屋房东信息 -->
                      <div class="detailHeader clearfix">
                        <div class="pull-left ">
                          <img src="../assets/img/houseOwner.png" alt="">
                        </div>
                        <div class="pull-left mrgl-20">
                          <span>{{item.user.name}}</span><br/>
                        </div>
                      </div>
                      <!-- 房屋具体描述 -->
                      <div class="detailContent clearfix">
                        <div class="pull-left detailImg">
                          <img src="http://img5.sofang.com/otherSize/house/rent/2019_10/15/154401_719_GG6T_2.jpg">
                        </div>
                        <div class="pull-right detailDes">
                          <h2>{{item.title}}</h2>
                          <span>{{item.city}} | {{item.acreage}}m<sup>2</sup> | {{item.toward}} | {{item.house_type}} </span>
                          <span>电梯配置：{{item.elevator>0?(item.elevator+'台'):'无电梯'}}</span>
                          <span>入住人数(推荐)：{{item.number_of_people}}</span>
                          <span class="pubTime">发布时间：{{item.landlordHouseRelation.publish_time.substr(0,10)}}</span>
                          <div class="btm-r">
                            <el-button class="isLove"><img src="../assets/img/love.png" alt=""></el-button>
                            <span class="rentPrice">{{item.rent_type}}&nbsp;{{item.rent}}/月</span>
                          </div>
                        </div>
                      </div>
                    </el-card>
                  </div>
                  <div style="margin-top: 20px">
                    <el-divider v-if="isShow"><el-button @click="moreInfo" type="primary">更多</el-button></el-divider>
                    <el-divider v-if="!isShow">我是有底线的</el-divider>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-main>
          <el-footer style="height: 150px">
              <Footer/>
          </el-footer>
      </el-container>
    </div>
</template>
<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import {mapGetters, mapState} from 'vuex'
import { regionData } from 'element-china-area-data'
import {deepClone} from '../utils/deepClone'
export default {
  data () {
    return {
      MAX_SHOW_HOUSE_COUNT: 3,
      homeCurrentPage: 1,
      isShow: true,
      searchForm: {
        title: '',
        region: '',
        rentType: '',
        price: '',
        elevator: '',
        area: ''
      },
      feature: {
        'house_id': '',
        'independent_bathroom': 0,
        'independent_balcony': 0,
        'smart_sock': 0,
        'self_decorating': 0,
        'first_rent': 0,
        'fully_furnished': 0,
        'nearby_subway': 0,
        'any_time_to_see': 0,
        'check_in_at_once': 0
      },
      featureForm: [],
      regionOptions: regionData,
      featureOptions: ['独立浴室', '独立阳台', '可立即入住', '可自行装修', '地铁十分钟', '首次出租', '随时看房', '智能锁']
    }
  },
  mounted () {
    let searchForm = {}
    searchForm = deepClone(this.searchForm)
    searchForm.region = ''
    this.$axios({
      method: 'post',
      url: '/user/findHouses',
      params: {
        houseInfo: searchForm
      }
    }).then(res => {
      this.$store.dispatch('getHouseInfo', res)
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    toHouseResource (item) {
      if (!this.isLogin) {
        alert('请先登录再查看房源具体信息')
      } else {
        this.$router.push({path: '/houseResource', query: {houseId: item.house_id}})
      }
    },
    resetForm () {
      this.searchForm = {
        title: '',
        region: '',
        rentType: '',
        price: '',
        elevatorS: '',
        area: ''
      }
    },
    findHouse () {
      let condition = {}
      condition = deepClone(this.searchForm)
      console.log(condition)
      if (condition.elevatorS === '无电梯') {
        this.searchForm.elevator = 0
      } else {
        this.searchForm.elevator = ''
      }
      // 处理地区数据
      if (condition.region) {
        if (condition.region[0].search('市') !== -1) {
          this.searchForm.province = '直辖市'
          this.searchForm.city = condition.region[0]
          this.searchForm.region = condition.region[2]
        } else if (condition.region[0].indexOf('行政') !== -1) {
          this.searchForm.region = condition.region[1]
          this.searchForm.city = condition.region[0]
          this.searchForm.province = '特别行政区'
        } else {
          this.searchForm.province = condition.region[0]
          this.searchForm.city = condition.region[1]
          this.searchForm.region = condition.region[2]
        }
      } else {
        this.searchForm.region = ''
      }
      let rentType = this.searchForm.rentType
      if (rentType.search('合租') !== -1) {
        let type = rentType.substr(0, 2)
        let people = rentType.substr(2, 1)
        this.searchForm.rent_type = type
        this.searchForm.number_of_people = people
      } else {
        this.searchForm.rent_type = rentType
      }
      this.searchForm.minrent = this.minrent
      this.searchForm.maxrent = this.maxrent
      this.searchForm.minacreage = this.minacreage
      this.searchForm.maxacreage = this.maxacreage
      console.log(this.searchForm)
      this.$axios({
        method: 'post',
        url: '/user/findHouses',
        params: {
          houseInfo: this.searchForm
        }
      }).then(res => {
        // console.log(res)
        this.$store.dispatch('getHouseInfo', res)
      }).catch(err => {
        console.log(err)
      })
    },
    moreInfo () {
      this.homeCurrentPage++
      if (this.MAX_SHOW_HOUSE_COUNT * this.homeCurrentPage > this.houseInfos.length) {
        this.isShow = false
      }
    }
  },
  components: {
    Header,
    Footer
  },
  computed: {
    ...mapGetters(['houseNum']),
    ...mapState(['houseInfos', 'isLogin']),
    maxrent () {
      if (this.searchForm.price === '' || this.searchForm.price.search('以上') !== -1 || this.searchForm.price === '不限') {
        return ''
      } else if (this.searchForm.price.search('以下') !== -1) {
        return this.searchForm.price.substr(0, 4)
      } else {
        return this.searchForm.price.substr(5, 4)
      }
    },
    minrent () {
      if (this.searchForm.price === '' || this.searchForm.price.search('以下') !== -1 || this.searchForm.price === '不限') {
        return ''
      } else {
        return this.searchForm.price.substr(0, 4)
      }
    },
    maxacreage () {
      if (this.searchForm.area === '' || this.searchForm.area.search('以上') !== -1 || this.searchForm.area === '不限') {
        return ''
      } else if (this.searchForm.area.search('以下') !== -1) {
        return this.searchForm.area.substr(0, 2)
      } else {
        return this.searchForm.area.substr(3, 2)
      }
    },
    minacreage () {
      if (this.searchForm.area === '' || this.searchForm.area.search('以下') !== -1 || this.searchForm.area === '不限') {
        return ''
      } else {
        return this.searchForm.area.substr(0, 2)
      }
    }
  }
}
</script>

<style scoped>
.h-90 {
  height: 90px;
}
.mrgl-20 {
  margin-left: 20px;
}
.mrgb-20 {
  margin-bottom: 20px;
}
.border {
  border: 1px solid #ccc;
  margin: 15px 30px;
  border-radius: 5px;
}
.middle {
  display: flex;
  align-items: center;
}

/* 页头 */
.header>>> a:nth-child(2) {
  color: #f7a11f;
}
.header{
    border-bottom: 2px #df8e3e solid;
}
/* 搜索表头 */
.findHead {
  min-width: 540px;
  margin: 20px auto;
}
/* 搜索框 */
.input-with-select{
  margin-right: 20px;
  width: 70%;
}
/* 图标 */
.findHead img {
  width: 45px;
  height: 45px;
}
.findCondition {
  min-width: 640px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
/* 定位 */
.location{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin: 20px 30px;
  text-align: center;
  width: 0;
}
.location img {
  width: 20px;
  height: 20px;
}
.region {
  margin: 20px;
}
/* 搜索条件标题 */
.titleCondition span {
  margin-left: 20px;
  padding: 20px 0;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}
/* 出租类型按钮 */
.typeBtn {
  border: none;
}
.typeBtn img{
  width: 40px;
  height: 40px;
}
/* 价格 */
.price {
  height: 60px;
}
/* 面积 */
.area {
  height: 70px;
}
/* 筛选条件 */
.condition {
  margin-left: 50px;
  height: 60px;
}
/* 房屋列表 */
.houseDetail {
  min-width: 640px;
  margin-top: 20px;
}
.detailHeader{
  margin-bottom: 20px;
}
.detailContent img {
  width: 95%;
}
/* 房屋细节 */
.detailDes,
.detailImg {
  width: 48%;
}
.detailDes span {
  margin-top: 10px;
  display: block;
}
/* 发布时间 */
.pubTime {
  color: #ccd4d7;
}
/* 租金 */
.rentPrice {
  color: #f7a11f;
  font-weight: bold;
  font-size: 28px;
  text-align: right;
  vertical-align: bottom;
}
.btm-r {
  display: flex;
  height: 100%;
  align-items: flex-end;
  justify-content: flex-end;
}
.isLove {
  border: none;
  padding: 0;
  margin: 0;
  margin-right: 10px;
}
.isLove img {
  width: 30px;
  height: 30px;
}
</style>
