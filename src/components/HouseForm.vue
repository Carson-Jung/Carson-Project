<template>
    <div class="container">
        <el-row>
            <el-col :xs="18" :sm="18" :md="16" :lg="16">
                <div class="form">
                    <el-form ref="form" :model="houseForm" label-width="120px">
                        <el-form-item label="房源名称">
                            <el-input v-model="houseForm.title"></el-input>
                        </el-form-item>
                        <el-form-item label="房源地址">
                            <el-cascader
                                :options="options"
                                v-model="houseForm.regionData"
                                :props="{value:'label'}"
                                @change="handleChange"
                                placeholder="请选择城市及地区">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="房源详细位置">
                            <el-input v-model="houseForm.address" placeholder="具体到房门号"></el-input>
                        </el-form-item>
                        <el-form-item label="房源平面图">
                          <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                          </el-upload>
                          <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="houseForm.pictureUrl" alt="">
                          </el-dialog>
                      </el-form-item>
                      <el-form-item label="房源描述">
                            <el-input v-model="houseForm.introduction" ></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <el-col :xs="6" :sm="6" :md="8" :lg="8">
                <div class="rightDec">
                    <img src="../assets/img/HomeRental.jpg" alt="">
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { regionData } from 'element-china-area-data'
export default {
  data () {
    return {
      dialogVisible: false,
      options: regionData,
      houseForm: {
        title: '',
        city: '',
        regionData: '',
        address: '',
        pictureUrl: '',
        introduction: ''
      }
    }
  },
  methods: {
    handleChange (value) {
      console.log(value)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.houseForm.pictureUrl = file.url
      this.dialogVisible = true
    },
    addHouseForm () {
      this.$store.dispatch('addHouseForm', this.houseForm)
    }
  },
  mounted () {
    this.houseForm = this.$store.state.houseForm
  }
}
</script>

<style scoped>
.container {
    display: flex;
    width: 100%;
    margin: 25px 0;
    justify-content: center;
}
.form {
    width: 90%;
}
.rightDec img {
    width: 100%;
    -webkit-box-reflect: below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(250, 250, 250, 0.1)))
}
</style>
