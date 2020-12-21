<template>
  <div class="container">
    <div class="rent_type" >
      <div class="rentTypeBtn" :class="isShare? '': 'active'" @click="handleRentType('整租')">
        <div class="icon">
          <img src="../assets/img/home.png" alt="">
          整租
        </div>
        <div class="desc">
          <p>房客独享整个房源，<br/>无需您和他人共住</p>
        </div>
      </div>
      <div class="rentTypeBtn" :class="isShare? 'active': ''" @click="handleRentType('合租')">
        <div class="icon">
          <img src="../assets/img/share.png" alt="">
          合租
        </div>
        <div class="desc">
          <p>房客住在与他人共用<br/>的卧室或公共区域。</p>
        </div>
      </div>
    </div>
    <el-form :model="baseForm" label-width="90px">
      <div class="wrapper">
        <el-form-item label="房源面积" >
          <el-input v-model="baseForm.acreage" type="number"></el-input>
          &nbsp;&nbsp;m <sup>2</sup>
        </el-form-item>
        <el-form-item label="房源楼层" >
          <el-input v-model="baseForm.floor" type="number"></el-input>
          &nbsp;&nbsp;楼
        </el-form-item>
        <el-form-item label="车位数量" >
          <el-input v-model="baseForm.carport" type="number"></el-input>
          &nbsp;&nbsp;个
        </el-form-item>
        <el-form-item label="房源朝向" >
          <el-select v-model="baseForm.toward" placeholder="请选择">
            <el-option
              v-for="item in towardOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          &nbsp;&nbsp;向
        </el-form-item>
        <el-form-item label="容纳房客" >
          <el-select v-model="baseForm.number_of_people" placeholder="请选择">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
          </el-select>
          &nbsp;&nbsp;位
        </el-form-item>
        <el-form-item label="电梯个数" >
          <el-input v-model="baseForm.elevator" type="number"></el-input>
          &nbsp;&nbsp;个
        </el-form-item>
        <el-form-item label="房源户型" >
          <el-input v-model="baseForm.bedroom" type="number" style="width: 56px"></el-input>
          &nbsp;室
          <el-input v-model="baseForm.livingroom" type="number" style="width: 56px"></el-input>
          &nbsp;厅
          <el-input v-model="baseForm.washingroom" type="number" style="width: 56px"></el-input>
          &nbsp;卫
        </el-form-item>
        <el-form-item label="用电" >
          <el-input v-model="baseForm.energy_charge" onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')"  placeholder='只能输入数字及两位小数'></el-input>
          &nbsp;&nbsp;元/度
        </el-form-item>
        <el-form-item label="用水" >
          <el-input v-model="baseForm.water_charge" onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" placeholder='只能输入数字及两位小数'></el-input>
          &nbsp;&nbsp;元/吨
        </el-form-item>
        <el-form-item label="房源租金" >
          <el-input v-model="baseForm.rent" type="number"></el-input>
          &nbsp;&nbsp;元
        </el-form-item>
        <el-form-item label="付费方式" >
          <el-select v-model="baseForm.rent_way" placeholder="请选择">
            <el-option label="押一付三" value="押一付三"></el-option>
            <el-option label="押一付二" value="押一付二"></el-option>
            <el-option label="无需押金" value="无需押金"></el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isShare: false,
      towardOptions: [
        {
          value: '东',
          label: '东'
        },
        {
          value: '南',
          label: '南'
        },
        {
          value: '西',
          label: '西'
        },
        {
          value: '北',
          label: '北'
        }
      ],
      baseForm: {
        bedroom: '',
        livingroom: '',
        washingroom: '',
        rent_type: '',
        acreage: '',
        floor: '',
        carport: '',
        toward: '',
        elevator: '',
        number_of_people: '',
        rent: '',
        energy_charge: '',
        water_charge: '',
        rent_way: '',
        house_type: ''
      }
    }
  },
  methods: {
    handleRentType (type) {
      this.isShare = !this.isShare
      this.baseForm.rent_type = type
    },
    addHouseBaseForm () {
      this.baseForm.house_type = this.house_type
      this.$store.dispatch('addHouseBaseForm', this.baseForm)
    }
  },
  computed: {
    house_type () {
      return this.baseForm.bedroom + '室' + this.baseForm.livingroom + '厅' + this.baseForm.washingroom + '卫'
    }
  },
  mounted () {
    this.baseForm = this.$store.state.baseForm
    this.baseForm.rent_type = '整租'
  }
}
</script>

<style scoped>
.container {
    display: flex;
    width: 100%;
    margin: 25px 0;
    justify-content: center;
    flex-direction: column;
}
.rent_type {
  display: flex;
  justify-content: flex-start;
  width: 90%;
  margin: 20px 0;
}
.active {
  background-color: #f7a11f !important;
}
.rentTypeBtn {
  background-color: #f0f0f0;
  border-radius: 10px;
  color: #504c49;
  margin-right: 50px;
  padding: 14px;
  padding-top: 24px;
  padding-bottom: 24px;
  cursor: pointer;
  max-width: 180px;
}
.rentTypeBtn>div{
  margin-top: 5px;
  font-size: 17px;
  line-height: 40px;
  letter-spacing: 2px;
}
.rentTypeBtn img {
  width: 40px;
  vertical-align: sub;
}

.wrapper{
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 70px 70px 70px 70px;
}
.el-input, .el-select {
  width: 75%;
}
</style>
