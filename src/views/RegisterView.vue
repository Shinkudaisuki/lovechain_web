<template>
  <div>
    <h1>注册</h1>
    <form @submit.prevent="_register">
      <label for="username">用户名：</label>
      <input id="username" type="text" v-model="username" placeholder="请输入用户名" required>
      <label for="password">密码：</label>
      <input id="password" type="password" v-model="password" placeholder="请输入密码" required>
      <label for="password">确认密码：</label>
      <input id="password" type="password" v-model="confirmPassword" placeholder="请输入密码" required>
      <button type="submit">注册</button>
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
        verified: false,
        token: '',
        verify: '',
        is_verify: 0,
        registerResp: undefined,
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
      if (password != this.confirmPassword) {
        alert("前后输入的密码不一致")
        return
      }
      //console.log("login button pressed");
      let registerData = new FormData();
      registerData.append('username', this.username);
      registerData.append('password', this.password);
      registerData.append('verify', this.verify);
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
      else {
        alert('错误码(' + this.registerResp.data.error_code + '):' + this.registerResp.data.error_msg)
      }
    }
  }
}

</script>