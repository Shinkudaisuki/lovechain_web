<template>
  <div>
    <h1>登录({{ screenType }})</h1>
    <form @submit.prevent="_login">
      <label for="username">用户名：</label>
      <input id="username" type="text" v-model="username" placeholder="请输入用户名" required>
      <br/>
      <label for="password">密码：</label>
      <input id="password" type="password" v-model="password" placeholder="请输入密码" required>
      <br/>
      <input type="radio" id="user" value="User" v-model="picked">
      <label for="user">用户</label>
      
      <input type="radio" id="admin" value="Admin" v-model="picked">
      <label for="admin">管理员</label>

      <input type="radio" id="businessman" value="Businessman" v-model="picked">  
      <label for="businessman">商家</label>
      <br/>
      <button type="submit">登录</button>
      <br>
    </form>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'LoginView',
  data() {
    return {
        username: '',
        password: '',
        token: '',
        verify: '',
        is_verify: 0,
        loginResp: undefined,
        picked:'User',
    }
  },

  mounted() {
    axios.post('/administrator/login/verify')
    .then(resp => {this.verify = resp.data.verify;})
    .catch(error => (alert("Mounted Post Error")))
    // console.log(this.verify)
    console.log(this.$store.state.screenWidth)
    console.log(this.$store.getters.screenType)
  },
  computed: {
    ...mapState(['screenWidth']),
    ...mapGetters(['screenType'])
  },
  methods: {
    ...mapMutations(['login']),
    async _login() {
      let loginData = new FormData();
      let md5Password = this.$md5(this.password)
      loginData.append('username', this.username);
      loginData.append('password', md5Password);
      loginData.append('verify', this.verify);
      loginData.append('userType',this.picked);
      var loginUrl = ''
      switch(this.picked){
        case 'User':
          loginUrl = '/user/login'
          break;

        case 'Businessman':
          loginUrl = '/merchant/login'
          break;

        case 'Admin':
          loginUrl = '/administrator/login'
          break;

        default:
          console.error("What???");
          break;
      }
      if (loginUrl) {
        await axios.post(loginUrl, loginData)
        .then(resp => {this.is_verify = resp.data.is_verify;
                      console.log(resp);
                      this.loginResp = resp})
        .catch(error => (alert("Login Post Error")))
      }
      if(this.is_verify)
      {
        this.login(this.picked, this.loginResp.data.token)
        this.$router.push({name: 'home'})
      }
      else if (this.loginResp) {
      alert('错误码(' + this.loginResp.data.error_code + '):' + this.loginResp.data.error_msg)
      }
    //   await axios.post('/administrator/login', loginData)
    //   .then(resp => {this.is_verify = resp.data.is_verify;
    //                 console.log(resp);
    //                 this.loginResp = resp})
    //   .catch(error => (alert("Login Post Error")))
    //   console.log(this.is_verify)
    //   if(this.is_verify)
    //   {
    //     switch (this.picked) {
    //     case 'User':
    //       console.log("User login");
    //       this.login()
    //       this.$router.push({name: 'home'})
    //       break;
    //     case 'Businessman':
    //       console.log("Businessman login");
    //       this.login()
    //       this.$router.push({name: 'home'})
    //       break;
    //     case 'Admin':
    //       console.log("Admin login");
    //       this.login()
    //       this.$router.push({name: 'home'})
    //       break;
    //     default:
    //       console.error("What???");
    //       break;
    //     }
    //   }
    //   else if (this.loginResp) {
    //     alert('错误码(' + this.loginResp.data.error_code + '):' + this.loginResp.data.error_msg)
    //   }

    // }
    }
  }
}


</script>