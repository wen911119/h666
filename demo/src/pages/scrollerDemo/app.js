import { h, Component } from 'preact'
import { ScrollerWithPreventBounce } from '@ruiyun/preact-m-scroller'
import { WithModal } from '@ruiyun/preact-modal'
import WithRouter from '@ruiyun/preact-m-router'
import {
  XCenterView,
  ColumnView,
  SlotColumnView,
} from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import Button from '@ruiyun/preact-button'

import DemoPage from '../../components/DemoPage'

@WithModal
@WithRouter
export default class ScrollerDemo extends Component {
  openModal = () => {
    this.props.$modal.show({
      content: () => (
        <ColumnView bgColor='#fff' padding={[30, 0, 30, 0]}>
          <ScrollerWithPreventBounce height='300px'>
            <SlotColumnView slot={20} padding={[0, 30, 0, 30]}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <XCenterView key={item} height={200} bgColor='#99CC33'>
                  <Text color='#fff'>item-{item}</Text>
                </XCenterView>
              ))}
            </SlotColumnView>
          </ScrollerWithPreventBounce>
        </ColumnView>
      ),
      position: 'bottom',
      allowContentTouchMove: true,
    })
  }

  goto = (path) => {
    this.props.$router.push(path)
  }

  render() {
    return (
      <DemoPage title='Scroller'>
        <SlotColumnView hAlign='center' slot={30}>
          <Button
            onClick={this.openModal}
            color='#99CC33'
            width={600}
            height={80}
          >
            解决滚动穿透的Scroller
          </Button>
          <Button
            onClick={() => this.goto('scrollerWithRefreshDemo')}
            color='#99CCFF'
            width={600}
            height={80}
          >
            下拉刷新的Scroller
          </Button>
          <Button
            onClick={() => this.goto('scrollerWithLoadMoreDemo')}
            color='#99CCCC'
            width={600}
            height={80}
          >
            加载更多的Scroller
          </Button>
          <Button
            onClick={() => this.goto('scrollerWithRefreshAndLoadMoreDemo')}
            color='#CC6699'
            width={600}
            height={80}
          >
            下拉刷新和加载更多
          </Button>
        </SlotColumnView>
      </DemoPage>
    )
  }
}
