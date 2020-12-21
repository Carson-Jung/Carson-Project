<template>
  <div>
    <el-row>
      <el-col :xs="{span:22,offset:1}" :sm="{span:20,offset:2}" :md="{span:20,offset:2}" :lg="{span:16,offset:4}">
        <div class="container">
          <div class="header">
            <h3>经纪人证件信息</h3>
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
                <span>{{agentInfo.work_time}}</span>
              </div>
            </div>
            <div class="info clearfix">
              <div class="label">
                <span>证件照:</span>
              </div>
              <div class="picture" v-if="agentInfo.photo_name">
                <img :src="`${agentInfo.photo_name}`" alt="经纪人证件">
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
            <div class="optionBtn">
              <!-- 修改证件信息表单 -->
              <el-dialog title="证件信息" :visible.sync="agentFormVisible">
                <el-form :model="agentInfo2">
                  <el-form-item label="真实姓名" :label-width="formLabelWidth">
                    <el-input v-model="agentInfo2.real_name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="工作时长" :label-width="formLabelWidth">
                    <el-input v-model="agentInfo2.work_time" autocomplete="off"></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="证件照" :label-width="formLabelWidth">
                    <el-input v-model="agentInfo2.photo" autocomplete="off"></el-input>
                  </el-form-item> -->
                   <el-form-item label="证件照" :label-width="formLabelWidth">
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
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="agentFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="updateAgentInfo">确 定</el-button>
                </div>
              </el-dialog>
              <el-button type="warning" @click="agentFormVisible = true">添加/修改信息</el-button>
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
      agentInfo2: {
        file: ''
      },
      fileList: [],
      agentFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleChange (value) {
      console.log(value)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handleSuccess (res, file, fileList) {
      this.$notify.success({
        title: '成功',
        message: `图片上传成功`
      })
    },
    handlePictureCardPreview (file) {
      this.houseForm.pictureUrl = file.url
      this.dialogVisible = true
    },
    handleUpload (event, file, fileList) {
      this.agentInfo2.user_id = this.userInfo.user_id
      this.agentInfo2.status = 1
      let formData = new FormData()
      console.log(this.agentInfo2.real_name)
      console.log(file)
      formData.append('mpf', file.raw)
      formData.append('uid', 10)
      this.$axios({
        url: 'user/insertAgent',
        method: 'post',
        data: formData,
        params: {
          agent1: this.agentInfo2
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        if (res) {
          let name = this.agentInfo2.real_name
          console.log(name)
          this.agentInfo2.photo_name = '../assets/img/' + name.toString() + '.jpg'
        }
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
      this.$store.dispatch('updateAgentInfo', this.agentInfo2)
      this.agentFormVisible = false
      // this.pageInation()
    },
    updateAgentInfo () {
      this.$refs.handle.submit()
      // this.$axios({
      //   method: 'post',
      //   url: '/user/insertAgent',
      //   params: {
      //     agent1: agentInfo
      //   }
      // }).then(res => {
      //   console.log(res)
      //   // this.$store.dispatch('getAgentInfo', res)
      // }).catch(err => {
      //   console.log(err)
      // })
    }
  },
  mounted () {
    this.agentInfo2 = deepClone(this.agentInfo)
  },
  computed: {
    ...mapState(['agentInfo', 'userInfo']),
    status () {
      if (this.agentInfo.status === 0) {
        return '待审批'
      } else if (this.agentInfo.status === 1) {
        return '审批中'
      } else if (this.agentInfo.status === 2) {
        return '已审批'
      } else {
        return '待审批'
      }
    }
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
