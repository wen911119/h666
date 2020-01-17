import { h, Component } from 'preact'
import AutoList from '@ruiyun/preact-m-auto-list'
import { ColumnView, RowView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import Line from '@ruiyun/preact-line'
import Ajax from '@ruiyun/ajax'
import Icon from '@ruiyun/preact-icon'
import SearchBar from '@ruiyun/preact-m-search-bar'
import { WithDialog } from '@ruiyun/preact-m-dialog'
import classNames from './app.css'

@WithDialog
export default class AutolistDemo extends Component {
  state = {
    params: {
      keyword: ''
    }
  }
  fetchListData = async ({ pageSize, pageNum, ...otherProps }) => {
    const ret = await Ajax.get(
      'https://uapi.dev.quancheng-ec.com/rhea/hospitals',
      {
        params: {
          page: pageNum,
          page_size: pageSize,
          ...otherProps
        },
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
        currentPage: pageNum
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
  onSearch = keyword => {
    this.setState({
      params: Object.assign({}, this.state.params, {
        keyword
      })
    })
  }
  backToTop = () => {
    this.list.scrollTo(0, true)
  }
  renderItem = item => (
    <ColumnView padding={[0, 30, 0, 30]} bgColor='#fff'>
      <RowView height={88}>
        <Text color='#535353' size={28}>
          {item.name}
        </Text>
      </RowView>
      <Line />
    </ColumnView>
  )
  onItemClick = item => {
    this.props.$alert({
      title: '你选中了',
      content: `${item.name}`,
      btn: '确定'
    })
  }
  componentDidMount() {
    this.props.$alert({
      title: '自动列表',
      content:
        'AutoList是通过高阶组件抽象列表常用逻辑,然后拼装组合实现的UI无关的高级列表组件。使用时只要简单配置就可以完成一个全功能的列表开发。包括下拉刷新、加载分页、筛选(搜索)。并且对点击事件绑定和rerender做了优化。',
      btn: '了解了'
    })
  }
  render() {
    return (
      <ColumnView height='100%'>
        <SearchBar
          bgColor='#eaeaea'
          renderInputLeft={() => <Icon name='icon-sousuo' color='#9f9f9f' />}
          onTextInput={this.onSearch}
          placeholder='请输入医院名称'
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
        <AutoList
          pageSize={20}
          params={this.state.params}
          fetchListData={this.fetchListData}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          format={this.format}
          ref={s => (this.list = s)}
          itemClickHandler={this.onItemClick}
        />
      </ColumnView>
    )
  }
}
