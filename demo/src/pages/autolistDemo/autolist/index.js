import { h, Component } from 'preact'
import {
  ScrollerWithLoadMore,
  ScrollerWithRefreshAndLoadMore
} from '@ruiyun/preact-m-scroller'

import classNames from './index.css'

const throttle = function(fn, delay, atleast) {
  let timer = null
  let previous = null

  return function() {
    const now = +new Date()

    if (!previous) previous = now

    if (now - previous > atleast) {
      fn()
      // 重置上一次开始时间为本次结束时间
      previous = now
    } else {
      clearTimeout(timer)
      timer = setTimeout(function() {
        fn()
      }, delay)
    }
  }
}

const isEqual = (obj1, obj2) => {
  // 这里不用lodash.isequal
  // 换成JSON.stringify对比，减小体积
  // 因为这里obj1, obj2通常都是很小的object
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

const DefaultEmptyView = () => <div>empty</div>
const DefaultLoadingView = () => <div>loading...</div>

class ListItem extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.extraData[nextProps.itemKey] !==
      this.props.extraData[nextProps.itemKey]
    )
  }

  render() {
    const { renderItem, data, itemId, extraData, itemKey } = this.props
    return (
      <div data-list-item-id={itemId}>
        {renderItem(data, extraData[itemKey])}
      </div>
    )
  }
}

class ListFragment extends Component {
  state = {
    hide: false
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.hide !== this.state.hide ||
      nextProps.extraData !== this.props.extraData
    )
  }

  computeVisiable = throttle(
    () => {
      const myPosition = this.f.getBoundingClientRect()
      const { recycleThreshold = 1000 } = this.props
      if (
        myPosition.bottom < -recycleThreshold ||
        myPosition.top > recycleThreshold
      ) {
        this.setState({
          hide: true
        })
      } else {
        this.setState({
          hide: false
        })
      }
    },
    10,
    100
  )

  componentDidMount() {
    this.fragmentHeight = this.f.clientHeight
    this.props.scroller.addEventListener('scroll', this.computeVisiable)
  }

  componentWillUnmount() {
    this.props.scroller.removeEventListener('scroll', this.computeVisiable)
  }

  render() {
    const {
      data,
      fragmentId,
      keyExtractor,
      renderItem,
      extraData = {}
    } = this.props
    const { hide } = this.state
    return (
      <div
        data-list-fragment-id={fragmentId}
        ref={f => (this.f = f)}
        style={{ height: this.fragmentHeight }}
        className={hide ? classNames.fragmentHide : classNames.fragmentShow}
      >
        {data.map((d, index) => (
          <ListItem
            data={d}
            key={keyExtractor(d)}
            itemId={index}
            itemKey={keyExtractor(d)}
            renderItem={renderItem}
            extraData={extraData}
          />
        ))}
      </div>
    )
  }
}

class List extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.data !== this.props.data ||
      nextProps.extraData !== this.props.extraData ||
      nextProps.error !== this.props.error
    )
  }

  render() {
    const {
      data,
      renderEmptyView,
      renderLoadingView,
      renderErrorView,
      keyExtractor,
      itemClickHandler,
      renderItem,
      scroller,
      recycleThreshold,
      extraData,
      error
    } = this.props
    if (!data) {
      return error ? renderErrorView() : renderLoadingView()
    } else if (!data[0].length) {
      return renderEmptyView()
    } else {
      return (
        <div onClick={itemClickHandler}>
          {data.map((d, index) => (
            // eslint-disable-next-line
            <ListFragment
              data={d}
              fragmentId={index}
              key={index}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              scroller={scroller}
              recycleThreshold={recycleThreshold}
              extraData={extraData}
            />
          ))}
        </div>
      )
    }
  }
}

class Base extends Component {
  state = {
    data: null,
    pageSize: this.props.pageSize || 10,
    pageNum: 1,
    nomore: false,
    loading: true,
    error: false
  }

  renderEmptyView = this.props.EmptyView || DefaultEmptyView
  renderLoadingView = this.props.LoadingView || DefaultLoadingView

  renderDefaultErrorView = refresh => <div onClick={() => refresh()}>加载出错，点击重试</div>

  renderErrorView = () => {
    if (this.props.ErrorView) {
      return this.props.ErrorView(this.onRefresh)
    } else {
      return this.renderDefaultErrorView(this.onRefresh)
    }
  }


