import { h, Component } from 'preact'
import Text from '@ruiyun/preact-text'
import { ColumnView, SlotColumnView } from '@ruiyun/preact-layout-suite'
import Scroller from '@ruiyun/preact-m-scroller'

import DemoLink from '../../components/DemoLink'

export default class DecoratorComponents extends Component {
  state = {
    demos: [
      {
        name: 'ActionSheet',
        route: 'actionsheetDemo'
      },
      {
        name: '对话框Dialog',
        route: 'dialogDemo'
      },
      {
        name: '模态框Modal',
        route: 'modalDemo'
      },
      {
        name: '选择器Picker',
        route: 'pickerDemo'
      },
      {
        name: '树状选择器TreePicker',
        route: 'treepickerDemo'
      },
      {
        name: '搜索选择器SearchPicker',
        route: 'searchPickerDemo'
      }
    ]
  }
  render () {
    return (
      <Scroller height='flex1'>
        <ColumnView padding={[0, 30, 0, 30]}>
          <SlotColumnView slot={30} padding={[80, 50, 80, 50]}>
            <Text size={44}>装饰器</Text>
            <Text color='#A0A1A2' size={24}>
              有些组件更适合用api的方式调用，比如弹层类的组件,声明式this.pros.$alert()肯定比用一个开关变量去控制Alert组件来的更方便。为了在(P)react内实现api调用但同时保证纯洁性，我们引入了装饰器。
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
