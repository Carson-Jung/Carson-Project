<template>
  <div>
    <el-row>
      <el-col :xs="{span:22,offset:1}" :sm="{span:20,offset:2}" :md="{span:20,offset:2}" :lg="{span:16,offset:4}">
        <div class="container">
          <div class="header">
            <h3>房东证件信息</h3>
          </div>
          <!-- 证件信息 -->
          <div class="landlordInfo">
            <div class="info clearfix">
              <div class="label">
                <span>身份证号码:</span>
              </div>
              <div>
                <span>{{landlordInfo.id_number}}</span>
              </div>
            </div>
            <div class="info clearfix">
              <div class="label">
                <span>支付宝账号:</span>
              </div>
              <div>
                <span>{{landlordInfo.alipay_account}}</span>
              </div>
            </div>
            <div class="info clearfix">
              <div class="label">
                <span>支付宝姓名:</span>
              </div>
              <div>
                <span>{{landlordInfo.alipay_name}}</span>
              </div>
            </div>
            <div class="info clearfix">
              <div class="label">
                <span>身份证正面:</span>
              </div>
              <div class="picture" v-if="landlordInfo.id_card_picture_f">
                <img :src="`data:image/png;base64, ${landlordInfo.id_card_picture_f}`" alt="身份证正面" >
              </div>
            </div>
            <div class="info clearfix">
              <div class="label">
                <span>身份证反面:</span>
              </div>
              <div class="picture" v-if="landlordInfo.id_card_picture_f">
                <img :src="`data:image/png;base64, ${landlordInfo.id_card_picture_r}`" alt="身份证反面">
              </div>
            </div>
            <div class="info clearfix">
              <div class="label">
                <span>验证状态: </span>
              </div>
              <div>
                <span>{{landlordInfo.status?landlordInfo.status:'待验证'}}</span>
              </div>
            </div>
            <div class="optionBtn">
              <!-- 修改证件信息表单 -->
              <el-dialog title="证件信息" :visible.sync="landlordFormVisible">
                <el-form :model="landlordInfo2">
                  <el-form-item label="身份证号码" :label-width="formLabelWidth">
                    <el-input v-model="landlordInfo2.id_number" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="支付宝账号" :label-width="formLabelWidth">
                    <el-input v-model="landlordInfo2.alipay_account" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="支付宝姓名" :label-width="formLabelWidth">
                    <el-input v-model="landlordInfo2.alipay_name" autocomplete="off"></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="身份证正面" :label-width="formLabelWidth">
                    <el-upload
                      action="#"
                      list-type="picture-card"
                      :auto-upload="false">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                          <img
                            class="el-upload-list__item-thumbnail"
                            :src="file.url" alt=""
                          >
                          <span class="el-upload-list__item-actions">
                            <span
                              class="el-upload-list__item-preview"
                              @click="handlePictureCardPreview(file)"
                            >
                              <i class="el-icon-zoom-in"></i>
                            </span>
                            <span
                              v-if="!disabled"
                              class="el-upload-list__item-delete"
                              @click="handleDownload(file)"
                            >
                              <i class="el-icon-download"></i>
                            </span>
                            <span
                              v-if="!disabled"
                              class="el-upload-list__item-delete"
                              @click="handleRemove(file)"
                            >
                              <i class="el-icon-delete"></i>
                            </span>
                          </span>
                        </div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </el-form-item> -->
                  <el-form-item label="身份证正面" :label-width="formLabelWidth">
                    <el-upload
                      action="https://jsonplaceholder.typicode.com/posts/"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove"
                      :auto-upload="false"
                      :on-progress="handleUpload"
                      :on-success="handleSuccess"
                      :file-list="fileList"
                      ref="handle"
                      >
                      <i slot="default" class="el-icon-plus"></i>
                    </el-upload>
                  </el-form-item>
                  <!-- <el-form-item label="身份证反面" :label-width="formLabelWidth">
                    <el-upload
                      action="https://jsonplaceholder.typicode.com/posts/"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove"
                      :auto-upload="false"
                      :on-progress="handleUpload2"
                      :on-success="handleSuccess"
                      :file-list="fileList"
                      ref="handle"
                      >
                      <i slot="default" class="el-icon-plus"></i>
                    </el-upload>
                  </el-form-item> -->
                  <el-form-item>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </el-form-item>
