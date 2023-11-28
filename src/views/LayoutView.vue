<template>
  <div class="app">
    <el-container class="layout-container-outer">
      <el-header>这里是顶部</el-header>
      <el-container class="layout-container-main">
        <el-aside width="200px">
          <el-scrollbar>
            <el-menu>
              <el-menu-item index="0" @click="() => {$router.push('/home/ProjectItemView')}">
                <el-icon><Files /></el-icon>
                项目列表
              </el-menu-item>
              <el-menu-item index="1" v-if="isAdmin" @click="() => {$router.push('/home/ManageProject')}">
                项目管理
              </el-menu-item>
              <el-menu-item index="2" v-if="isAdmin" @click="() => {$router.push('/home/AddProject')}">
                添加项目
              </el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "LayoutView",
  data() {
    return {

    }
  },
  computed: {
    isAdmin() {
      console.log(this.role)
      console.log(this.role == 'Admin')
      return this.role == 'Admin'
    },
    ...mapState(['role']),
  },
  methods: {
    
  }

}
</script>

<style scoped>
.app {
  display: flex;
  height: 90vh; /* 使整个页面占满可视窗口的高度 */
}
.el-main {
  width: calc(100vw - 200px);
}
.layout-container-outer .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-main {
  height: 100%;
}
.layout-container-main .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
  margin: 0%;
}
.layout-container-main .el-menu {
  background-color: #f7fbff
}
.layout-container-main .el-main {
  padding: 10;
}
.layout-container-main .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
