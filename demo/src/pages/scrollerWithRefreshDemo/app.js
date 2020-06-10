import { h, Component } from 'preact'
import Page from '@ruiyun/preact-m-page'
import { XCenterView, SlotColumnView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import { ScrollerWithRefresh } from '@ruiyun/preact-m-scroller'

export default class ScrollerWithRefreshDemo extends Component {
  state = {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  }

  onRefresh = (done) => {
    setTimeout(() => {
      this.setState(
        {
          list: this.state.list.map((l) => l + 1),
        },
        done
      )
    }, 2000)
  }

  render() {
    const { list } = this.state
    return (
      <Page>
        <Page.Content>
          <XCenterView height={200}>
            <Text color='#99CC66' weight={400} size={34}>
              带下拉刷新的Scroller
            </Text>
          </XCenterView>
          <ScrollerWithRefresh onRefresh={this.onRefresh}>
            <SlotColumnView slot={20} padding={[0, 30, 30, 30]}>
              {list.map((l) => (
                <XCenterView key={l} height={200} bgColor='#fff'>
                  <Text size={36}>{l}</Text>
                </XCenterView>
              ))}
            </SlotColumnView>
          </ScrollerWithRefresh>
        </Page.Content>
      </Page>
    )
  }
}
