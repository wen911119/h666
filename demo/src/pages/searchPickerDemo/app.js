import { h, Component } from 'preact'
import { ColumnView, RowView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import Line from '@ruiyun/preact-line'
import Ajax from '@ruiyun/ajax'
import { WithSearchPicker } from '@ruiyun/preact-m-search-picker'
import className from './app.css'

@WithSearchPicker
export default class SearchPicker extends Component {
  state = {
    name: '打开search-picker',
  }

  openSearchPicker = () => {
    this.props.$searchPicker
      .show({
        searchbar: {
          textSize: 24,
        },
        autolist: {
          fetchListData: this.fetchListData,
          keyExtractor: this.keyExtractor,
          format: this.format,
          renderItem: this.renderItem,
          pageSize: 20,
          params: {
            type: 'hospital',
          },
        },
        slot: (updateParams) => (
          // eslint-disable-next-line
        <Text onClick={updateParams.bind(this, { type: 'wj' })}>slot</Text>
        ),
      })
      .then(console.log)
  }

  fetchListData = async ({ pageSize, pageNum, ...otherProps }) => {
    const ret = await Ajax.get(
      'https://uapi.dev.quancheng-ec.com/rhea/hospitals',
      {
        params: {
          page: pageNum,
          page_size: pageSize,
          ...otherProps,
        },
        headers: {
          loading: 'false',
        },
      }
    )
    if (ret && ret.success) {
      return ret.result
    }
    return {
      data: [],
      pageInfo: {
        currentPage: pageNum,
      },
    }
  }

  keyExtractor = (item) => item.hospitalId
  format = (ret) => {
    const res = {
      list: ret.data,
      pageInfo: {
        totalPage: Math.ceil(ret.pageInfo.total / ret.pageInfo.pageSize),
        currentPage: ret.pageInfo.currentPage,
      },
    }
    return res
  }

  renderItem = (item) => (
    <div className={className.item}>
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

  render() {
    return (
      <div>
        SearchPicker
        <div className={className.test} onClick={this.openSearchPicker}>
          {this.state.name}
        </div>
      </div>
    )
  }
}
