import { h } from 'preact'
import Text from '@ruiyun/preact-text'
import { ColumnView, SlotColumnView } from '@ruiyun/preact-layout-suite'

import DemoLink from '../../components/DemoLink'
const DEMOS = [
  {
    name: '访问信息',
    route: 'analytics',
  },
  {
    name: '加载性能',
    route: 'timing',
  },
  {
    name: '错误日志',
    route: 'errorLog',
  },
  {
    name: '关于',
    route: 'appInfo',
    action: 'pushToNative',
  },
]
const Metric = () => (
  <ColumnView padding={[0, 30, 0, 30]}>
    <SlotColumnView slot={30} padding={[80, 50, 80, 50]}>
      <Text size={44}>指标</Text>
      <Text color='#A0A1A2' size={24}>
        h666默认会收集以下指标
      </Text>
    </SlotColumnView>
    {DEMOS.map((demo) => (
      <DemoLink demo={demo} key={demo.route} action={demo.action} />
    ))}
    <Text>
      ServiceWorker is {'serviceWorker' in navigator ? 'ok' : 'not ok'}
    </Text>
  </ColumnView>
)

export default Metric
