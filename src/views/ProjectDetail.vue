<template>
  <div>
    <el-card>
      <h2>项目详情</h2>
      <p>项目编号: {{ resp.data.ProjectID }}</p>
      <p>标题: {{ resp.data.Title }}</p>
      <p>描述: {{ resp.data.Description }}</p>
      <p>目标金额: {{ resp.data.TargetAmount }}</p>
      <p>已募集金额: {{ resp.data.RaisedAmount }}</p>
      <p>审核状态: {{ resp.data.ApprovalStatus }}</p>
      <p>商家名称: {{ resp.data.bus_name}}</p>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      resp: undefined
    }
  },
  mounted() {
    const ProjectTitle = this.$route.params.Title;
    // 使用POST请求从后端获取特定项目的详细信息
    axios.post('/query/projectdetails',{ ProjectTitle: ProjectTitle })
      .then(resp => {
        this.resp = resp; 
      })
      .catch(error => {
        console.error('获取项目详情失败', error);
      })
  }
}
</script>