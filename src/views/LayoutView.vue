<template>
  <div class="app">
    <el-container class="layout-container-demo">
      <el-header>这里是顶部</el-header>
      <el-container>
        <el-aside width="200px">
          <el-button size="large" type="primary" class="block-link" @click="$router.push({name: 'home'})">
            <!-- <router-link to="/home/ProjectItemView">跳转到另一个组件</router-link> -->
            跳转到第一个组件
          </el-button>
          <el-button size="large" type="primary" class="block-link" @click="$router.push({path: '/home/test'})">
            <!-- <router-link to="/home/test" class="link-text">跳转到另二个组件</router-link> -->
            跳转到第二个组件
          </el-button>
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

<style>
.app {
  display: flex;
  height: 100vh; /* 使整个页面占满可视窗口的高度 */
}

.sidebar {
  width: 200px;
  background-color: #f0f0f0;
  padding: 20px;
}

.block-link {
  margin: 10px;
  text-decoration: none;
}

/* .block-link {
  display: block;
  margin: 10px;
  margin-bottom: 10px;
  text-decoration: none;
  color: #333;
  padding: 10px;
  border-radius: 5px;
  background-color: var(--el-color-primary);
  transition: background-color 0.3s;
} */

/* .block-link:hover {
  background-color: #aaa;
} */

.full-screen {
  flex: 1; /* 充满剩余空间 */
  overflow: auto; /* 添加滚动条，如果内容过多 */
}
</style>

<style scoped>
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
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
