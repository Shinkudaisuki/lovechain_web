<template>
    <div>
      <div class="main" v-if="projects">
        <el-card v-for="project in projects" :key="project.id" class="project-item">
          <template #header>
            <div class="project-header">
              <p>项目编号: {{ project.id }}</p>
              <p>项目名称: {{ project.name }}</p>
              <!-- 这里可以展示其他项目信息 -->
            </div>
          </template>
          <div class="project-info">
            <!-- 这里可以展示更多项目信息 -->
          </div>
          <div class="action-buttons">
            <el-button type="success" @click="approveProject(project.id)">同意</el-button>
            <el-button type="danger" @click="rejectProject(project.id)">拒绝</el-button>
          </div>
        </el-card>
      </div>
      <div v-else>
        <p>加载中...</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'ConfirmProjects',
    setup() {
      const projects = ref(null);
  
      const fetchPendingProjects = () => {
        var qParams = {
            token: this.$store.state.token,
            role: this.$store.state.role,
            range: [0, 10]
        };

        axios.get('/query/waitlist', {
            params: qParams // 将 qParams 作为请求的参数传递给后端
        })
            .then(response => {
            projects.value = response.data;
            })
            .catch(error => {
            console.error('Error fetching pending projects:', error);
            });
        };

  
      const approveProject = (projectId) => {
        const data = { projectId, status: 'OK' };
        axios.post(`/query/projectapproval`, data) // 替换成你的后端接口
            .then(() => {
            fetchPendingProjects();
            })
            .catch(error => {
            console.error('Error approving project:', error);
            });
        };

        const rejectProject = (projectId) => {
        const data = { projectId, status: 'NO' };
        axios.post(`/query/projectapproval`, data) // 替换成你的后端接口
            .then(() => {
            fetchPendingProjects();
            })
            .catch(error => {
            console.error('Error rejecting project:', error);
            });
        };

  
      return {
        projects,
        fetchPendingProjects,
        approveProject,
        rejectProject
      };
    }
  };
  </script>
  
  <style scoped>
  /* 根据需要添加样式以适应 Element Plus 的组件样式和布局需求 */
  .project-item {
    margin-bottom: 20px;
  }
  
  .project-header {
    font-weight: bold;
  }
  </style>
  