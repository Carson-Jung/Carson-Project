<template>
    <div class="container">
        <div class="title">勾选房源现有家具(可多选)</div>
        <el-checkbox-group v-model="allocationForm" size="medium">
            <el-checkbox-button v-for="allocation in allocations" :label="allocation.value" :key="allocation.label">{{allocation.label}}</el-checkbox-button>
        </el-checkbox-group>
        <div class="title">勾选房源特点(可多选)</div>
        <el-checkbox-group v-model="featureForm" size="medium">
            <el-checkbox-button v-for="feature in features" :label="feature.value" :key="feature.label">{{feature.label}}</el-checkbox-button>
        </el-checkbox-group>
    </div>
</template>
<script>
const allocationOptions = [
  {
    label: '电视',
    value: 'tv'
  }, {
    label: '冰箱',
    value: 'refrigerator'
  }, {
    label: '洗衣机',
    value: 'washing_machine'
  }, {
    label: '空调',
    value: 'air_condition'
  }, {
    label: 'WI-FI',
    value: 'wifi'
  }, {
    label: '床',
    value: 'beds'
  }, {
    label: '热水器',
    value: 'water_heater'
  }, {
    label: '衣柜',
    value: 'chest'
  }, {
    label: '书桌',
    value: 'desk'
  }, {
    label: '烹饪',
    value: 'cooking'
  }
]
const featureOptions = [
  {
    label: '独立卫浴',
    value: 'independent_bathroom'
  }, {
    label: '独立阳台',
    value: 'independent_balcony'
  }, {
    label: '智能锁',
    value: 'smart_sock'
  }, {
    label: '可自行装修',
    value: 'self_decorating'
  }, {
    label: '首次出租',
    value: 'first_rent'
  }, {
    label: '拎包入住',
    value: 'fully_furnished'
  }, {
    label: '随时看房',
    value: 'any_time_to_see'
  }, {
    label: '随时入住',
    value: 'check_in_at_once'
  }
]

export default {
  data () {
    return {
      allocationForm: [],
      allocations: allocationOptions,
      featureForm: [],
      features: featureOptions
    }
  },
  methods: {
    addHouseAllocationForm () {
      this.$store.dispatch('addHouseAllocationForm', {
        allocationForm: this.allocationForm,
        featureForm: this.featureForm
      })
    }
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
.title {
    height: 40px;
    margin: 15px;
    line-height: 40px;
    color: #f7a11f;
}
</style>
