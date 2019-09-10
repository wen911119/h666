import { h, Component } from 'preact'
import Text from '@ruiyun/preact-text'
import { ColumnView, SlotColumnView } from '@ruiyun/preact-layout-suite'

import DemoLink from '../../components/DemoLink'

export default class ComposeComponents extends Component {
  state = {
    demos: [
      {
        name: '树状选择器',
        route: 'treepickerDemo'
      },
      {
        name: '全自动列表',
        route: 'autolistDemo'
      }
    ]
  }
  render () {
    return (
      <ColumnView padding={[0, 30, 0, 30]}>
        <SlotColumnView slot={30} height={340} padding={[80, 50, 80, 50]}>
          <Text size={44}>复合组件</Text>
          <Text color='#A0A1A2' size={24}>
            复合组件是利用基础组件拼装而成的功能更强大的组件。比如Tabs组件就是由Text组件、Layout套件、Swiper组件拼装而成。
          </Text>
        </SlotColumnView>
        {this.state.demos.map(demo => (
          <DemoLink demo={demo} key={demo.route} />
        ))}
      </ColumnView>
    )
  }
}
