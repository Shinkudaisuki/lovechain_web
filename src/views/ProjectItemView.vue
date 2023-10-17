<template>

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
    qParams = {token: this.$store.token,
              role: this.$store.role}
    axios.post('/query/projectitems')
  }
}
</script>