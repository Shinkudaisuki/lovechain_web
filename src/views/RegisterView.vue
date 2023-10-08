<template>
  <div>
    <h1>注册</h1>
    <form @submit.prevent="_register">
      <label for="username">用户名：</label>
      <input id="username" type="text" v-model="username" placeholder="请输入用户名" required>
      <br/>
      <label for="password">密码：</label>
      <input id="password" type="password" v-model="password" placeholder="请输入密码" required>
      <br/>
      <label for="password">确认密码：</label>
      <input id="password" type="password" v-model="confirmPassword" placeholder="请再次输入密码" required>
      <br/>
      <label for="phonenumber">手机号码：</label>
      <input id="phonenumber" type="text" v-model="phoneNumber" placeholder="请输入手机号码" required>
      <button @click="send_sms" :disabled="!isPhoneNumberValid">发送验证码</button>
      <br/>
      <strong v-show="!isPhoneNumberValid">手机号码格式不正确</strong>
      <strong v-show="isPhoneNumberUsed">手机号码已被注册</strong>
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
    }
  },
  computed: {
    isPhoneNumberValid: function () {
      return /^1[3456789]\d{9}$/.test(this.phoneNumber)
    },
    isPhoneNumberUsed: function () {
      return (this.smsResult == 2000)? true : false
    }
  },
  mounted() {
    axios.post('/administrator/register/verify')
    .then(resp => {this.verify = resp.data.verify;})
    .catch(error => (alert("Mounted Post Error")))
    // console.log(this.verify)
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
      await axios.post('/administrator/register', registerData)
      .then(resp => {this.is_verify = resp.data.is_verify;
        console.log(resp);
        this.registerResp = resp})
      .catch(error => (alert("Login Post Error")))

      console.log(this.is_verify)
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
      axios.post('/administrator/register/sms', {phone_num: this.phoneNumber})
      .then(resp => {this.smsResult = resp.data.result})
      .catch(eror => {alert("send_sms Post Error")})
    }
  }
}

</script>