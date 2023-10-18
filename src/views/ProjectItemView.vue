<template>
  <div>to be implemented</div>
</template>

<script>
import axios from 'axios';


export default {
  name: 'ProjectItemView',
  data() {
    return {

      }
    },
  mounted() {
    var qParams = {token: this.$store.token,
                  role: this.$store.role,
                  range: [0, 10]}
    axios.post('/query/projectitems', qParams)
  }
}
</script>