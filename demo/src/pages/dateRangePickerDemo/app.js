import { h, Component } from 'preact'
import { WithDateRangePicker } from '@ruiyun/preact-m-date-range-picker'
import dayjs from 'dayjs'

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
      min: dayjs().subtract(30, 'day').format('YYYY/MM/DD'),
      max: dayjs().add(30, 'day').format('YYYY/MM/DD'),
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
