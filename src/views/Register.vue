<template>
    <div>
        <el-container>
            <el-header style="height: 90px" class="registHeader">
                <Header/>
            </el-header>
            <el-main style="overflow: hidden" class="registContent">
              <div class="registForm" ref="registForm">
                <el-form :model="user" :rules="rules" ref="user" label-width="90px" class="register">
                  <el-divider class="registFormHeader">欢迎注册</el-divider>
                  <el-form-item label="邮箱" prop="email" size="mini">
                    <el-input v-model="user.email" ></el-input>
                  </el-form-item>
                  <el-form-item label="手机号" prop="phone" size="mini">
                    <el-input v-model="user.phone" ></el-input>
                  </el-form-item>
                  <el-form-item label="姓名" prop="name" size="mini">
                    <el-input v-model="user.name"></el-input>
                  </el-form-item>
                  <el-form-item label="性别" prop="gender" size="mini">
                    <el-radio-group v-model="user.gender">
                      <el-radio label="男" ></el-radio>
                      <el-radio label="女"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="密码" prop="password" size="mini">
                    <el-input type="password" v-model="user.password"></el-input>
                  </el-form-item>
                  <el-form-item label="验证密码" prop="password2" size="mini">
                    <el-input type="password" v-model="user.password2"></el-input>
                  </el-form-item>
                  <el-form-item label="验证码" prop="emailCode" size="mini">
                    <el-input v-model="user.emailCode" class="emailCode"></el-input>
                    <el-button type="success" class="emailCodeBtn" @click="getEmailCode">获取验证码</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="warning" @click="submitForm('user')">注册</el-button>
                    <el-button @click="resetForm('user')">重置</el-button>
                  </el-form-item>
                  <div>
                     <router-link to="login" class="login">已有账号，前往登录</router-link>
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
    // 确认密码校验
    var confirmPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.user.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    // 验证码校验
    var confirmEmailCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else if (value.toLowerCase() !== this.randomCode.toLowerCase()) {
        callback(new Error('验证码错误'))
      } else {
        callback()
      }
    }
    return {
      randomCode: '',
      user: {
        email: '',
        phone: '',
        name: '',
        gender: '',
        password: '',
        password2: '',
        emailCode: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, message: '邮箱格式错误', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/, message: '手机号格式错误', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'change' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        password2: [
          { required: true, trigger: 'change', validator: confirmPwd }
        ],
        emailCode: [
          { required: true, trigger: 'change', validator: confirmEmailCode }
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
            url: '/user/insertUser',
            params: {
              userdto: this.user
            }
          }).then(res => {
            console.log(res)
            if (res === '注册成功') {
              alert(res + ',现跳转到登录页面')
              this.$router.push('login')
            } else {
              this.$message.error(res)
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
    // 动态修改注册框位置
    setFormTop () {
      let formTop = document.body.clientHeight / 19
      this.$refs['registForm'].style.top = formTop + 'px'
    },
    // 获取邮箱验证码
    getEmailCode () {
      // alert('获取验证码')
      this.$axios({
        method: 'get',
        url: '/user/send',
        params: {
          email: this.user.email
        }
      }).then(res => {
        // console.log(res)
        console.log(res)
        this.randomCode = res
      }).catch(err => {
        console.log(err)
      })
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
.registHeader>>> a:nth-child(2) {
  color: #f7a11f;
}
.registContent{
  position: relative;
  width: 100%;
}
/* 注册表单 */
.registForm{
  position: absolute;
  border-radius: 20px;
  border: 1px solid #ccc;
  width: 400px;
  background-color: #fff;
  right: 12%;
  z-index: 10;
}
.register {
  text-align: center;
  margin: 15px auto;
  width: 88%;
}
/* 表单头 */
.line{
  color: #999;
}
.registFormHeader{
  margin-bottom: 25px;
  margin-top: 15px;
  font-size: large;
  font-weight: bold;
  color: #777;
}
/* 验证码 */
.emailCode{
  float: left;
  width: 100px;
}
.emailCodeBtn{
  float: right;
}
/* 登录跳转 */
.login{
    color: #878787;
    float: right;
    margin-right: 5px;
    margin-bottom: 15px;
    font-size: small;
    font-family: "微软雅黑";
    font-weight: lighter;
    text-decoration: none;
}
.login:hover {
  color:#df8e3e;
  text-decoration: underline;
}
</style>
