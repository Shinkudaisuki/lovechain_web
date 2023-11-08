<template>
  <router-view/>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'App',
  created() {
    //console.log('App created')
    //console.log(this.$store.state)
    if (this.$store.state.token) {
      axios.interceptors.request.use(
        config => {
          config.headers['Authorization'] = 'Bearer ' + this.$store.state.token;
          return config
        },
        error => {return Promise.reject(error);}
      )
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  computed: {
    ...mapState(['screenWidth'])
  },
  methods: {
    ...mapMutations(['setScreenWidth']),
    onResize() {
      this.setScreenWidth(window.innerWidth)
      //console.log(this.screenWidth)
    },
  }
}
</script>
