import { h, Component, cloneElement } from 'preact'
import debounce from 'lodash.debounce'
import { forwardRef } from 'preact/compat'

import LoadMore from './loadMore'
import RefreshControl from './refreshControl'
import classNames from './scroller.css'

export default class Scroller extends Component {
  state = {
    position: '0'
  }

  positionUpdateCallBack = () => {
    const { position } = this.state
    if (position === '3') {
      const { onBottom } = this.props
      onBottom && onBottom()
    }
  }

  scrollTo = (position = 0) => {
    this.scroller.scrollTop = position
  }

  updatePosition = () => {
    let position
    const { loadMoreThreshold = 25 } = this.props
    if (this.scroller.scrollHeight === this.scroller.clientHeight) {
      // 内容高度小于等于容器高度，不能滚动
      position = '0'
    } else if (this.scroller.scrollTop === 0) {
      // 在顶部
      position = '1'
    } else if (
      Math.abs(
        this.scroller.scrollTop +
          this.scroller.clientHeight -
          this.scroller.scrollHeight
      ) <= loadMoreThreshold
    ) {
      // 在底部
      position = '3'
    } else {
      // 在中间
      position = '2'
    }

    if (position !== this.state.position) {
      this.setState(
        {
          position
        },
        this.positionUpdateCallBack
      )
    }
  }

  updatePositionDebounce = debounce(this.updatePosition, 50)

  onTouchStart = e => {
    this.touchStartPoint = e.targetTouches[0]
    this.props.onGestureStart && this.props.onGestureStart()
  }

  getSwipeAngle = touchMoveEvent => {
    if (!this.angle) {
      this.angle =
        (this.touchStartPoint.clientY - touchMoveEvent.touches[0].clientY) /
        Math.abs(
          this.touchStartPoint.clientX - touchMoveEvent.touches[0].clientX
        )
    }
    return this.angle
  }

  onTouchMove = event => {
    const { position } = this.state
    const angle = this.getSwipeAngle(event)
    const { onPullDown } = this.props
    if (position === '0' && angle < -0.5) {
      if (onPullDown || !event.NOT_PREVENT) {
        event.preventDefault()
      }
      onPullDown &&
        onPullDown(
          event.targetTouches[0].screenY - this.touchStartPoint.screenY
        )
    } else {
      if (position === '1' && angle < -0.5) {
        // 在最顶部下拉
        if (onPullDown || !event.NOT_PREVENT) {
          event.preventDefault()
        }
        onPullDown &&
          onPullDown(
            event.targetTouches[0].screenY - this.touchStartPoint.screenY
          )
      } else if (position === '3' && angle > 0.5) {
        // 在最底部上拉
        const { onPullUp } = this.props
        if (onPullUp || !event.NOT_PREVENT) {
          event.preventDefault()
        }
        onPullUp &&
          onPullUp(
            this.touchStartPoint.screenY - event.targetTouches[0].screenY
          )
      } else {
        event.NOT_PREVENT = true
      }
    }
  }

  onTouchMoveCapture = event => {
    if (this.state.position === '2') {
      event.NOT_PREVENT = true
    } else if (this.state.position === '1') {
      // 在顶部
      // 如果是上拉手势，告诉孩子不要阻止
      const angle = this.getSwipeAngle(event)
      if (angle > 0.5) {
        event.NOT_PREVENT = true
      }
    } else if (this.state.position === '3') {
      // 在底部
      // 如果是下拉手势，告诉孩子不要阻止
      const angle = this.getSwipeAngle(event)
      if (angle < -0.5) {
        event.NOT_PREVENT = true
      }
    }
  }

  onTouchEnd = () => {
    this.angle = null
    this.props.onGestureEnd && this.props.onGestureEnd()
  }

  onScroll = event => {
    this.updatePositionDebounce(event)
    this.props.onScroll && this.props.onScroll(event)
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.observer = new MutationObserver(this.updatePosition)
    this.observer.observe(this.scroller, {
      childList: true,
      subtree: true
    })
    // 需不需要debounce？
    this.scroller.addEventListener('scroll', this.onScroll)
    this.scroller.addEventListener('touchmove', this.onTouchMoveCapture, true)
    this.updatePosition()
  }

  componentWillUnmount() {
    this.observer && this.observer.disconnect()
    this.observer = null
    this.scroller.removeEventListener('scroll', this.onScroll)
    this.scroller.removeEventListener(
      'touchmove',
      this.onTouchMoveCapture,
      true
    )
  }

  render() {
    const { children, height, footer, ...otherProps } = this.props
    const { position } = this.state
    return (
      <div
        className={height ? '' : classNames.wrap}
        style={{ height, overflow: 'hidden' }}
      >
        <div
          ref={s => (this.scroller = s)}
          className={classNames.scroller}
          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchEnd}
          style={{ height }}
        >
          {children &&
            (children.length
              ? children
              : cloneElement(children, {
                  ...otherProps
                }))}
          {footer && footer(position)}
        </div>
      </div>
    )
  }
}

export const ScrollerWithLoadMore = forwardRef(
  ({ children, ...otherProps }, ref) => (
    <LoadMore {...otherProps}>
      <Scroller ref={ref}>{children}</Scroller>
    </LoadMore>
  )
)

export const ScrollerWithRefreshAndLoadMore = forwardRef(
  ({ children, ...otherProps }, ref) => (
    <RefreshControl {...otherProps}>
      <LoadMore>
        <Scroller ref={ref}>{children}</Scroller>
      </LoadMore>
    </RefreshControl>
  )
)

export const ScrollerWithRefresh = forwardRef(
  ({ children, ...otherProps }, ref) => (
    <RefreshControl {...otherProps}>
      <Scroller ref={ref}>{children}</Scroller>
    </RefreshControl>
  )
)
