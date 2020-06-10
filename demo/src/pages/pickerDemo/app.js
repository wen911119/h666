import { h, Component } from 'preact'
import { WithPicker } from '@ruiyun/preact-m-picker'
import { RowView, SlotColumnView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import Icon from '@ruiyun/preact-icon'
import DemoPage from '../../components/DemoPage'

const options = ['安徽', '上海', '深圳', '重庆', '北京', '四川', '湖南']

const PickerItem = ({ onClick, values, children }) => (
  <RowView
    padding={[30, 30, 30, 30]}
    onClick={onClick}
    bgColor='#fff'
    hAlign='between'
  >
    <Text>{children}</Text>
    <SlotColumnView>
      {values
        .map((i) => options[i])
        .map((item) => (
          <Text color='#CC6699' key={item}>
            {item}
          </Text>
        ))}
    </SlotColumnView>

    <Icon name='icon-qianjin' color='#919191' />
  </RowView>
)

@WithPicker
export default class PickerDemo extends Component {
  state = {
    name: '打开picker',
    picker1: [],
    picker2: [],
  }

  openPicker1 = () => {
    this.props
      .$picker({
        title: '请选择籍贯',
        options,
        values: this.state.picker1,
      })
      .then((indexs) => {
        this.setState({
          picker1: indexs,
        })
      })
  }

  openPicker2 = () => {
    this.props
      .$picker({
        title: '请选择喜欢的城市',
        options,
        mode: 3,
        values: this.state.picker2,
      })
      .then((indexs) => {
        this.setState({
          picker2: indexs,
        })
      })
  }

  render() {
    const { picker1, picker2 } = this.state
    return (
      <DemoPage title='Picker'>
        <SlotColumnView padding={[0, 30, 0, 30]} slot={30}>
          <PickerItem values={picker1} onClick={this.openPicker1}>
            打开picker(单选)
          </PickerItem>
          <PickerItem values={picker2} onClick={this.openPicker2}>
            打开picker(多选)
          </PickerItem>
        </SlotColumnView>
      </DemoPage>
    )
  }
}
