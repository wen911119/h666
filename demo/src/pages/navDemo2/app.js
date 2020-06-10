import { h, Component } from 'preact'
import WithRouter from '@ruiyun/preact-m-router'
import { WithDialog } from '@ruiyun/preact-m-dialog'

import { RowView, SlotColumnView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import Icon from '@ruiyun/preact-icon'
import DemoPage from '../../components/DemoPage'

@WithDialog
@WithRouter
export default class NavDemo2 extends Component {
  goBack = () => {
    this.props.$prompt({
      title: '访客年龄',
      placeholder: '请输入年龄',
      btns: ['取消', '确定'],
      config: {
        btnsColor: ['#999'],
      },
      cb: this.goBackWithParams,
    })
  }

  goBackWithParams = (index, value) => {
    if (index === 1) {
      setTimeout(() => {
        this.props.$router.pop({ age: value })
      }, 300)
    }
  }

  goNext = () => {
    this.props.$router.push('navDemo3')
  }

  render() {
    return (
      <DemoPage title='Navigation2'>
        <SlotColumnView padding={[0, 30, 0, 30]} slot={20}>
          <RowView bgColor='#FFFFCC' height={200} padding={[0, 30, 0, 30]}>
            <Text color='#CCCCFF'>上一页传来的参数：</Text>
            <Text>{JSON.stringify(this.props.$router.params)}</Text>
          </RowView>
          <RowView
            hAlign='between'
            bgColor='#fff'
            height={100}
            padding={[0, 30, 0, 30]}
            onClick={this.goBack}
          >
            <Text>带参返回上一页</Text>
            <Icon name='icon-fanhui3' color='#919191' />
          </RowView>
          <RowView
            height={100}
            padding={[0, 30, 0, 30]}
            onClick={this.goNext}
            bgColor='#fff'
            hAlign='between'
            margin={[0, 0, 20, 0]}
          >
            <Text>去下一页体验唤醒事件</Text>
            <Icon name='icon-qianjin' color='#919191' />
          </RowView>
        </SlotColumnView>
      </DemoPage>
    )
  }
}
