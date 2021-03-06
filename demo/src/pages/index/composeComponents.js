import { h } from 'preact'
import Text from '@ruiyun/preact-text'
import { ColumnView, SlotColumnView } from '@ruiyun/preact-layout-suite'

import DemoLink from '../../components/DemoLink'

const DEMOS = [
  {
    name: '表单',
    route: 'formDemo',
  },
  {
    name: '图片上传',
    route: 'imageUploaderDemo',
  },
  {
    name: '全自动列表AutoList',
    route: 'autolistDemo',
  },
  {
    name: '滑动切换Swiper',
    route: 'swiperDemo',
  },
  {
    name: 'Scroller',
    route: 'scrollerDemo',
  },
  {
    name: 'Tab切换',
    route: 'tabsDemo',
  },
  {
    name: 'TabBar',
    route: 'tabbarDemo',
  },
  {
    name: '倒计时',
    route: 'countdownDemo',
  },
]

const ComposeComponents = () => (
  <ColumnView padding={[0, 30, 0, 30]}>
    <SlotColumnView slot={30} padding={[80, 50, 80, 50]}>
      <Text size={44}>复合组件</Text>
      <Text color='#A0A1A2' size={24}>
        复合组件是利用基础组件组合而成的，功能更复杂的组件。
      </Text>
    </SlotColumnView>
    {DEMOS.map((demo) => (
      <DemoLink demo={demo} key={demo.route} />
    ))}
  </ColumnView>
)
export default ComposeComponents
