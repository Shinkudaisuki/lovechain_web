<template>
  <div>
    <h1>登录</h1>
    <form :disabled="disableForm" @submit.prevent="_login" class="login-form">
      <div class="form-group">
        <label for="username">用户名：</label>
        <input :disabled="disableForm" id="username" type="text" v-model="username" placeholder="请输入用户名" required>
      </div>
      <div class="form-group">
        <label for="password">密码：</label>
        <input :disabled="disableForm" id="password" type="password" v-model="password" placeholder="请输入密码" required>
      </div>
      <br/>
      <div class="radio-group">
        <input :disabled="disableForm" type="radio" id="user" value="User" v-model="picked">
        <label for="user">用户</label>
      
        <input :disabled="disableForm" type="radio" id="admin" value="Admin" v-model="picked">
        <label for="admin">管理员</label>

        <input :disabled="disableForm" type="radio" id="businessman" value="Businessman" v-model="picked">  
        <label for="businessman">商家</label>
      </div>
      <br/>
      <button :disabled="disableForm" type="submit" class="login-button">登录</button>
      <button :disabled="disableForm" @click="_register" class="login-button">注册</button>
    </form>
    <div v-if="showErrorAlert" class="error-alert">
    <div class="error-alert-content">
      <p>用户名或密码错误</p>
      <button @click="closeErrorAlert">OK</button>
    </div>
  </div>
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
        showErrorAlert: false,
        disableForm:false,
    }
  },

  mounted() {
    axios.post('/administrator/login/verify')
    .then(resp => {this.verify = resp.data.verify;})
    .catch(error => (console.log("Mounted Post Error")))
  },
  computed: {
    ...mapState(['screenWidth']),
    ...mapGetters(['screenType'])
  },
  methods: {
    showPasswordErrorAlert() {
      this.showErrorAlert = true;
      this.disableForm = true;
    },    
    closeErrorAlert() {
      this.showErrorAlert = false;
      this.disableForm = false;
    },
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
          loginUrl = '/home'
          break;

        case 'Businessman':
          loginUrl = '/merchant/login'
          break;

        case 'Admin':
          loginUrl = '/administrator/login'
          break;

        default:
          console.error("Invalid role");
          break;
      }
      if (loginUrl) {
        await axios.post(loginUrl, loginData)
        .then(resp => {this.is_verify = resp.data.is_verify;
                      this.loginResp = resp})
        .catch(error => (console.log("Login Post Error")))
      }
      if(this.is_verify)
      {
        this.token = this.loginResp.data.token
        axios.interceptors.request.use(
          config => {
            config.headers['Authorization'] = 'Bearer ' + this.token;
            return config
          },
          error => {return Promise.reject(error);}
        )
        this.login({role: this.picked, token: this.token})
        this.$router.push({name: 'home'})
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.loginResp.data.token
      }
      else if (this.loginResp) {
      this.showPasswordErrorAlert();
      console.log('错误码(' + this.loginResp.data.error_code + '):' + this.loginResp.data.error_msg)
      }
      // delete the else chunk when deployed
      else if (process.env.NODE_ENV == 'development') {
        console.log('debug login')
        console.log({role: this.picked, token: this.token})
        axios.interceptors.request.use(
          config => {
            config.headers['Authorization'] = 'Bearer debug';
            return config
          },
          error => {return Promise.reject(error);}
        )
        this.token = 'Bearer debug'
        this.login({role: this.picked, token: this.token})
        const children = 'ProjectItemView'
        this.$router.push({ name: 'home' })
      }
    },
    async _register()
    {
      this.$router.push({ name: 'register' }); // 通过路由的名称跳转
    }
  }
}


</script>
<style scoped>

/* 设置登录框的样式 */
.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* 设置标题样式 */
h1 {
  text-align: center;
  color: #333;
}

/* 设置表单容器样式 */
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.form-group {
  display: flex; /* 使用 Flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.form-group label {
  display: inline-block; /* 设置为内联块元素，使其在同一行显示 */
  width: 120px; /* 或其他适当的宽度 */
  margin-right: 10px; /* 控制标签和输入框之间的间距 */
}

input[type="text"],
input[type="password"] {
  width: 30%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.radio-group {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  margin-top: 10px;
}

.radio-group input[type="radio"] {
  margin-right: 5px;
}

.radio-group label {
  margin-right: 15px; /* 适当的间距，根据需要调整 */
}

/* 设置登录按钮样式 */
.login-button {
  display: block;
  width: 20%;
  margin: 3px auto; /* 使用这个样式来水平居中按钮 */
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #0056b3;
}
/*错误信息*/ 
.error-alert {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
}

.error-alert-content button {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.error-alert-content button:hover {
  background-color: #0056b3;
}
</style>