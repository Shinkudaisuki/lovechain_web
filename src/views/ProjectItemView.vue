<template>
  <div class="main">
    <el-space wrap fill fill-ratio="20" v-if="resp">
      <el-card v-for="project in resp.data.projects" :key="project.ProjectID" shadow="hover" class="project-card" @click="viewDetail(project.Title)">
        <p>项目编号: {{ project.ProjectID }}</p>
        <p class="title">标题: {{ project.Title }}</p>
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
    .then(resp => {this.resp = resp; console.log(resp)})
    .catch(error => {console.log('ProjectItemView Post Error')})
  },
  methods: {
    viewDetail(destination) {
      console.log("enter viewDetail")
      this.$router.push('/project/' + destination).catch(error => {console.log(error)})
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%
}
.el-space {
  width: 100% 
}
.project-card .title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* 添加以下样式来限制标题的最大宽度 */
  max-width: 200px; /* 根据需要调整最大宽度 */
}
</style>