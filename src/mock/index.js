import Mock from 'mockjs'

Mock.setup({timeout: '200-600'})

Mock.mock('/query/projectitems', 'post', {'projects|5': [{
  'ProjectID|+1': 1,
  'Title': '@CTITLE()'}]})

Mock.mock('/query/projectdetails', 'post', (options) => {
  return {
    'ProjectID': Mock.Random.natural(),
    'Title': JSON.parse(options.body).ProjectTitle,
    'Description': Mock.Random.ctitle(),
    'TargetAmount': Mock.Random.natural(),
    'RaisedAmount': Mock.Random.natural(),
    'ApprovalStatus': Mock.Random.boolean(),
    'bus_name': Mock.Random.cname()
  }
})

Mock.mock('/query/chart', 'post', (options) => {
  return {
    "type": "force",
    "categories": [
        {
            "name": "流入",
            "keyword": {},
            "base": "Individual"
        },
        {
            "name": "合并",
            "keyword": {},
            "base": "Group"
        },
        {
            "name": "目标",
            "keyword": {},
            "base": "Target"
        },
        {
            "name": "其他",
            "keyword": {}
        }
    ],
    "nodes": [
        {
            "name": "hash1",
            "value": 1,
            "category": 0
        },
        {
            "name": "hash2",
            "value": 1,
            "category": 0
        },
        {
            "name": "hash3",
            "value": 1,
            "category": 0
        },
        {
            "name": "hash4",
            "value": 1,
            "category": 1
        },
        {
            "name": "hash5",
            "value": 1,
            "category": 2
        }
    ],
    "links": [
        {
            "source": 0,
            "target": 3
        },
        {
            "source": 1,
            "target": 3
        },
        {
            "source": 2,
            "target": 3
        },
        {
            "source": 3,
            "target": 4
        }
    ]
  }
})

export default Mock