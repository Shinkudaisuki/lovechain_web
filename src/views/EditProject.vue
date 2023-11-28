<template>
    <el-container>
      <el-header>
        <el-page-header @back="goback">
          <el-button type="primary" @click="confirmEdit">修改</el-button>
        </el-page-header>
      </el-header>
      <el-main>
        <el-form ref="form" :model="editedData" label-width="120px">
          <el-form-item label="项目编号">
            <el-input v-model="editedData.ProjectID"></el-input>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="editedData.Title"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="editedData.Description"></el-input>
          </el-form-item>
          <el-form-item label="目标金额">
            <el-input v-model="editedData.TargetAmount"></el-input>
          </el-form-item>
          <el-form-item label="已募集金额">
            <el-input v-model="editedData.RaisedAmount"></el-input>
          </el-form-item>
          <el-form-item label="审核状态">
            <el-input v-model="editedData.ApprovalStatus"></el-input>
          </el-form-item>
          <el-form-item label="商家名称">
            <el-input v-model="editedData.bus_name"></el-input>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </template>
  <script>
  import axios from 'axios';
  
  export default {
    name: 'EditProject',
    data() {
      return {
        editedData: {}, // 存放编辑后的数据
        originalData: {}, // 存放原始数据，用于对比修改
      }
    },
    mounted() {
      // 获取需要编辑的项目原始信息，填充表单
      const projectTitle = this.$route.params.Title;
      this.getOriginalData(projectTitle);
    },
    methods: {
      async getOriginalData(projectTitle) {
        await axios.post('/query/projectitems', { ProjectTitle: projectTitle })
          .then(resp => {
            this.originalData = resp.data; // 保存原始数据
            this.editedData = { ...resp.data }; // 复制数据以便编辑
          })
          .catch(error => console.log('获取项目信息失败'));
      },
      confirmEdit() {
        // 比较 editedData 和 originalData，检查是否有修改
        const isModified = JSON.stringify(this.editedData) !== JSON.stringify(this.originalData);
        if (!isModified) {
          // 如果没有修改，提示用户
          this.$message.warning('未做任何修改！');
          return;
        }
        // 提示用户确认修改
        this.$confirm('确认修改项目信息吗？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 用户确认修改后，将 editedData 发送到后端
          this.sendEditedData();
        }).catch(() => {
          // 用户取消修改，停留在当前页面
        });
      },
      sendEditedData() {
        // 发送编辑后的数据到后端的逻辑
        this.editedData.operationType = 'edit';
        // 使用 axios 或其他方法发送请求
        axios.post('/query/projectchanges', this.editedData)
          .then(resp => {
            // 成功发送数据到后端，提示用户并返回主页
            this.$message.success('修改成功！');
            this.$router.push('/home');
          })
          .catch(error => {
            // 发送数据到后端失败，提示用户或进行其他操作
            this.$message.error('修改失败，请重试！');
          });
      },
      goback() {
        this.$router.back();
      }
    }
  }
  </script>
  
  <style scoped>
  .el-container {
  width: 100%;
  height: 100%;
    }

    /* 页头样式 */
    .el-page-header {
    padding: 20px;
    background-color: #f0f0f0;
    }

    /* 按钮样式 */
    .el-button {
    margin-right: 10px;
    }

    /* 表单样式 */
    .el-form {
    max-width: 600px;
    margin: 20px auto;
    }

    /* 表单项样式 */
    .el-form-item {
    margin-bottom: 20px;
    }
  </style>