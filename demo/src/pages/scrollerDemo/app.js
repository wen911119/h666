import { h, Component } from 'preact'
import { ScrollerWithRefreshAndLoadMore } from '@ruiyun/preact-m-scroller'
import { XCenterView, ColumnView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import style from './app.css'

export default class ScrollerDemo extends Component {
  state = {
    // list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    list: [1, 2]
  }
  onLoadMore = async done => {
    const p = new Promise(resolve => {
      setTimeout(resolve, 2000)
    })
    await p
    let arr = []
    const oldList = this.state.list
    for (let l = oldList.length, i = l + 1; i <= l + 10; i++) {
      arr.push(i)
    }
    this.setState({
      list: Array.from(oldList).concat(arr)
    }, done)
  }
  render () {
    return (
      <div>
        {/* <XCenterView height={200}>
          <Text>啦啦啦啦啦啦</Text>
        </XCenterView> */}
        <ColumnView height='100%'>
          <XCenterView height={200}>
            <Text>啦啦啦啦啦啦</Text>
          </XCenterView>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <ScrollerWithRefreshAndLoadMore height='600px' onLoadMore={this.onLoadMore}>
              <div>
                {this.state.list.map(item => (
                  <XCenterView key={item} height={200} bgColor='#ccc'>
                    <Text>{item}</Text>
                  </XCenterView>
                ))}
              </div>
            </ScrollerWithRefreshAndLoadMore>
          </div>
        </ColumnView>
        {/* <ScrollerWithRefreshAndLoadMore onLoadMore={this.onLoadMore}>
          <div>
            {this.state.list.map(item => (
              <XCenterView key={item} height={200}>
                <Text>{item}</Text>
              </XCenterView>
            ))}
          </div>
        </ScrollerWithRefreshAndLoadMore> */}
      </div>
    )
  }
}
