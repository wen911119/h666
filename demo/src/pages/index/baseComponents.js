import { h, Component } from 'preact'
import Text from '@ruiyun/preact-text'
import { ColumnView, SlotColumnView } from '@ruiyun/preact-layout-suite'
import Icon from '@ruiyun/preact-icon'
import Scroller from '@ruiyun/preact-m-scroller'

import DemoLink from '../../components/DemoLink'

export default class BaseComponents extends Component {
  state = {
    demos: [
      {
        name: '布局套件2',
        route: 'layoutDemo'
      },
      {
        name: '图片',
        route: 'imageDemo'
      },
      {
        name: '输入框',
        route: 'inputDemo'
      },
      {
        name: '开关',
        route: 'switchDemo'
      },
      {
        name: '图标',
        route: 'iconDemo'
      },
      {
        name: '文本',
        route: 'textDemo'
      },
      {
        name: '按钮',
        route: 'buttonDemo'
      },
      {
        name: '线条',
        route: 'lineDemo'
      },
      {
        name: '加载动画',
        route: 'loadingDemo'
      }
    ]
  }
  render() {
    return (
      <Scroller>
        <ColumnView padding={[0, 30, 0, 30]}>
          <SlotColumnView
            slot={34}
            hAlign='center'
            vAlign='center'
            padding={[80, 50, 80, 50]}
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
      </Scroller>
    )
  }
}
