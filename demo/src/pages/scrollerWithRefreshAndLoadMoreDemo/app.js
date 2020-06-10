import { h, Component } from 'preact'
import Page from '@ruiyun/preact-m-page'
import { XCenterView, SlotColumnView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import { ScrollerWithRefreshAndLoadMore } from '@ruiyun/preact-m-scroller'

const ORIGIN_LIST_DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default class ScrollerWithRefreshAndLoadMoreDemo extends Component {
  state = {
    list: ORIGIN_LIST_DATA,
  }

  onLoadMore = (done) => {
    const last = this.state.list[this.state.list.length - 1]
    setTimeout(() => {
      this.setState(
        {
          list: this.state.list.concat([
            last + 1,
            last + 2,
            last + 3,
            last + 4,
            last + 5,
            last + 6,
            last + 7,
            last + 8,
            last + 9,
            last + 10,
          ]),
        },
        () => {
          done({
            success: Math.random() < 0.8, // 模拟报错
            nomore: last >= 50,
          })
        }
      )
    }, 2000)
  }

  onRefresh = (done) => {
    setTimeout(() => {
      this.setState(
        {
          list:
            this.state.list.length > 10
              ? ORIGIN_LIST_DATA
              : this.state.list.map((l) => l + 1),
        },
        () => done({ success: true })
      )
    }, 2000)
  }

  render() {
    const { list } = this.state
    return (
      <Page>
        <Page.Content>
          <XCenterView height={200}>
            <Text color='#CC6699' weight={400} size={34}>
              带下拉刷新和加载更多的Scroller
            </Text>
          </XCenterView>
          <ScrollerWithRefreshAndLoadMore
            onLoadMore={this.onLoadMore}
            onRefresh={this.onRefresh}
          >
            <SlotColumnView slot={20} padding={[0, 30, 30, 30]}>
              {list.map((l) => (
                <XCenterView key={l} height={200} bgColor='#fff'>
                  <Text size={36}>{l}</Text>
                </XCenterView>
              ))}
            </SlotColumnView>
          </ScrollerWithRefreshAndLoadMore>
        </Page.Content>
      </Page>
    )
  }
}
