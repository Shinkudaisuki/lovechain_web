<template>
  <div>
    <h1>注册</h1>
    <el-col :span="8" :offset="8">
      <el-card>
        <el-form :model="registerForm" :rules="registerRules" label-width="auto">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="registerForm.username"></el-input>
          </el-form-item>
          <el-form-item label="身份" prop="usertype">
            <el-select v-model="registerForm.usertype" placeholder="请选择注册身份" @blur="getVerify" :fit-input-width="true">
              <el-option label="用户" value="user"></el-option>
              <el-option label="商家" value="merchant"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="registerForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="再次输入密码" prop="confirmPassword" required>
            <el-input v-model="registerForm.confirmPassword" show-password></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phoneNumber">
            <el-input v-model="registerForm.phoneNumber"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="phoneVerification">
            <el-space>
              <el-input v-model="registerForm.phoneVerification"></el-input>
              <el-button plain @click="send_sms" :disabled="!isPhoneNumberValid || countDown">{{ countDown ? `${countDownSeconds}s后重新发送` : '获取验证码'}}</el-button>
            </el-space>
          </el-form-item>
          <el-row justify="center">
            <el-button type="primary" @click="_register">注册</el-button>
            <el-button @click="$router.back()">返回</el-button>
          </el-row>
        </el-form>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterView',
  data() {
    return {
        verified: false,
        token: '',
        verify: '',
        is_verify: 0,
        registerResp: undefined,
        smsResult: null,
        timerId: null,
        countDown: false,
        countDownSeconds: 0,
        selected: '',
        registerForm: {
          username: '',
          usertype: '',
          password: '',
          confirmPassword: '',
          phoneNumber: '',
          phoneVerification: ''
        },
        registerRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          usertype: [
            { required: true, message: '请选择用户类型', trigger: 'change'},
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur'},
          ],
          confirmPassword: [
            { validator: (rule, value, callback) => {
              if (value == '') {
                callback(new Error('请再次输入密码'))
              }
              else if (value != this.registerForm.password) {
                callback(new Error('输入的密码不一致'))
              }
              else {
                callback()
              }
            }, trigger: 'blur'}
          ],
          phoneNumber: [
            { required: true, message: '请输入手机号码', trigger: 'blur'},
            { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'change'},
          ],
          phoneVerification: [
            { required: true, message: '请输入验证码', trigger: 'blur'},
          ]
        }
    }
  },
  computed: {
    isPhoneNumberValid: function () {
      return /^1[3456789]\d{9}$/.test(this.registerForm.phoneNumber)
    }
  },
  mounted() {
  },
  methods: {
    async _register() {
      let registerData = new FormData();
      let md5Password = this.$md5(this.registerForm.password);
      registerData.append('username', this.registerForm.username);
      registerData.append('password', md5Password);
      registerData.append('verify', this.verify);
      registerData.append('phone', this.registerForm.phoneNumber);
      registerData.append('verify_code', this.registerForm.phoneVerification);
      await axios.post(`/${this.registerForm.usertype}/register`, registerData)
      .then(resp => {this.is_verify = resp.data.is_verify;
        this.registerResp = resp})
      .catch(error => (alert("Register Post Error")))

      // console.log(this.is_verify)
      if (this.is_verify) {
        //console.log("login")
        //this.login()
        this.$router.push({name: 'login'})
      }
      else if (this.registerResp) {
        alert('错误码(' + this.registerResp.data.error_code + '):' + this.registerResp.data.error_msg)
      }
    },
    async send_sms() {
      const TIME_COUNT = 60
      if (!this.timerId) {
        axios.post(`/${this.registerForm.usertype}/register/sms`, {phone_num: this.registerForm.phoneNumber})
        .then(resp => {
          this.smsResult = resp.data.result
          if (this.smsResult == 2000) {
            this.$alert('手机号码已被注册')
          }
        })
        .catch(eror => {alert("send_sms Post Error")})
        this.countDownSeconds = TIME_COUNT
        this.countDown = true
        this.timerId = setInterval(() => {
          if (this.countDownSeconds > 0 && this.countDownSeconds <= TIME_COUNT) {
            this.countDownSeconds--;
          }
          else {
            this.countDown = false
            clearInterval(this.timerId)
            this.timerId = null
          }
        }, 1000)
      }
    },
    getVerify() {
      if (this.registerForm.usertype != "") {
        axios.post(`/${this.registerForm.usertype}/register/verify`)
        .then(resp => {this.verify = resp.data.verify;})
        .catch(error => (alert("getVerify Post Error")))
      }

    }
  },
}

</script>
<style scoped>
/* 设置页面背景 */
body {
  background-color: #f2f2f2;
  font-family: Arial, sans-serif;
}

/* 设置标题样式 */
h1 {
  text-align: center;
  color: #333;
  margin-top: 20px;
}

</style>
