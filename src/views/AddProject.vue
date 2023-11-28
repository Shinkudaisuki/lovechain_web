<template>
    <div class="main">
      <el-form :model="formData" label-width="120px">
        <el-form-item label="项目编号">
          <el-input v-model="formData.ProjectID"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="formData.Title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="formData.Description"></el-input>
        </el-form-item>
        <el-form-item label="目标金额">
          <el-input v-model="formData.TargetAmount"></el-input>
        </el-form-item>
        <el-form-item label="已募集金额">
          <el-input v-model="formData.RaisedAmount"></el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-input v-model="formData.ApprovalStatus"></el-input>
        </el-form-item>
        <el-form-item label="商家名称">
          <el-input v-model="formData.bus_name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmAdd">添加</el-button>
        </el-form-item>
      </el-form>
  
      <div v-if="showConfirm" class="confirm-dialog">
        <div class="confirm-box">
          <p>确认添加项目吗？</p>
          <div class="buttons">
            <el-button @click="addProject">确认</el-button>
            <el-button @click="cancelAdd">取消</el-button>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>
  import axios from 'axios';
  
  export default {
    name: 'AddProject',
    data() {
      return {
        formData: {
          ProjectID: '',
          Title: '',
          Description: '',
          TargetAmount: '',
          RaisedAmount: '',
          ApprovalStatus: '',
          bus_name: '',
        },
        showConfirm: false,
      };
    },
    methods: {
      addProject() {
        // 向后端发送添加请求的逻辑
        this.formData.operationType = 'add';
        axios.post('/query/projectchanges', this.formData)
          .then(resp => {
            // 提示添加成功，并返回主页
            this.$message.success('添加成功！');
            this.$router.push('/home');
          })
          .catch(error => {
            // 提示添加失败或其他错误信息
            this.$message.error('添加失败，请重试！');
          });
        this.showConfirm = false;
      },
      cancelAdd() {
        // 用户点击了取消按钮，隐藏提示框
        this.showConfirm = false;
      },
      confirmAdd() {
      // Check if all fields are filled
      if (
        !this.formData.ProjectID ||
        !this.formData.Title ||
        !this.formData.Description ||
        !this.formData.TargetAmount ||
        !this.formData.RaisedAmount ||
        !this.formData.ApprovalStatus ||
        !this.formData.bus_name
      ) {
        this.$message.error('请写全信息');
        return;
      }

      this.showConfirm = true;
    },
    },
  };
</script>
  
<style scoped>
  .main {
    width: 100%;
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
  