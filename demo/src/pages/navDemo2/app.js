import { h, Component } from 'preact'
import WithNav from '@ruiyun/preact-m-nav'
import { WithDialog } from '@ruiyun/preact-m-dialog'

import {
  RowView,
  SlotColumnView
} from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import Icon from '@ruiyun/preact-icon'
import Indicator from 'h5-indicator'
import DemoPage from '../../components/DemoPage'

@WithDialog
@WithNav
export default class NavDemo2 extends Component {
  goBack = () => {
    this.props.$prompt({
      title: '访客年龄',
      placeholder: '请输入年龄',
      btns: ['取消', '确定'],
      config: {
        btnsColor: ['#999']
      },
      cb: this.goBackWithParams
    })
  }
  goBackWithParams = (index, value) => {
    if (index === 1) {
      setTimeout(() => {
        this.props.$nav.pop({ age: value })
      }, 300)
    }
  }
  componentDidMount () {
    this.props.$nav.onWakeUp(() => {
      Indicator.toast('页面唤醒', {
        timeout: 3000
      })
    })
  }
  render () {
    return (
      <DemoPage title='Navigation2'>
        <SlotColumnView padding={[0, 30, 0, 30]} slot={20}>
          <RowView padding={[0, 50, 0, 50]}>
            <Text color='#996699' size={26} style={{ textAlign: 'center' }}>
              可以尝试把应用(微信或浏览器)切后台再回来，体验onWakeUp唤醒事件
            </Text>
          </RowView>
          <RowView bgColor='#FFFFCC' height={200} padding={[0, 30, 0, 30]}>
            <Text color='#CCCCFF'>上一页传来的参数：</Text>
            <Text>{JSON.stringify(this.props.$nav.params)}</Text>
          </RowView>
          <RowView
            hAlign='between'
            bgColor='#fff'
            height={100}
            padding={[0, 30, 0, 30]}
            onClick={this.goBack}
          >
            <Text>带参返回上一页</Text>
            <Icon name='icon-fanhui3' color='#919191' />
          </RowView>
        </SlotColumnView>
      </DemoPage>
    )
  }
}
