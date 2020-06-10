import { h, Component } from 'preact'
import { WithDateRangePicker } from '@ruiyun/preact-m-date-range-picker'
import dayjs from 'dayjs'

import { XCenterView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'

@WithDateRangePicker
export default class DatePickerDemo extends Component {
  state = {
    date: undefined,
  }

  onChose = (date) => {
    this.setState({
      date,
    })
  }

  open = () => {
    const { date } = this.state
    this.props.$dateRangePicker.show({
      start: date,
      min: dayjs().subtract(30, 'day').format('YYYY/MM/DD'),
      max: dayjs().add(30, 'day').format('YYYY/MM/DD'),
      cb: this.onChose,
      single: true,
    })
  }

  render() {
    const { date } = this.state
    return (
      <XCenterView height={300} onClick={this.open}>
        <Text>{date || '日期'}</Text>
      </XCenterView>
    )
  }
}