  fecthListData = async () => {
    const { fetchListData, format, params } = this.props
    const { pageNum, pageSize } = this.state
    let newList = Array.from(this.state.data || [])
    try {
      const {
        list,
        pageInfo: { totalPage, currentPage }
      } = format(
        await fetchListData(Object.assign({}, params, { pageNum, pageSize }))
      )
      if (pageNum === 1) {
        newList = [list]
      } else {
        newList.push(list)
      }
      this.setState({
        data: newList,
        loading: false,
        error: false,
        nomore: totalPage <= currentPage
      })
    } catch(error){
      console.log(error)
      this.setState({
        loading: false,
        error: true
      })
    }
    
  }

  clickHandler = event => {
    let current = event.target
    let itemId, fragmentId
    while (current && !current.dataset.listItemId) {
      current = current.parentElement
    }
    if (current) {
      itemId = current.dataset.listItemId
      while (current && !current.dataset.listFragmentId) {
        current = current.parentElement
      }
      if (current) {
        fragmentId = current.dataset.listFragmentId
      }
    }
    if (itemId && fragmentId) {
      this.props.itemClickHandler(
        this.state.data[fragmentId][itemId],
        event.target
      )
    }
  }

  onLoadMore = (retry) => {
    this.setState(
      {
        pageNum: retry ? this.state.pageNum : this.state.pageNum + 1,
        loading: true,
        error: false
      },
      this.fecthListData
    )
  }

  onRefresh = done => {
    this.setState(
      {
        pageNum: 1,
        // data: done && this.state.data,
        loading: true,
        error: false
      },
      () => this.fecthListData().then(() => done && done())
    )
  }

  componentDidMount() {
    this.fecthListData()
    this.scrollTo = this.s.scrollTo
  }

  componentDidUpdate(prevProps) {
    // params改变了需要重新刷新
    if (!isEqual(prevProps.params, this.props.params)) {
      this.onRefresh()
    }
  }
}

export default class AutoList extends Base {
  render() {
    const {
      keyExtractor,
      renderItem,
      FooterView,
      HeaderView,
      height,
      recycleThreshold,
      extraData
    } = this.props
    const { data, nomore, loading, error } = this.state
    return (
      <ScrollerWithLoadMore
        onLoadMore={this.onLoadMore}
        onRefresh={this.onRefresh}
        nomore={nomore}
        loading={loading}
        height={height}
        loadMoreError={error && data}
        ref={s => (this.s = s)}
      >
        {HeaderView && <HeaderView />}
        <List
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          itemClickHandler={this.clickHandler}
          data={data}
          renderEmptyView={this.renderEmptyView}
          renderLoadingView={this.renderLoadingView}
          renderErrorView={this.renderErrorView}
          scroller={this.s && this.s.base.children[0]}
          recycleThreshold={recycleThreshold}
          error={error && !data}
          extraData={extraData}
        />

        {FooterView && <FooterView />}
      </ScrollerWithLoadMore>
    )
  }
}

// 彻底分为了tree-shaking
export class AutoListWithRefresh extends Base {
  render() {
    const {
      keyExtractor,
      renderItem,
      FooterView,
      HeaderView,
      recycleThreshold,
      extraData
    } = this.props
    const { data, nomore, loading, error, pageNum } = this.state
    console.log(pageNum, 787888)
    return (
      <ScrollerWithRefreshAndLoadMore
        onLoadMore={this.onLoadMore}
        onRefresh={this.onRefresh}
        nomore={nomore}
        loading={loading}
        loadMoreError={error && data && pageNum > 1}
        refreshError={error && data && pageNum === 1}
        ref={s => (this.s = s)}
      >
        {HeaderView && <HeaderView />}
        <List
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          itemClickHandler={this.clickHandler}
          data={data}
          renderEmptyView={this.renderEmptyView}
          renderLoadingView={this.renderLoadingView}
          renderErrorView={this.renderErrorView}
          scroller={this.s && this.s.base.children[0]}
          recycleThreshold={recycleThreshold}
          extraData={extraData}
          error={error && !data}
        />

        {FooterView && <FooterView />}
      </ScrollerWithRefreshAndLoadMore>
    )
  }
}
