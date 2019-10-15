import { h, Component } from 'preact'
import { WithTreePicker } from '@ruiyun/preact-m-tree-picker'
import { RowView, SlotColumnView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import Icon from '@ruiyun/preact-icon'
import Ajax from '@ruiyun/ajax'

import DemoPage from '../../components/DemoPage'

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

const PickerItem = ({ onClick, values = [], children }) => (
  <RowView
    padding={[30, 30, 30, 30]}
    onClick={onClick}
    bgColor='#fff'
    hAlign='between'
  >
    <Text>{children}</Text>
    <SlotColumnView hAlign='center'>
      {values.map(item => (
        <Text color='#CC6699' key={item}>
          {item.name}
        </Text>
      ))}
    </SlotColumnView>

    <Icon name='icon-qianjin' color='#919191' />
  </RowView>
)
@WithTreePicker
export default class TreepickerDemo extends Component {
  state = {
    name: 'wenjun',
    value1: undefined,
    value2: undefined
  }
  getChildren = async parent => {
    if (!this.mockData) {
      this.mockData = []
      const ret = await Ajax.get(
        'https://uapi.dev.quancheng-ec.com/uac/groups',
        {
          params: {
            type: 'GT_REGION'
          },
          headers: {
            loading: 'false',
            identifier: 'hrg-mp'
          }
        }
      )
      if (ret && ret.success) {
        this.mockData = ret.result.data
      }
    }
    const parentId = parent ? parent.id : ''
    return this.mockData.filter(item => item.pid === parentId)
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
        value: this.state.value1
      })
      .then(v => {
        this.setState({
          value1: v
        })
      })
  }
  openTreePicker2 = () => {
    this.props
      .$treepicker({
        title: '请选择地区',
        getLabel: item => item.name,
        getChildren: this.getChildren,
        value: this.state.value2
      })
      .then(v => {
        this.setState({
          value2: v
        })
      })
  }
  render () {
    return (
      <DemoPage title='TreePicker'>
        <SlotColumnView padding={[0, 30, 0, 30]} slot={30}>
          <PickerItem values={this.state.value1} onClick={this.openTreePicker}>
            静态数据、层级不固定
          </PickerItem>
          <PickerItem values={this.state.value2} onClick={this.openTreePicker2}>
            动态数据、层级固定
          </PickerItem>
        </SlotColumnView>
      </DemoPage>
    )
  }
}
