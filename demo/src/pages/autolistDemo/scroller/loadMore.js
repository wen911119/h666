import { h, Component, cloneElement } from 'preact'
import classNames from './loadmore.css'

export default class LoadMoreStateless extends Component {
  onBottom = () => {
    const { nomore, loading } = this.props
    if (!nomore && !loading) {
      this.props.onLoadMore()
    }
  }

  renderFooter = position => {
    const { nomore, loading, loadMoreError } = this.props
    if (position !== '0' && position !== '1') {
      if (this.props.renderLoadMoreFooter) {
        return this.props.renderLoadMoreFooter({ nomore, loading, position, loadMoreError })
      }
      if (loadMoreError) {
        return <div className={classNames.tip} onClick={() => this.props.onLoadMore(true)}>加载出错，点击重试</div>
      }
      let tip
      if (nomore) {
        tip = '没有更多了～'
      } else if (loading || position === '3') {
        tip = '加载中...'
      } else {
        tip = '上拉加载更多'
      }
      return <div className={classNames.tip}>{tip}</div>
    }
  }

  render() {
    const { children, ...otherProps } = this.props
    return cloneElement(children, {
      ...otherProps,
      onBottom: this.onBottom,
      footer: this.renderFooter
    })
  }
}
