import { h, Component } from 'preact'
import { RowView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import WithNav from '@ruiyun/preact-m-nav'
import Indicator from 'h5-indicator'
import Icon from '@ruiyun/preact-icon'

import DemoPage from '../../components/DemoPage'

@WithNav
export default class NavDemo3 extends Component {
  goRoot = () => {
    this.props.$nav.backTo('navDemo')
  }
  componentDidMount () {
    this.props.$nav.onWakeUp(() => {
      Indicator.toast('页面唤醒', {
        timeout: 2500
      })
    })
  }
  render () {
    return (
      <DemoPage title='Navigation2'>
        <RowView padding={[0, 50, 50, 50]}>
          <Text color='#996699' size={26} style={{ textAlign: 'center' }}>
            可以尝试把应用(微信或浏览器)切后台再回来，体验onWakeUp唤醒事件
          </Text>
        </RowView>
        <RowView
          hAlign='between'
          bgColor='#fff'
          height={100}
          padding={[0, 30, 0, 30]}
          margin={[30, 30, 30, 30]}
          onClick={this.goRoot}
        >
          <Text>返回第一个导航页</Text>
          <Icon name='icon-fanhui4' color='#919191' size={44} />
        </RowView>
      </DemoPage>
    )
  }
}
