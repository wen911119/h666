import { h, Component } from 'preact'
import AutoList from '@ruiyun/preact-m-auto-list'
import { ColumnView, RowView } from '@ruiyun/preact-layout-suite'
import WithNav from '@ruiyun/preact-m-nav'
import Text from '@ruiyun/preact-text'
import Line from '@ruiyun/preact-line'
import Ajax from '@ruiyun/ajax'
import Icon from '@ruiyun/preact-icon'
import SearchBar from '@ruiyun/preact-m-search-bar'
import className from './app.css'

@WithNav
export default class AutolistDemo extends Component {
  state = {
    params: {
      keyword: ''
    }
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
  onSearch = keyword => {
    this.setState({
      params: Object.assign({}, this.state.params, {
        keyword
      })
    })
  }
  backToTop = () => {
    this.list.scrollTo(0, false)
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
  goto = () => {
    this.props.$nav.push('buttonDemo')
  }
  render () {
    return (
      <ColumnView height='100%'>
        <SearchBar
          renderInputLeft={() => <Icon name='icon-sousuo' color='#9f9f9f' />}
          onTextInput={this.onSearch}
          placeholder='请输入医院名称'
          textSize={26}
        />
        <Text
          className={className.backtotop}
          color='#fff'
          size={24}
          onClick={this.backToTop}
        >
          TOP
        </Text>
        <AutoList
          pageSize={20}
          alias={{ pageNum: 'page', pageSize: 'page_size' }}
          params={this.state.params}
          fetchListData={this.fetchListData}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          format={this.format}
          ref={s => (this.list = s)}
          height='flex1'
          id='demo-scroller'
        />
      </ColumnView>
    )
  }
}
