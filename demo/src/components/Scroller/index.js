import { h } from 'preact'
import p2r from 'p-to-r'

import classNames from './scroller.css'

import useId from './useId'
import useFixed from './useFixed'
import usePosition from './usePosition'
import useLoadMore from './useLoadMore'
import useRefresh from './useRefresh'

import { DefaultLoadMoreFooter, DefaultRefreshHeader } from './default'



export const BaseScroller = ({
  children,
  height,
  className,
  id,
  hideScrollBar = true,
}) => {
  const classNamesArr = []
  const style = {}
  if (height) {
    classNamesArr.push(classNames.scrollerWithHeight)
    style.height = p2r(height)
  } else {
    classNamesArr.push(classNames.scrollerWithNoHeight)
  }
  if (hideScrollBar) {
    classNamesArr.push(classNames.hideScrollBar)
  }
  if (className) {
    classNamesArr.push(className)
  }
  return (
    <div className={classNamesArr.join(' ')} style={style} id={id}>
      {children}
    </div>
  )
}

export const ScrollerFixed = (props) => {
  const id = useId()
  const position = usePosition(id)
  useFixed(id, position)
  return <BaseScroller id={id} {...props} />
}

export const ScrollerWithLoadMore = ({
  onLoadMore,
  children,
  LoadMoreFooter = DefaultLoadMoreFooter,
  ...otherProps
}) => {
  const id = useId()
  const position = usePosition(id)
  const [stage, retry] = useLoadMore(position, onLoadMore)
  return (
    <BaseScroller id={id} {...otherProps}>
      {children}
      <LoadMoreFooter stage={stage} onRetry={retry} />
    </BaseScroller>
  )
}

export const ScrollerWithRefresh = ({
  onRefresh,
  children,
  RefreshHeader = DefaultRefreshHeader,
  refreshHeaderHeight,
  ...otherProps
}) => {
  const id = useId()
  const position = usePosition(id)
  const [stage, distance] = useRefresh(id, position, onRefresh)
  return (
    <BaseScroller id={id} {...otherProps}>
      <RefreshHeader stage={stage} distance={distance} refreshHeaderHeight={refreshHeaderHeight} />
      {children}
    </BaseScroller>
  )
}

export const ScrollerWithRefreshAndLoadMore = ({
  onLoadMore,
  onRefresh,
  children,
  RefreshHeader = DefaultRefreshHeader,
  LoadMoreFooter = DefaultLoadMoreFooter,
  refreshHeaderHeight,
  ...otherProps
}) => {
  const id = useId()
  const position = usePosition(id)
  const [stage, retry, reset] = useLoadMore(position, onLoadMore)
  const [step, distance] = useRefresh(id, position, onRefresh, reset)
  return (
    <BaseScroller id={id} {...otherProps}>
      <RefreshHeader stage={step} distance={distance} refreshHeaderHeight={refreshHeaderHeight} />
      {children}
      <LoadMoreFooter stage={stage} onRetry={retry} />
    </BaseScroller>
  )
}
