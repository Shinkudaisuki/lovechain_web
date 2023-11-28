<template>
    <div class="main">
      <el-input v-model="searchQuery" placeholder="搜索项目" class="search-input"></el-input>
  
      <el-table :data="filteredProjects" v-if="resp">
        <el-table-column prop="ProjectID" label="项目编号"></el-table-column>
        <el-table-column prop="Title" label="标题"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" @click="editProject(scope.row.ProjectID)">修改</el-button>
            <el-button type="danger" @click="showConfirmation(scope.row.ProjectID)">删除</el-button>
            <el-button type="info" @click="viewProject(scope.row.Title)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <div v-if="showConfirm" class="confirm-dialog">
        <div class="confirm-box">
          <p>确认删除该项目吗？</p>
          <div class="buttons">
            <el-button @click="deleteProject(currentProjectID)">确认</el-button>
            <el-button @click="cancelDelete">取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  
  export default {
    name: 'ProjectItemView',
    data() {
      return {
        resp: undefined,
        searchQuery: '',
        showConfirm: false,
        currentProjectID: null,
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
      },
      showConfirmation(projectID) {
      this.showConfirm = true;
      this.currentProjectID = projectID;
    },
    deleteProject(projectID) {
      // 向后端发送删除请求的逻辑
      axios.post('/query/projectchanges', { operationType: 'delete', projectID })
          .then(resp => {
            // 提示添加成功，并返回主页
            this.$message.success('添加成功！');
            this.$router.push('/home');
          })
          .catch(error => {
            // 提示添加失败或其他错误信息
            this.$message.error('添加失败，请重试！');
          });
      // ...
      // 提示删除成功，并返回主页
      this.$message.success('删除成功！');
      // 返回主页的操作，例如使用Vue Router进行页面跳转
      this.$router.push('/home/AddProject');
      // 隐藏确认对话框
      this.showConfirm = false;
    },
    cancelDelete() {
      // 用户点击了取消按钮
      // 隐藏确认对话框
      this.showConfirm = false;
    },
    editProject(ProjectID){
        console.log("enter viewDetail")
        this.$router.push('/project/' + ProjectID).catch(error => {console.log(error)})
      
    },
    viewProject(Title) {
    // 跳转到项目详细信息页面
    this.$router.push(`/project/${Title}`).catch(error => {
      console.log(error);
    });
  },
    },
    computed:{
        filteredProjects() {
        if (!this.resp || !this.resp.data.projects) {
            return [];
        }

        // 根据搜索框中的内容过滤项目列表
        return this.resp.data.projects.filter(project =>
            project.Title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
       },
    }
  }
  </script>
  
  <style scoped>
    .main {
    width: 100%;
    }

    .search-input {
    margin-bottom: 20px;
    }

    .project-list {
    padding: 0;
    }

    .project-item {
    padding: 10px;
    border: 1px solid #ccc; /* 添加边框 */
    margin-bottom: 10px;
    cursor: pointer;
    }
    .confirm-dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    }

    .confirm-box {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }

    .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    }
  </style>