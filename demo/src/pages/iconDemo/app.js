import { h } from 'preact'
import {
  XCenterView,
  SlotColumnView,
  SlotRowView
} from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import Icon from '@ruiyun/preact-icon'

import DemoPage from '../../components/DemoPage'

const IconDemo = () => (
  <DemoPage title='Icon'>
    <XCenterView>
      <Text size={26} color='#ccc'>
        #Icon组件需要先配置再使用
      </Text>
    </XCenterView>
    <SlotColumnView
      bgColor='#fff'
      vAlign='center'
      hAlign='center'
      padding={[50, 0, 50, 0]}
      margin={[30, 30, 30, 30]}
      slot={30}
    >
      <SlotRowView slot={20}>
        <Text size={24} color='#919191'>
          Icon默认 =&gt;
        </Text>
        <Icon name='icon-zhibiao2' />
      </SlotRowView>
      <SlotRowView slot={20}>
        <Text size={24} color='#919191'>
          Icon加大 =&gt;
        </Text>
        <Icon size={50} name='icon-zhibiao2' />
      </SlotRowView>
      <SlotRowView slot={20}>
        <Text size={24} color='#919191'>
          Icon加大变色 =&gt;
        </Text>
        <Icon color='#04be02' size={50} name='icon-zhibiao2' />
      </SlotRowView>
    </SlotColumnView>
  </DemoPage>
)

export default IconDemo
