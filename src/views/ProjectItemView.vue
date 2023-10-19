<template>
  <table class="project-table" border="1">
    <thead>
      <tr>
        <th>项目编号</th>
        <th>标题</th>
        <th>描述</th>
        <th>目标金额</th>
        <th>已募集金额</th>
        <th>审核状态</th>
        <th>商家名称</th>
      </tr>
    </thead>
    <tbody v-if="resp">
      <tr v-for="project in resp.data" :key="project.ProjectID">
        <td v-for="(value, key) in project" :key="key">{{ item }}</td>
      </tr>
    </tbody>
  </table>
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
    console.log('ProjectItemView mounted')
    var qParams = {token: this.$store.state.token,
                  role: this.$store.state.role,
                  range: [0, 10]}
    axios.post('/query/projectitems', qParams)
    .then(resp => {this.resp = resp})
    .catch(error => {console.log('ProjectItemView Post Error')})
  }
}
</script>

<style>
.project-table {
  width: 100%
}
</style>