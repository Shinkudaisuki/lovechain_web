<template>
  <div class="app">
    <div class="sidebar">
      <el-aside width="200px">目录</el-aside>
      <router-link to="/home/ProjectItemView" class="block-link">跳转到另一个组件</router-link>
      <router-link to="/home/test" class="block-link">跳转到另二个组件</router-link>
    </div>
    <div class="main-content full-screen">
      <router-view></router-view>
    </div>
  </div>
</template>

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
  display: block;
  margin-bottom: 10px;
  text-decoration: none;
  color: #333;
  padding: 10px;
  border-radius: 5px;
  background-color: #ddd;
  transition: background-color 0.3s;
}

.block-link:hover {
  background-color: #aaa;
}

.full-screen {
  flex: 1; /* 充满剩余空间 */
  overflow: auto; /* 添加滚动条，如果内容过多 */
}
</style>
