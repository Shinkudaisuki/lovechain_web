<template>
  <div class="main" v-if="resp">
    <el-row v-for="row in dispProjects" :key="row" :gutter="8">
      <el-col v-for="project in row" :key="project.ProjectID" :span="24/colPerRow">
        <el-card shadow="hover" class="project-card" @click="viewDetail(project.Title)">
          <p>项目编号: {{ project.ProjectID }}</p>
          <p>标题: {{ project.Title }}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>




<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'ProjectItemView',
  data() {
    return {
      resp: undefined,
      projects: undefined
      }
    },
  computed: {
    ...mapGetters(['screenType']),
    colPerRow() {
      if (this.screenType == 'large') {
        return 4
      }
      else if (this.screenType == 'medium') {
        return 3
      }
      else {
        return 2
      }
    },
    numRow() {
      return Math.ceil(this.projects.length / this.colPerRow)
    },
    dispProjects() {
      var res = []
      for (let index = 0; index < this.numRow; index++) {
        var start = index * this.colPerRow
        var end = (index + 1) * this.colPerRow
        if (end > this.projects.length) {
          end = this.projects.length
        }
        res.push(this.projects.slice(start, end))
      }
      return res
    }
  },
  mounted() {
    console.log('ProjectItemView mounted')
    var qParams = {token: this.$store.state.token,
                  role: this.$store.state.role,
                  range: [0, 10]}
    axios.post('/query/projectitems', qParams)
    .then(resp => {this.resp = resp; this.projects = resp.data.projects;})
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
.el-row {
  margin-bottom: 8px;
}
.el-col {
  align-items: stretch;
}
.el-card {
  height: 100%;
}
.el-space {
  width: 100% 
}
</style>