import { h, Component } from 'preact'
import Scroller, {
  ScrollerWithRefreshAndLoadMore,
  ScrollerWithRefresh,
  ScrollerWithLoadMore,
} from '@ruiyun/preact-m-scroller'
import { XCenterView, ColumnView, RowView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'

import DemoPage from '../../components/DemoPage'

export default class ScrollerDemo extends Component {
  state = {
    list1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    list2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    list3: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    list4: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    list3nomore: false,
    list4nomore: false,
    list3loading: false,
    list4loading: false,
  }
  onRefresh = (done) => {
    setTimeout(() => {
      this.setState(
        {
          list2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        done
      )
    }, 1500)
  }
  onLoadMore = () => {
    this.setState({
      list3loading: true
    })
    let newList = Array.from(this.state.list3)
    for (let l = newList.length, j = l + 1; j <= l + 10; j++) {
      newList.push(j)
    }
    const isNoMore = newList.length >= 50
    setTimeout(() => {
      this.setState({
        list3: newList,
        list3nomore: isNoMore,
        list3loading: false
      })
    }, 1500)
  }
  onRefreshForList4 = (done) => {
    setTimeout(() => {
      this.setState(
        {
          list4: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          list4nomore: false
        },
        done
      )
    }, 1500)
  }
  onLoadMoreForList4 = () => {
    this.setState({
      list4loading: true
    })
    let newList = Array.from(this.state.list4)
    for (let l = newList.length, j = l + 1; j <= l + 10; j++) {
      newList.push(j)
    }
    const isNoMore = newList.length >= 50
    setTimeout(() => {
      this.setState({
        list4: newList,
        list4nomore: isNoMore,
        list4loading: false
      })
    }, 1500)
  }
  render() {
    const {
      list1,
      list2,
      list3,
      list4,
      list3nomore,
      list4nomore,
      list3loading,
      list4loading,
    } = this.state
    return (
      <DemoPage title='Scroller'>
        <ColumnView padding={[0, 30, 0, 30]}>
          <XCenterView height={100}>
            <Text size={28}>固定高度(300px)的默认Scroller</Text>
          </XCenterView>
          <Scroller height='300px'>
            {list1.map((item) => (
              <RowView
                key={item}
                height={200}
                bgColor='#99CCCC'
                hAlign='center'
                margin={[0, 0, 30, 0]}
              >
                <Text color='#fff'>item-{item}</Text>
              </RowView>
            ))}
          </Scroller>
          <RowView height={100} />
          <XCenterView height={100}>
            <Text size={28}>带下拉刷新的Scroller</Text>
          </XCenterView>
          <ScrollerWithRefresh height='300px' onRefresh={this.onRefresh}>
            {list2.map((item) => (
              <RowView
                key={item}
                height={200}
                bgColor='#99CC66'
                hAlign='center'
                margin={[0, 0, 30, 0]}
              >
                <Text color='#fff'>item-{item}</Text>
              </RowView>
            ))}
          </ScrollerWithRefresh>
          <RowView height={100} />
          <XCenterView height={100}>
            <Text size={28}>带加载更多的Scroller</Text>
          </XCenterView>
          <ScrollerWithLoadMore
            height='300px'
            onLoadMore={this.onLoadMore}
            nomore={list3nomore}
            loading={list3loading}
          >
            {list3.map((item) => (
              <RowView
                key={item}
                height={200}
                bgColor='#99CCFF'
                hAlign='center'
                margin={[0, 0, 30, 0]}
              >
                <Text color='#fff'>item-{item}</Text>
              </RowView>
            ))}
          </ScrollerWithLoadMore>
          <RowView height={100} />
          <XCenterView height={100}>
            <Text size={28}>带下拉刷新和加载更多的Scroller</Text>
          </XCenterView>
          <ScrollerWithRefreshAndLoadMore
            height='300px'
            onRefresh={this.onRefreshForList4}
            onLoadMore={this.onLoadMoreForList4}
            nomore={list4nomore}
            loading={list4loading}
          >
            {list4.map((item) => (
              <RowView
                key={item}
                height={200}
                bgColor='#FFCC99'
                hAlign='center'
                margin={[0, 0, 30, 0]}
              >
                <Text color='#fff'>item-{item}</Text>
              </RowView>
            ))}
          </ScrollerWithRefreshAndLoadMore>
          <RowView height={300} />
        </ColumnView>
      </DemoPage>
    )
  }
}
