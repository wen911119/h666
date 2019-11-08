import { h, Component } from 'preact'
import Text from '@ruiyun/preact-text'
import { WithDialog } from '@ruiyun/preact-m-dialog'
import Indicator from 'h5-indicator'

import { RowView, SlotColumnView } from '@ruiyun/preact-layout-suite'
import WithNav from '@ruiyun/preact-m-nav'
import Icon from '@ruiyun/preact-icon'

import DemoPage from '../../components/DemoPage'

@WithDialog
@WithNav
export default class NavDemo extends Component {
  state = {
    nextPageParams: {}
  }
  onPrompt = (index, value) => {
    if (index === 1) {
      setTimeout(() => {
        this.props.$nav.push('navDemo2', { name: value })
      }, 300)
    }
  }
  goNext = () => {
    this.props.$prompt({
      title: '访客姓名2',
      placeholder: '请输入姓名',
      btns: ['取消', '确定'],
      config: {
        btnsColor: ['#999']
      },
      cb: this.onPrompt
    })
    // eslint-disable-next-line
    // plus.gallery.pick()
  }
  componentDidMount () {
    this.props.$nav.onPop(params => {
      this.setState({ nextPageParams: params })
    })
    this.props.$nav.onWakeUp(() => {
      Indicator.toast('onWakeUp')
    })
  }
  render () {
    const { nextPageParams } = this.state
    return (
      <DemoPage title='Navigation'>
        <RowView padding={[0, 50, 0, 50]}>
          <Text color='#CC9966' size={26} style={{ textAlign: 'center' }}>
            相较于小程序原生导航有所增强，增加了路由传参，带参返回，页面唤醒和页面休眠生命周期4
          </Text>
        </RowView>
        <SlotColumnView padding={[100, 30, 100, 30]} slot={30}>
          <RowView
            height={100}
            padding={[0, 30, 0, 30]}
            onClick={this.goNext}
            bgColor='#fff'
            hAlign='between'
            margin={[0, 0, 20, 0]}
          >
            <Text>带参跳转到下一页</Text>
            <Icon name='icon-qianjin' color='#919191' />
          </RowView>
          <RowView bgColor='#FFFFCC' height={200} padding={[0, 30, 0, 30]}>
            <Text color='#919191'>下一页返回的参数：</Text>
            <Text>{JSON.stringify(nextPageParams)}</Text>
          </RowView>
        </SlotColumnView>
      </DemoPage>
    )
  }
}
