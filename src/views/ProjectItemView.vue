<template>
  <el-space wrap v-if="resp">
    <el-card v-for="project in resp.data" :key="project.ProjectID" class="box-card" style="width: 250px">
      <template #header>
        <div class="card-header">
          <span>{{ project.ProjectID }}</span>
        </div>
      </template>
      <div>
        <div>标题: {{ project.Title }}</div>
        <div>描述: {{ project.Description }}</div>
        <div>目标金额: {{ project.GoalAmount }}</div>
        <div>已募集金额: {{ project.RaisedAmount }}</div>
        <div>审核状态: {{ project.Status }}</div>
        <div>商家名称: {{ project.MerchantName }}</div>
      </div>
    </el-card>
  </el-space>
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