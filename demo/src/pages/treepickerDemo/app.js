import { h, Component } from 'preact'
import style from './app.css'
import { WithTreePicker } from '@ruiyun/preact-m-tree-picker'

const mockData = [
  {
    name: '安徽省',
    id: 1
  },
  {
    name: '湖北省',
    id: 2
  },
  {
    name: '陕西省',
    id: 3
  },
  {
    name: '青海省',
    id: 4
  },
  {
    name: '云南省',
    id: 5
  },
  {
    name: '四川省',
    id: 6
  },
  {
    name: '甘肃省',
    id: 7
  },
  {
    name: '山西省',
    id: 8
  },
  {
    name: '合肥市',
    id: 11,
    parentId: 1
  },
  {
    name: '池州市',
    id: 12,
    parentId: 1
  },
  {
    name: '武汉市',
    id: 21,
    parentId: 2
  },
  {
    name: '孝感市',
    id: 22,
    parentId: 2
  },
  {
    name: '青阳县',
    id: 123,
    parentId: 12
  },
  {
    name: '长丰县',
    id: 111,
    parentId: 11
  },
  {
    name: '杜集镇',
    id: 1111,
    parentId: 111
  },
  {
    name: '蓉城镇',
    id: 1234,
    parentId: 123
  },
  {
    name: '东西湖区',
    id: 213,
    parentId: 21
  },
  {
    name: '长青街道',
    id: 2131,
    parentId: 213
  }
]
@WithTreePicker
export default class TreepickerDemo extends Component {
  state = {
    name: 'wenjun',
    value: undefined
  }
  openTreePicker = () => {
    this.props
      .$treepicker({
        title: '配送至',
        getLabel: item => item.name,
        getChildren: parent => {
          const parentId = parent && parent.id
          return mockData.filter(item => item.parentId === parentId)
        },
        value: this.state.value
      })
      .then(v => {
        console.log(v)
        this.setState({
          value: v
        })
      })
  }
  render () {
    return (
      <div>
        TreepickerDemo
        <div className={style.test} onClick={this.openTreePicker}>
          {this.state.name}
        </div>
      </div>
    )
  }
}
