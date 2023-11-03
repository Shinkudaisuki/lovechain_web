import Mock from 'mockjs'

Mock.setup({timeout: '200-600'})

Mock.mock('/query/projectitems', 'post', {'projects|3': [{
  'ProjectID|+1': 1,
  'Title': '@CTITLE()'}]})

export default Mock