import { h, Component } from 'preact'
import { WithPicker } from '@ruiyun/preact-m-picker'

const options = ['安徽', '上海', '深圳', '重庆', '北京', '四川', '湖南']

@WithPicker
export default class PickerDemo extends Component {
  state = {
    name: '打开picker',
    picker1: [],
    picker2: []
  }
  openPicker1 = () => {
    this.props
      .$picker({
        title: '请选择籍贯',
        options,
        values: this.state.picker1
      })
      .then(indexs => {
        this.setState({
          picker1: indexs
        })
      })
  }
  openPicker2 = () => {
    this.props
      .$picker({
        title: '请选择喜欢的城市',
        options,
        mode: 3,
        values: this.state.picker2
      })
      .then(indexs => {
        this.setState({
          picker2: indexs
        })
      })
  }
  render () {
    const { picker1, picker2 } = this.state
    return (
      <div>
        PickerDemo
        <div onClick={this.openPicker1}>
          {picker1 && picker1.length
            ? picker1.map(i => options[i]).join(',')
            : '请选择籍贯'}
        </div>
        <div onClick={this.openPicker2}>
          {picker2 && picker2.length
            ? picker2.map(i => options[i]).join(',')
            : '请选择喜欢的城市（多选）'}
        </div>
      </div>
    )
  }
}
