import { h, Component } from 'preact'
import Text from '@ruiyun/preact-text'
import { ColumnView, SlotColumnView } from '@ruiyun/preact-layout-suite'
import Icon from '@ruiyun/preact-icon'

import DemoLink from '../../components/DemoLink'

export default class BaseComponents extends Component {
  state = {
    demos: [
      {
        name: '按钮',
        route: 'buttonDemo'
      },
      {
        name: '开关',
        route: 'switchDemo'
      }
    ]
  }
  render () {
    return (
      <ColumnView padding={[0, 30, 0, 30]}>
        <SlotColumnView
          slot={34}
          hAlign='center'
          vAlign='center'
          height={340}
          padding={[0, 80, 0, 80]}
        >
          <Icon name='icon-zujianku' color='#D2D4D5' size={80} />
          <Text color='#A0A1A2' size={26}>
            以下将展示h666解决方案的能力，其中组件的样式仅供参考，开发者可根据自身需求自定义组件样式,具体属性参见文档。
          </Text>
        </SlotColumnView>
        {this.state.demos.map(demo => (
          <DemoLink demo={demo} key={demo.route} />
        ))}
      </ColumnView>
    )
  }
}
