<template>
  <el-container>
    <el-header>
      <el-page-header @back="goback">
        <template #extra>
          <el-button type="primary" @click="donate">捐赠</el-button>
        </template>
      </el-page-header>
    </el-header>
    <el-main>
      <el-descriptions v-if="detailResp" title="项目详情" border>
        <el-descriptions-item label="项目编号">{{ detailResp.data.ProjectID }}</el-descriptions-item>
        <el-descriptions-item label="标题">{{ detailResp.data.Title }}</el-descriptions-item>
        <el-descriptions-item label="描述">{{ detailResp.data.Description }}</el-descriptions-item>
        <el-descriptions-item label="目标金额">{{ detailResp.data.TargetAmount }}</el-descriptions-item>
        <el-descriptions-item label="已募集金额">{{ detailResp.data.RaisedAmount }}</el-descriptions-item>
        <el-descriptions-item label="审核状态">{{ detailResp.data.ApprovalStatus }}</el-descriptions-item>
        <el-descriptions-item label="商家名称">{{ detailResp.data.bus_name}}</el-descriptions-item>
      </el-descriptions>
      <div id="chart"></div>
    </el-main>
  </el-container>

</template>

<script>
import axios from 'axios';
import * as echarts from 'echarts';

export default {
  name: 'ProjectDetail',
  data() {
    return {
      detailResp: undefined,
      chartData: undefined,
      myChart: undefined,
    }
  },
  mounted() {
    const projectTitle = this.$route.params.Title;
    // 使用POST请求从后端获取特定项目的详细信息
    this.getDetails(projectTitle)
    this.getChartData(projectTitle)
  },
  watch: {
    chartData(newVal, oldVal) {
      if (this.myChart === undefined) {
        var chartDom = document.getElementById('chart')
        this.myChart = echarts.init(chartDom)
      }
      var option = {
        title: {text: '示例图表'},
        tooltip: {},
        legend: {
          type: 'plain',
          show: true
        },
        series: [
          {
            type: 'graph',
            layout: 'force',
            animation: false,
            label: {
              position: 'left',
              formatter: '{b}'
            },
            draggable: true,
            data: newVal.nodes.map((node, idx) => {node.id=idx;return node;}),
            categories: newVal.categories,
            force: {
              edgeLength: 20,
              repulsion: 20,
              gravity: 0.1
            },
            edges: newVal.links
          }
        ]
      }
      this.myChart.setOption(option)
    }
  },
  methods: {
    async getDetails(projectTitle) {
      await axios.post('/query/projectdetails',{ ProjectTitle: projectTitle })
        .then(resp => {this.detailResp = resp})
        .catch(error => console.log('获取项目详情失败'))
    },
    getChartData(projectTitle) {
      axios.post('/query/chart',{ ProjectTitle: projectTitle })
        .then(resp => {this.chartData = resp.data})
        .catch(error => console.log('获取项目图表数据失败'))
    },
    donate() {
      this.$prompt('请输入捐赠金额', {
        title: '项目捐献',
        cancelButtonText: '取消',
        confirmButtonText: '捐赠',
        inputPattern: /^[1-9]\d*$/,
        inputErrorMessage: '请输入正确的金额'
      }).then(({ value }) => {
        console.log('point');
        axios.post('/query/donate', {
          ProjectID: this.detailResp.data.ProjectID,
          count: value}).then(resp => {
            const projectTitle = this.$route.params.Title;
            this.getDetails(projectTitle);
            this.getChartData(projectTitle);
          }).catch(error => {
            console.log('donate post error')
          })
      }).catch(() => {
        console.log('donate canceled')
      })
    },
    goback() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.el-container {
  width: 100%;
  height: 100%;
}
.el-main {
  padding: 0px;
}

.el-card {
  height: 30%;
}

#chart {
  width: 90vw;
  height: 70vh;
}
</style>