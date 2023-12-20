<template>
    <div>
      <div class="main" v-if="projects">
        <table class="project-table">
          <thead>
            <tr>
              <th>项目编号</th>
              <th>项目名称</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects" :key="project.id">
              <td>{{ project.ProjectID }}</td>
              <td>{{ project.Title }}</td>
              <td>
                <el-button type="primary" @click="approveProject(project.ProjectID)">同意</el-button>
                <el-button type="danger" @click="rejectProject(project.ProjectID)">拒绝</el-button>
              </td>
            </tr>
          </tbody>
        </table>
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
    data() {
      return {
        projects: null
      };
    },
    methods: {
      fetchPendingProjects() {
        var qParams = {
          token: this.$store.state.token,
          role: this.$store.state.role,
          range: [0, 20]
        };
        axios.post('/query/waitlist', qParams)
          .then(response => {
            this.projects = response.data.projects;
          })
          .catch(error => {
            console.error('Error fetching pending projects:', error);
          });
      },
      approveProject(projectId) {
        const data = { projectId, status: 'ok' };
        axios.post(`/query/projectapproval`, data)
          .then(() => {
            this.fetchPendingProjects();
          })
          .catch(error => {
            console.error('Error approving project:', error);
          });
      },
      rejectProject(projectId) {
        const data = { projectId, status: 'refuse' };
        axios.post(`/query/projectapproval`, data)
          .then(() => {
            this.fetchPendingProjects();
          })
          .catch(error => {
            console.error('Error rejecting project:', error);
          });
      }
    },
    mounted() {
      console.log('confirmproject mounted');
      this.fetchPendingProjects();
    }
  };
  </script>
  
  <style scoped>
  /* 根据需要添加样式以适应 table 的布局需求 */
  .project-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .project-table th,
  .project-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .project-table th {
    background-color: #f2f2f2;
  }
  </style>
  