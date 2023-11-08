<template>
  <div class="app">
    <el-container class="layout-container-demo">
      <el-header>这里是顶部</el-header>
      <el-container>
        <el-aside width="200px">
          <el-scrollbar>
            <el-menu>
              <el-menu-item index="0" @click="() => {$router.push('/home/ProjectItemView')}">
                <el-icon><Files /></el-icon>
                项目列表
              </el-menu-item>
              <el-menu-item v-for="i in [1,2,3,4,5,6,7,8,9,10,11,12,13]" :key="i">{{ i }}</el-menu-item>
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

export default {
  name: "LayoutView",
  data() {
    return {

    }
  },

  methods: {
    
  }

}
</script>

<style scoped>

.app {
  display: flex;
  height: 100vh; /* 使整个页面占满可视窗口的高度 */
}
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
  margin: 0%;
}
.layout-container-demo .el-menu {
  background-color: #f7fbff
}
.layout-container-demo .el-main {
  padding: 10;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
