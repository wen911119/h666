import { h, Component } from 'preact'
import Button from '@ruiyun/preact-button'
import { SlotColumnView } from '@ruiyun/preact-layout-suite'
import Indicator from 'h5-indicator'

import DemoPage from '../../components/DemoPage'

export default class IndicatorDemo extends Component {
  showToast = () => {
    Indicator.toast('提交成功')
  }

  showLoading = () => {
    const lid = Indicator.showLoading()
    setTimeout(() => {
      Indicator.hideLoading(lid)
    }, 3000)
  }

  render() {
    return (
      <DemoPage title='Indicator'>
        <SlotColumnView hAlign='center' slot={30}>
          <Button
            onClick={this.showLoading}
            color='#99CC33'
            width={600}
            height={80}
          >
            loading
          </Button>
          <Button
            onClick={this.showToast}
            color='#99CCFF'
            width={600}
            height={80}
          >
            toast
          </Button>
        </SlotColumnView>
      </DemoPage>
    )
  }
}
