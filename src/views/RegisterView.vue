<template>
  <div>
    <h1>注册</h1>
    <form @submit.prevent="_register">
      <label for="username">用户名：</label>
      <input id="username" type="text" v-model="username" placeholder="请输入用户名" required>
      <br/>
      <select v-model="selected" name="userType" required @change="">
        <option value="">请选择您的身份</option>
        <option value="user">用户</option>
        <option value="admin">管理员</option>
        <option value="merchant">商家</option>
      </select>
      <br/>
      <label for="password">密码：</label>
      <input id="password" type="password" v-model="password" placeholder="请输入密码" required>
      <br/>
      <label for="password">确认密码：</label>
      <input id="password" type="password" v-model="confirmPassword" placeholder="请再次输入密码" required> 
      <br/>
      <label for="phonenumber">手机号码：</label>
      <input id="phonenumber" type="text" v-model="phoneNumber" placeholder="请输入手机号码" required>
      <button v-show="!countDown" @click="send_sms" :disabled="!isPhoneNumberValid">发送验证码</button>
      <button v-show="countDown" disabled="true">{{ countDownSeconds }}s后重新发送</button>
      <br/>
      <span v-show="!isPhoneNumberValid">手机号码格式不正确</span>
      <span v-show="isPhoneNumberUsed">手机号码已被注册</span>
      <br/>
      <label for="phoneVerification">验证码：</label>
      <input id="phoneVerification" type="text" v-model="phoneVerification" placeholder="请输入验证码" required>
      <br/>
      <!-- <button type="submit">注册</button> -->
      <input type="submit" value="注册"/>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import axios from 'axios';

export default {
  name: 'RegisterView',
  data() {
    return {
        username: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        phoneVerification: '',
        verified: false,
        token: '',
        verify: '',
        is_verify: 0,
        registerResp: undefined,
        smsResult: null,
        timerId: null,
        countDown: false,
        countDownSeconds: 0,
        selected:''
    }
  },
  computed: {
    isPhoneNumberValid: function () {
      return /^1[3456789]\d{9}$/.test(this.phoneNumber)
    },
    isPhoneNumberUsed: function () {
      return (this.smsResult == 2000)? true : false
    },
  },
  mounted() {
  },
  methods: {
    ...mapMutations(['login']),
    async _register() {  
      if (this.password != this.confirmPassword) {
        alert("前后输入的密码不一致")
        return
      }
      //console.log("login button pressed");
      let registerData = new FormData();
      let md5Password = this.$md5(this.password);
      registerData.append('username', this.username);
      registerData.append('password', md5Password);
      registerData.append('verify', this.verify);
      registerData.append('phone', this.phoneNumber);
      registerData.append('verify_code', this.phoneVerification);
      await axios.post(`/${this.selected}/register`, registerData)
      .then(resp => {this.is_verify = resp.data.is_verify;
        this.registerResp = resp})
      .catch(error => (alert("Login Post Error")))

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
        axios.post(`/${this.selected}/register/sms`, {phone_num: this.phoneNumber})
        .then(resp => {this.smsResult = resp.data.result})
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
      axios.post(`/${this.selected}/register/verify`)
      .then(resp => {this.verify = resp.data.verify;})
      .catch(error => (alert("getVerify Post Error")))
    }
  },
  watch: {

  } 
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

/* 设置表单容器样式 */
form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* 设置标签样式 */
label {
  display: block;
  margin-top: 10px;
  color: #555;
}

/* 设置输入框样式 */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

/* 设置下拉框样式 */
select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

/* 设置按钮样式 */
button {
  padding: 5px 10px; /* 缩小垂直内边距 */
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px; /* 缩小字体大小 */
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

/* 设置错误信息样式 */
span {
  color: red;
}
input[type="submit"] {
  background-color: #007bff; /* 设置背景颜色 */
  color: #fff; /* 设置字体颜色 */
  border: none; /* 去除边框 */
  border-radius: 5px; /* 圆角边框 */
  padding: 10px 20px; /* 设置内边距，使按钮更宽一些 */
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

input[type="submit"]:hover {
  background-color: #0056b3; /* 鼠标悬停时的背景颜色 */
}


</style>
