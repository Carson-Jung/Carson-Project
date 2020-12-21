<template>
  <div>
    <el-row>
      <el-col :xs="{span:22,offset:1}" :sm="{span:20,offset:2}" :md="{span:16,offset:4}" :lg="{span:16,offset:4}">
        <div class="container">
          <div class="header">
            <h3>个人信息</h3>
          </div>
          <!-- 基本信息 -->
          <div class="baseInfo">
            <div class="info clearfix">
              <div class="label">
                <span>姓名:</span>
              </div>
              <div>
                <span>{{userInfo.name}}</span>
              </div>
            </div>
            <div class="info clearfix">
              <div class="label">
                <span>性别:</span>
              </div>
              <div>
                <span>{{userInfo.gender}}</span>
              </div>
            </div>
            <div class="info clearfix">
              <div class="label">
                <span>邮箱:</span>
              </div>
              <div>
                <span>{{userInfo.email}}</span>
              </div>
            </div>
            <div class="info clearfix">
              <div class="label">
                <span>手机号:</span>
              </div>
              <div>
                <span>{{userInfo.phone}}</span>
              </div>
            </div>
          </div>
          <div class="optionBtn">
            <!-- 修改基本信息表单 -->
            <el-dialog title="基本信息" :visible.sync="baseFormVisible">
              <el-form :model="baseInfo">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                  <el-input v-model="baseInfo.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                  <el-select v-model="baseInfo.gender" placeholder="请选择性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </el-form-item>
                <!-- <el-form-item label="密码" :label-width="formLabelWidth">
                  <el-input v-model="baseInfo.password" autocomplete="off" type="password"></el-input>
                </el-form-item> -->
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                  <el-input v-model="baseInfo.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                  <el-input v-model="baseInfo.phone" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="baseFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateBaseInfo">确 定</el-button>
              </div>
            </el-dialog>
            <el-button type="warning" @click="baseFormVisible = true">修改信息</el-button>
          </div>
          <el-collapse>
            <el-collapse-item  name="showExtra">
              <span class="collapse-title" slot="title">查看更多</span>
              <!-- 附加信息 -->
              <div class="extraInfo">
                <div class="info clearfix">
                  <div class="label">
                    <span>昵称:</span>
                  </div>
                  <div>
                    <span>{{userInfo.userPersonalInfo.nick_name?userInfo.userPersonalInfo.nick_name:''}}</span>
                  </div>
                </div>
                <div class="info clearfix">
                  <div class="label">
                    <span>年龄:</span>
                  </div>
                  <div>
                    <span>{{userInfo.userPersonalInfo.age?userInfo.userPersonalInfo.age:''}}</span>
                  </div>
                </div>
                <div class="info clearfix">
                  <div class="label">
                    <span>职业:</span>
                  </div>
                  <div>
                    <span>{{userInfo.userPersonalInfo.job?userInfo.userPersonalInfo.job:''}}</span>
                  </div>
                </div>
                <div class="info clearfix">
                  <div class="label">
                    <span>兴趣:</span>
                  </div>
                  <div>
                    <span>{{userInfo.userPersonalInfo.hobby?userInfo.userPersonalInfo.hobby:''}}</span>
                  </div>
                </div>
                <div class="optionBtn">
                  <!-- 修改个人信息表单 -->
                  <el-dialog title="个人信息" :visible.sync="extraFormVisible">
                    <el-form :model="extraInfo">
                      <el-form-item label="昵称" :label-width="formLabelWidth">
                        <el-input v-model="extraInfo.nick_name" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="年龄" :label-width="formLabelWidth">
                        <el-input v-model="extraInfo.age" autocomplete="off" type="number"></el-input>
                      </el-form-item>
                      <el-form-item label="职业" :label-width="formLabelWidth">
                        <el-input v-model="extraInfo.job" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="兴趣" :label-width="formLabelWidth">
                        <el-input v-model="extraInfo.hobby" autocomplete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="extraFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="updateExtraInfo">确 定</el-button>
                    </div>
                  </el-dialog>
                  <el-button type="warning" @click="extraFormVisible = true">修改信息</el-button>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {deepClone} from '../utils/deepClone'
export default {
  data () {
    return {
      baseFormVisible: false,
      extraFormVisible: false,
      formLabelWidth: '120px',
      userInfo: {
        userPersonalInfo: {
          nick_name: '',
          age: '',
          job: '',
          hobby: ''
        }
      },
      baseInfo: {},
      extraInfo: {}
    }
  },
  methods: {
    updateBaseInfo () {
      // console.log(this.baseInfo)
      const baseInfo = this.baseInfo
      this.$axios({
        method: 'post',
        url: '/user/updateUser',
        params: {
          userdto: baseInfo
        }
      }).then(res => {
        if (res === '更新成功') {
          this.$message({
            message: '更新成功',
            type: 'success'
          })
          this.$store.dispatch('updateBaseInfo', baseInfo)
          this.userInfo = this.$store.state.userInfo
        } else {
          this.$message.error('更新失败')
        }
        this.baseFormVisible = false
      }).catch(err => {
        console.log(err)
      })
    },
    updateExtraInfo () {
      let extraInfo = this.extraInfo
      extraInfo.user_id = this.$store.state.userInfo.user_id
      console.log(extraInfo)
      this.$axios({
        method: 'post',
        url: '/user/updateUserPersonalInfo',
        params: {
          info: extraInfo
        }
      }).then(res => {
        if (res === '更新成功') {
          this.$message({
            message: '更新成功',
            type: 'success'
          })
          this.$store.dispatch('updateExtraInfo', extraInfo)
          this.userInfo = this.$store.state.userInfo
        } else {
          this.$message.error('更新失败')
        }
        this.extraFormVisible = false
      }).catch(err => {
        console.log(err)
      })
    }
  },
  beforeCreate () {
    this.userInfo = this.$store.state.userInfo
    this.$axios({
      method: 'get',
      url: '/user/findUserPersonalInfo',
      params: {
        id: this.userInfo.user_id
      }
    }).then(res => {
      // console.log(res.userPersonalInfo)
      let userPersonalInfo = {
        nick_name: '',
        age: '',
        job: '',
        hobby: ''
      }
      if (res.userPersonalInfo) {
        userPersonalInfo = res.userPersonalInfo
        this.extraInfo = res.userPersonalInfo
      }
      this.$store.dispatch('getPersonalInfo', userPersonalInfo)
      this.userInfo = this.$store.state.userInfo
      this.baseInfo = deepClone(this.userInfo)
      this.extraInfo = deepClone(this.userInfo.userPersonalInfo)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  margin-bottom: 10px;
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
  width: 20%;
  float: left;
  margin-right: 20px;
  text-align: right;
}
.optionBtn {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.collapse-title {
  width: 100%;
  text-align: center;
}
</style>
