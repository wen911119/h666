import { h, Component } from 'preact'
import { WithDateRangePicker } from '@ruiyun/preact-m-date-range-picker'

import { XCenterView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'

@WithDateRangePicker
export default class DateRangePickerDemo extends Component {
  state = {
    start: undefined,
    end: undefined
  }
  onChose = (start, end) => {
    this.setState({
      start,
      end
    })
  }
  open = () => {
    const { start, end } = this.state
    this.props.$dateRangePicker.show({
      start,
      end,
      min: '2015/04/01',
      max: '2019/11/24',
      cb: this.onChose
    })
  }
  render() {
    const { start, end } = this.state
    return (
      <XCenterView height={300} onClick={this.open}>
        <Text>{start && end ? `${start}-${end}` : '日期区间'}</Text>
      </XCenterView>
    )
  }
}
