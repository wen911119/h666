import { h, Component } from 'preact'
import Page from '@ruiyun/preact-m-page'
import { XCenterView, SlotColumnView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import { ScrollerWithLoadMore } from '@ruiyun/preact-m-scroller'

export default class ScrollerWithLoadMoreDemo extends Component {
  state = {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  }

  onLoadMore = (done) => {
    const length = this.state.list.length
    setTimeout(() => {
      this.setState(
        {
          list: this.state.list.concat([
            length + 1,
            length + 2,
            length + 3,
            length + 4,
            length + 5,
            length + 6,
            length + 7,
            length + 8,
            length + 9,
            length + 10,
          ]),
        },
        () => {
          done({
            success: Math.random() < 0.8, // 模拟报错
            nomore: length >= 40,
          })
        }
      )
    }, 2000)
  }

  render() {
    const { list } = this.state
    return (
      <Page>
        <Page.Content>
          <XCenterView height={200}>
            <Text color='#99CCCC' weight={400} size={34}>
              带加载更多的Scroller
            </Text>
          </XCenterView>
          <ScrollerWithLoadMore onLoadMore={this.onLoadMore}>
            <SlotColumnView slot={20} padding={[0, 30, 30, 30]}>
              {list.map((l) => (
                <XCenterView key={l} height={200} bgColor='#fff'>
                  <Text size={36}>{l}</Text>
                </XCenterView>
              ))}
            </SlotColumnView>
          </ScrollerWithLoadMore>
        </Page.Content>
      </Page>
    )
  }
}
