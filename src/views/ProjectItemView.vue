<template>
  <div>to be implemented</div>
</template>

<script>
import axios from 'axios';


export default {
  name: 'ProjectItemView',
  data() {
    return {
      resp: undefined,
      }
    },
  mounted() {
    //console.log('ProjectItemView mounted')
    // TODO: Fix bug here
    var qParams = {token: this.$store.state.token,
                  role: this.$store.state.role,
                  range: [0, 10]}
    axios.post('/query/projectitems', qParams)
    .then(resp => {this.resp = resp})
    .catch(error => {console.log('ProjectItemView Post Error')})
  }
}
</script>