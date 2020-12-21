<template>
    <div class="container">
        <el-container>
            <el-header class="header" style="height: 90px">
                <Header/>
            </el-header>
            <el-main>
                <el-row>
                    <el-col :md="{span:20,offset:2}" :lg="{span:18,offset:3}">
                        <div>
                            <div class="headTitle">
                                <h2>发布租房消息</h2>
                            </div>
                            <div class="addContainer">
                                <el-steps :active="active" finish-status="success">
                                    <el-step title="房源描述、布局与图片" ></el-step>
                                    <el-step title="基础信息" ></el-step>
                                    <el-step title="房源配置" ></el-step>
                                </el-steps>
                                <div class="houseForm">
                                    <HouseForm v-show="active == 0" ref="houseFormEdit"/>
                                    <BaseForm v-show="active == 1" ref="baseFormEdit"/>
                                    <AllocationForm v-show="active == 2" ref="allocationFormEdit"/>
                                </div>
                            </div>
                            <div class="optionsBtn">
                                <el-button  @click="prev" v-if="active>0">返回</el-button>
                                <el-button  @click="next" type="primary" v-if="active<2">下一步</el-button>
                                <el-button  @click="next" type="primary" v-if="active==2" >提交</el-button>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import Header from '../components/Header'
import HouseForm from '../components/HouseForm'
import BaseForm from '../components/BaseForm'
import AllocationForm from '../components/AllocationForm'
export default {
  data () {
    return {
      active: 0,
      house: {},
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
      allocation: {
        'house_id': '',
        'tv': 0,
        'refrigerator': 0,
        'washing_machine': 0,
        'air_condition': 0,
        'wifi': 0,
        'beds': 0,
        'water_heater': 0,
        'chest': 0,
        'desk': 0,
        'cooking': 0
      }
    }
  },
  components: {
    Header,
    HouseForm,
    BaseForm,
    AllocationForm
  },
  methods: {
    next () {
      if (this.active === 0) {
        this.$refs['houseFormEdit'].addHouseForm()
        this.active++
      } else if (this.active === 1) {
        this.$refs['baseFormEdit'].addHouseBaseForm()
        this.active++
      } else if (this.active === 2) {
        this.$refs['allocationFormEdit'].addHouseAllocationForm()
        let house = {...this.houseForm, ...this.baseForm}
        // 处理地区数据
        if (house.regionData[0].search('市') !== -1) {
          house.province = '直辖市'
          house.city = house.regionData[0]
          house.region = house.regionData[2]
        } else if (house.regionData[0].search('行政') !== -1) {
          house.region = house.regionData[1]
          house.city = house.regionData[0]
          house.province = '特别行政区'
        } else {
          house.province = house.regionData[0]
          house.city = house.regionData[1]
          house.region = house.regionData[2]
        }
        console.log(house)
        this.house = house
        let id = this.$store.state.userInfo.user_id
        for (const key in this.featureForm) {
          this.feature[this.featureForm[key]] = 1
        }
        for (const key in this.allocationForm) {
          this.allocation[this.allocationForm[key]] = 1
        }
        house.regionData = ''
        this.$axios({
          method: 'post',
          url: '/user/insertHouse',
          params: {
            housedto: house,
            id: id,
            features: this.feature,
            allocations: this.allocation
          }
        }).then(res => {
          if (res === '发布成功') {
            this.$message({
              message: res,
              type: 'success'
            })
            if (this.active++ >= 2) {
              this.active = 0
            }
          } else {
            this.$message({
              message: res,
              type: 'error'
            })
            if (this.active++ >= 2) {
              this.active = 0
            }
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.active = 0
      }
    },
    prev () {
      this.active--
    }
  },
  computed: {
    ...mapState(['houseForm', 'baseForm', 'allocationForm', 'featureForm'])
  }
}
</script>

<style scoped>
.container {
    min-width: 640px;
}
.header>>> a:nth-child(4) {
  color: #f7a11f;
}
.header{
    border-bottom: 2px #df8e3e solid;
}
.headTitle {
    color: gray;
    margin: 20px 0;
}
.addContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.houseForm {
    width: 100%;
}
.optionsBtn {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 40px 0;
}
.optionsBtn>* {
    margin: 0 15px;
}
</style>
