import { h } from 'preact'
import {
  XCenterView,
  RowView,
  SlotColumnView,
} from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import Tabs from '@ruiyun/preact-m-tabs'
import { useState } from 'preact/hooks'
import Switch from '@ruiyun/preact-switch'

import DemoPage from '../../components/DemoPage'

const ShadowUpdater = ({ onChange, value }) => (
  <RowView>
    <Text color='#919191' size={26}>
      shadow : &nbsp;
    </Text>
    <Switch size={80} value={value} onChange={onChange} />
  </RowView>
)

const TabItem = ({ children }) => (
  <XCenterView height={600}>
    <Text color='#FFCCCC'>{children}</Text>
  </XCenterView>
)

const TabsDemo = () => {
  const [tabsConfig, updateConfig] = useState({
    titles: ['全部', '待付款', '处理中'],
    titleSize: 28,
    titleColor: '#919191',
    activeTitleColor: '#f8584f',
    indicatorColor: '#f8584f',
    headerHeight: 100,
    shadow: true,
  })
  const updateConfigOf = (attribute) => (v) =>
    updateConfig((oldConfig) =>
      Object.assign({}, oldConfig, { [attribute]: v })
    )
  return (
    <DemoPage title='Tabs'>
      <SlotColumnView slot={20} padding={[30, 30, 30, 30]}>
        <ShadowUpdater
          value={tabsConfig.shadow}
          onChange={updateConfigOf('shadow')}
        />
      </SlotColumnView>

      <Tabs {...tabsConfig}>
        <TabItem>全部订单(滑动切换)</TabItem>
        <TabItem>待付款的订单</TabItem>
        <TabItem>处理中的订单</TabItem>
      </Tabs>
    </DemoPage>
  )
}

export default TabsDemo
