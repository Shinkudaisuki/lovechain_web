<template>
  <div>
    <h1>登录</h1>
    <form @submit.prevent="_login">
      <label for="username">用户名：</label>
      <input id="username" type="text" v-model="username" placeholder="请输入用户名" required>
      <br/>
      <label for="password">密码：</label>
      <input id="password" type="password" v-model="password" placeholder="请输入密码" required>
      <br/>
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import axios from 'axios';

export default {
  name: 'LoginView',
  data() {
    return {
        username: '',
        password: '',
        verified: false,
        token: '',
        verify: '',
        is_verify: 0,
        loginResp: undefined,
    }
  },
  mounted() {
    axios.post('/administrator/login/verify')
    .then(resp => {this.verify = resp.data.verify;})
    .catch(error => (alert("Mounted Post Error")))
    // console.log(this.verify)
  },
  methods: {
    ...mapMutations(['login']),
    async _login() {  
      //console.log("login button pressed");
      let loginData = new FormData();
      let md5Password = this.$md5(this.password)
      loginData.append('username', this.username);
      loginData.append('password', md5Password);
      loginData.append('verify', this.verify);
      await axios.post('/administrator/login', loginData)
      .then(resp => {this.is_verify = resp.data.is_verify;
                    console.log(resp);
                    this.loginResp = resp})
      .catch(error => (alert("Login Post Error")))

      console.log(this.is_verify)
      if (this.is_verify) {
        console.log("login")
        this.login()
        this.$router.push({name: 'home'})
      }
      else if (this.loginResp) {
        alert('错误码(' + this.loginResp.data.error_code + '):' + this.loginResp.data.error_msg)
      }
    }
  }
}

</script>