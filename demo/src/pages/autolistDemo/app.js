import { h, Component } from 'preact'
import AutoList, { AutoListWithRefresh } from '@ruiyun/preact-m-auto-list'
import {
  ColumnView,
  RowView,
  SlotColumnView,
  SlotRowView,
} from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import Line from '@ruiyun/preact-line'
import Ajax from '@ruiyun/ajax'
import Icon from '@ruiyun/preact-icon'
import SearchBar from '@ruiyun/preact-m-search-bar'
import { WithDialog } from '@ruiyun/preact-m-dialog'
import Image from '@ruiyun/preact-image'
import classNames from './app.css'

@WithDialog
export default class AutolistDemo extends Component {
  state = {
    params: {
      keyword: '',
    },
    extraData: {}
  }
  fetchListData = async ({ pageSize, pageNum, keyword, ...otherProps }) => {
    const ret = await Ajax.get(
      'https://api.ruiyun2015.com/banggo/search/get-search-goods/a_a_a_a_a_a_a_a_a_a_a_a.shtml',
      {
        params: {
          currentPage: pageNum,
          pageSize,
          word: keyword,
          ...otherProps,
        },
        headers: {
          loading: 'false',
        },
      }
    )
    if (ret && ret.code === 1 && Math.random() < 0.7) {
      return ret.data
    }
    throw new Error('获取列表数据出错')
  }
  keyExtractor = (item) => item.productId
  format = (ret) => {
    let res
    if (ret.length === 0) {
      res = {
        list: [],
        pageInfo: {
          totalPage: 0,
          currentPage: 1
        }
      }
    } else {
      res = {
        list: ret.list,
        pageInfo: {
          totalPage: Math.ceil(ret.fpage.total / ret.fpage.pageSize),
          currentPage: ret.fpage.currentPage,
        },
      }
    }    
    return res
  }
  onSearch = (keyword) => {
    this.setState({
      params: Object.assign({}, this.state.params, {
        keyword,
      }),
    })
  }
  backToTop = () => {
    this.list.scrollTo(0, true)
  }
  renderItem = (item, extraData) => {
    console.log(extraData, 3333)
    return (
      <div>
        <SlotRowView padding={[30, 30, 30, 30]} bgColor='#fff' slot={20} bgColor={extraData && extraData.checked ? '#f8584f': '#fff'}>
          <Image width={140} height={140} src={item.imgUrl_300_300.replace('pic.banggo.com', 'api.ruiyun2015.com/banggo-pic')} />
          <SlotColumnView slot={6}>
            <Text size={28} color='#f8584f'>
              {(item.discount * 1) / 10}折
            </Text>
            <Text>{item.brandName}</Text>
  
            <Text size={32}>{item.productName}</Text>
            <Text>{item.salesPrice}</Text>
          </SlotColumnView>
        </SlotRowView>
        <Line />
      </div>
    )
  }
  onItemClick = (item) => {
    // this.props.$alert({
    //   title: '你选中了',
    //   content: `${item.productName}`,
    //   btn: '确定',
    // })
    this.setState({
      extraData: Object.assign({}, this.state.extraData, {
        [item.productId]: {
          checked: true
        }
      })
    })
  }
  componentDidMount() {
    // this.props.$alert({
    //   title: '自动列表',
    //   content:
    //     'AutoList是通过高阶组件抽象列表常用逻辑,然后拼装组合实现的UI无关的高级列表组件。使用时只要简单配置就可以完成一个全功能的列表开发。包括下拉刷新、加载分页、筛选(搜索)。并且对点击事件绑定和rerender做了优化。',
    //   btn: '了解了'
    // })
  }
  render() {
    const { params, extraData } = this.state
    return (
      <ColumnView height='100%'>
        <SearchBar
          bgColor='#eaeaea'
          renderInputLeft={() => <Icon name='icon-sousuo' color='#9f9f9f' />}
          onTextInput={this.onSearch}
          placeholder='请输入关键字搜索'
          textSize={26}
        />
        <Text
          className={classNames.backtotop}
          color='#fff'
          size={24}
          onClick={this.backToTop}
        >
          TOP
        </Text>
        <AutoListWithRefresh
          pageSize={20}
          params={params}
          fetchListData={this.fetchListData}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          format={this.format}
          ref={(s) => (this.list = s)}
          itemClickHandler={this.onItemClick}
          extraData={extraData}
        />
      </ColumnView>
    )
  }
}
