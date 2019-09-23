import { h } from 'preact'
import Switch from '@ruiyun/preact-switch'
import { SlotColumnView, SlotRowView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'

import DemoPage from '../../components/DemoPage'

const SwitchDemo = () => (
  <DemoPage title='Switch'>
    <SlotColumnView
      bgColor='#fff'
      margin={[30, 30, 30, 30]}
      hAlign='center'
      padding={[50, 0, 50, 0]}
      slot={30}
    >
      <SlotRowView slot={30}>
        <Text>默认</Text>
        <Switch />
      </SlotRowView>
      <SlotRowView slot={30}>
        <Text>自定义大小</Text>
        <Switch size={150} />
      </SlotRowView>
      <SlotRowView slot={30}>
        <Text>自定义颜色</Text>
        <Switch color='#fc9153' value />
      </SlotRowView>
      <SlotRowView slot={30}>
        <Text>自定义颜色+disabled</Text>
        <Switch color='#fc9153' value disabled />
      </SlotRowView>
    </SlotColumnView>
  </DemoPage>
)

export default SwitchDemo
