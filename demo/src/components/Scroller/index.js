import { h } from 'preact'
import p2r from 'p-to-r'

import classNames from './scroller.css'

import useId from './useId'
import usePreventBounce from './usePreventBounce'
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
    if (height === 'flex1') {
      classNamesArr.push(classNames.flex1)
    } else {
      style.height = p2r(height)
    }
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

export const ScrollerWithPreventBounce = ({ degree, ...otherProps }) => {
  const id = useId()
  const position = usePosition(id)
  usePreventBounce(id, position, degree)
  return <BaseScroller id={id} {...otherProps} />
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
  refreshDamping,
  degree,
  ...otherProps
}) => {
  const id = useId()
  const position = usePosition(id)
  console.log(position, 11111, id)
  const { stage, distance } = useRefresh(id, position, onRefresh, undefined, {
    refreshHeaderHeight,
    refreshDamping,
    degree,
  })
  return (
    <BaseScroller id={id} {...otherProps}>
      <RefreshHeader
        stage={stage}
        distance={distance}
        refreshHeaderHeight={refreshHeaderHeight}
      />
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
  refreshDamping,
  degree,
  ...otherProps
}) => {
  const id = useId()
  const position = usePosition(id)
  const [stage, retry, reset] = useLoadMore(position, onLoadMore)
  const { stage: step, distance } = useRefresh(id, position, onRefresh, reset, {
    refreshHeaderHeight,
    refreshDamping,
    degree,
  })
  return (
    <BaseScroller id={id} {...otherProps}>
      <RefreshHeader
        stage={step}
        distance={distance}
        refreshHeaderHeight={refreshHeaderHeight}
      />
      {children}
      <LoadMoreFooter stage={stage} onRetry={retry} />
    </BaseScroller>
  )
}
