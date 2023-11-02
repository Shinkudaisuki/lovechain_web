<template>
  <div>
    <el-card>
      <h2>项目详情</h2>
      <p>项目编号: {{ project.ProjectID }}</p>
      <p>标题: {{ project.Title }}</p>
      <p>描述: {{ project.Description }}</p>
      <p>目标金额: {{ project.GoalAmount }}</p>
      <p>已募集金额: {{ project.RaisedAmount }}</p>
      <p>审核状态: {{ project.Status }}</p>
      <p>商家名称: {{ project.MerchantName }}</p>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      project: null
    }
  },
  mounted() {
    const ProjectTitle = this.$route.params.Title;
    // 使用POST请求从后端获取特定项目的详细信息
    axios.post('/query/projectdetails',{ ProjectTitle: ProjectTitle })
      .then(resp => {
        this.project = resp.data; 
      })
      .catch(error => {
        console.error('获取项目详情失败', error);
      })
  }
}
</script>