<template>
  <div>
    <h1>项目列表</h1>
    <el-space wrap v-if="resp">
      <el-card v-for="project in projects" :key="project.ProjectID" class="project-card" @click="() => {this.$router.push('/project/' + project.ProjectID)}">
        <p>项目编号: {{ project.ProjectID }}</p>
        <p>标题: {{ project.Title }}</p>
        <router-link :to="'/project/' + project.ProjectID">查看详情</router-link>
      </el-card>
    </el-space>
  </div>
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