<template>
    <div>
        <el-container>
            <el-header style="height: 90px" class="loginHeader">
                <Header/>
            </el-header>
            <el-main style="overflow: hidden" class="loginContent">
              <div class="loginForm" ref="loginForm">
                <el-form :model="user" :rules="rules" ref="user" label-width="70px" class="demo-ruleForm">
                  <div class="loginFormHeader">
                    <hr class="line">
                    <h3>密码登录</h3>
                  </div>
                  <el-form-item label="邮箱" prop="email" v-if="isEmailLogin">
                    <el-input v-model="user.email" class="accountInput"></el-input>
                    <el-button type="success" class="pull-right" @click="changeWay">手机号登录</el-button>
                  </el-form-item>
                  <el-form-item label="手机号" prop="phone" v-if="!isEmailLogin">
                    <el-input v-model="user.phone" class="accountInput"></el-input>
                    <el-button type="success" class="pull-right" @click="changeWay">邮箱登录</el-button>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="user.password"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="warning" @click="submitForm('user')">登录</el-button>
                    <el-button @click="resetForm('user')">重置</el-button>
                  </el-form-item>
                  <div>
                     <router-link to="register" class="regist">快速注册账号</router-link>
                  </div>
                </el-form>
              </div>
              <LoginBg/>
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
import LoginBg from '../components/LoginBg'
export default {
  data () {
    return {
      isEmailLogin: true,
      user: {
        email: '',
        phone: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, message: '邮箱格式错误', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/, message: '手机号格式错误', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/user/login',
            params: {
              userdto: this.user
            }
          }).then(res => {
            if (res.tips === '登录成功') {
              alert(res.tips)
              this.$store.dispatch('login', res.user)
              this.$router.push('findHouse')
            } else {
              alert(res.tips)
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 动态修改登录框位置
    setFormTop () {
      let formTop = document.body.clientHeight / 6.5
      this.$refs['loginForm'].style.top = formTop + 'px'
    },
    changeWay () {
      this.isEmailLogin = !this.isEmailLogin
    }
  },
  mounted () {
    this.setFormTop()
    window.addEventListener('resize', () => {
      this.setFormTop()
    }, false)
  },
  components: {
    Header,
    Footer,
    LoginBg
  }
}
</script>

<style scoped>
.loginHeader>>> a:nth-child(2) {
  color: #f7a11f;
}
.loginContent{
  position: relative;
  width: 100%;
}
.loginForm{
  position: absolute;
  border-radius: 20px;
  border: 1px solid #ccc;
  width: 400px;
  background-color: #fff;
  right: 12%;
  z-index: 10;
}
.demo-ruleForm {
  text-align: center;
  margin: 15px auto;
  width: 88%;
}
/* 表单头 */
.line{
  color: #999;
}
.loginFormHeader h3{
  text-align: left;
  margin-bottom: 25px;
  margin-top: 15px;
  font-size: large;
  font-weight: 500;
  color: #777;
}
.accountInput {
  float: left;
  width: 150px;
}
/* 注册跳转 */
.regist{
    color: #878787;
    float: right;
    margin-right: 5px;
    margin-bottom: 15px;
    font-size: small;
    font-family: "微软雅黑";
    font-weight: lighter;
    text-decoration: none;
}
.regist:hover {
  color:#df8e3e;
  text-decoration: underline;
}
</style>
