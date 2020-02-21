import { h, Component } from 'preact'
import Text from '@ruiyun/preact-text'
import { ColumnView, SlotColumnView } from '@ruiyun/preact-layout-suite'
import Scroller from '@ruiyun/preact-m-scroller'

import DemoLink from '../../components/DemoLink'

export default class DecoratorComponents extends Component {
  state = {
    demos: [
      {
        name: '路由',
        route: 'navDemo'
      },
      {
        name: '图片预览',
        route: 'imagePreviewDemo'
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
        name: '日期区间选择器dateRangePicker',
        route: 'dateRangePickerDemo'
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
        name: 'ActionSheet',
        route: 'actionsheetDemo'
      },
      {
        name: '搜索选择器SearchPicker',
        route: 'searchPickerDemo'
      },
      {
        name: '指示器Indicator',
        route: 'indicatorDemo'
      }
    ]
  }
  render() {
    return (
      <Scroller>
        <ColumnView padding={[0, 30, 0, 30]}>
          <SlotColumnView slot={30} padding={[80, 50, 80, 50]}>
            <Text size={44}>API</Text>
            <Text color='#A0A1A2' size={24}>
              有些组件更适合用api的方式调用，比如弹层类的组件,声明式this.props.$alert()肯定比用一个开关变量去控制Alert组件来的更方便。h666使用装饰器为组件注入props来实现组件的api调用,既自然又保证了纯洁性。
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