<!-- <el-form-item label="身份证反面" :label-width="formLabelWidth">
  <el-input v-model="landlordInfo2.id_card_picture_r" autocomplete="off"></el-input>
</el-form-item> -->
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="landlordFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="updateLandlordInfo">确 定</el-button>
                </div>
              </el-dialog>
              <el-button type="warning" @click="landlordFormVisible = true">添加/修改信息</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {deepClone} from '../utils/deepClone'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      landlordFormVisible: false,
      // formLabelWidth: '120px',
      landlordInfo2: {
        file: ''
      },
      fileList: [],
      formLabelWidth: '140px'
    }
  },
  methods: {
    // handleRemove (file) {
    //   console.log(file)
    // },
    // handlePictureCardPreview (file) {
    //   this.dialogImageUrl = file.url
    //   this.dialogVisible = true
    // },
    // handleDownload (file) {
    //   console.log(file)
    // },
    updateLandlordInfo () {
      console.log(this.landlordInfo2)
      let landlordInfo = this.landlordInfo2
      landlordInfo.status = '审批中'
      landlordInfo.user_id = this.userInfo.user_id
      this.$store.dispatch('updateLandlordInfo', landlordInfo)
      this.$refs.handle.submit()
      // this.$axios({
      //   method: 'post',
      //   url: '/user/userUpdateLandlordInfomation',
      //   params: {
      //     landlordInformation: landlordInfo
      //   }
      // }).then(res => {
      //   console.log(res)
      // }).catch(err => {
      //   console.log(err)
      // })
      this.landlordFormVisible = false
    },
    handleUpload (event, file, fileList) {
      let formData = new FormData()
      console.log(this.landlordInfo2.id_number)
      console.log(this.landlordInfo2.alipay_account)
      console.log(this.landlordInfo2.alipay_name)
      console.log(file.raw)
      formData.append('ipf', fileList[0].raw)
      formData.append('ipr', fileList[1].raw)
      formData.append('uid', 10)
      this.$axios({
        url: 'user/userUpdateLandlordInfomation',
        method: 'post',
        data: formData,
        params: {
          landlordInformation1: this.landlordInfo2
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      // this.pageInation()
    },
    // handleUpload2 (event, file, fileList) {
    //   let formData = new FormData()
    //   console.log(this.landlordInfo2.id_number)
    //   console.log(this.landlordInfo2.alipay_account)
    //   console.log(this.landlordInfo2.alipay_name)
    //   console.log(file.raw)
    //   formData.append('ipr', file.raw)
    //   formData.append('uid', 10)
    //   this.$axios({
    //     url: 'user/userUpdateLandlordInfomation',
    //     method: 'post',
    //     data: formData,
    //     params: {
    //       landlordInformation1: this.landlordInfo2
    //     },
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   })
    //   // this.pageInation()
    // },
    handleSuccess (res, file, fileList) {
      this.$notify.success({
        title: '成功',
        message: `图片上传成功`
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
      this.$refs.handle.clearFiles()
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  },
  computed: {
    ...mapState(['landlordInfo', 'userInfo'])
  },
  mounted () {
    this.$axios({
      method: 'post',
      url: '/user/findLandlordInformation',
      params: {
        id: this.userInfo.user_id
      }
    }).then(res => {
      // console.log(res)
      this.$store.dispatch('updateLandlordInfo', res)
      this.landlordInfo2 = deepClone(this.landlordInfo)
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
