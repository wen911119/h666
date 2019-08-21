import { h, Component } from 'preact'
import { XCenterView, ColumnView, RowView } from '@ruiyun/preact-layout-suite'
import Swiper from '@ruiyun/preact-m-swiper'
import Button from '@ruiyun/preact-button'
import AutoList from '@ruiyun/preact-m-auto-list'
import Text from '@ruiyun/preact-text'
import Line from '@ruiyun/preact-line'
import Ajax from '@ruiyun/ajax'

const Item = props => {
  console.log('render-item', props.active)
  return (
    <XCenterView height={414}>
      <Button color='#f8584f' onClick={props.onClick} height={80} width={240}>
        回到第一张
      </Button>
    </XCenterView>
  )
}
const Item1 = props => {
  console.log('render-item-1', props.active)
  return (
    <XCenterView height={414}>
      <Button color='#f8584f' height={80} width={240}>
        {props.text}
      </Button>
    </XCenterView>
  )
}
export default class ScrollerDemo extends Component {
  state = {
    current: 0,
    text: '第一张',
    params: {
      keyword: ''
    }
  }
  onSwipe = index => {
    console.log('swiped===>', index)
    this.setState({ current: index })
  }
  doSwipe = () => {
    this.setState({ current: 0, text: '第一张2' })
  }
  fetchListData = async params => {
    const ret = await Ajax.get(
      'https://uapi.dev.quancheng-ec.com/rhea/hospitals',
      {
        params,
        headers: {
          loading: 'false',
          identifier: 'hrg-mp'
        }
      }
    )
    if (ret && ret.success) {
      return ret.result
    }
    return {
      data: [],
      pageInfo: {
        currentPage: params.pageNum
      }
    }
  }
  keyExtractor = item => item.hospitalId
  format = ret => {
    let res = {
      list: ret.data,
      pageInfo: {
        totalPage: Math.ceil(ret.pageInfo.total / ret.pageInfo.pageSize),
        currentPage: ret.pageInfo.currentPage
      }
    }
    return res
  }
  renderItem = item => (
    <div>
      <ColumnView padding={[0, 30, 0, 30]} bgColor='#fff'>
        <RowView height={88}>
          <Text color='#535353' size={28}>
            {item.name}
          </Text>
        </RowView>
        <Line />
      </ColumnView>
    </div>
  )
  render () {
    return (
      <Swiper onChange={this.onSwipe} activeIndex={this.state.current}>
        <Item1 text={this.state.text} />
        <AutoList
          pageSize={20}
          alias={{ pageNum: 'page', pageSize: 'page_size' }}
          params={this.state.params}
          fetchListData={this.fetchListData}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          format={this.format}
          ref={s => (this.list = s)}
          height='400px'
        />
        <Item onClick={this.doSwipe} />
      </Swiper>
    )
  }
}
