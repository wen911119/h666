import { useState, useEffect, useCallback, useRef } from 'preact/compat'
import { getScrollEventTarget } from './utils'
const usePosition = (scrollerId, willBottomThreshold = 200) => {
  const [position, updatePosition] = useState(0)
  useEffect(() => {
    const scrollEventTarget = getScrollEventTarget(
      document.getElementById(scrollerId)
    )
    if (scrollEventTarget.__LISTEN_BY__) {
      return
    }
    scrollEventTarget.__LISTEN_BY__ = scrollerId
    let scrollEle, observerEle
    if (scrollEventTarget === window) {
      scrollEle = document.documentElement
      observerEle = document.body
    } else {
      scrollEle = observerEle = scrollEventTarget
    }
    const computePosition = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollEle
      let newPosition
      if (scrollTop <= 0) {
        if (clientHeight >= scrollHeight) {
          // 顶部，内容少，不足以滚动
          newPosition = 0
        } else {
          // 顶部，可以滚动
          newPosition = 1
        }
      } else if (scrollTop + clientHeight >= scrollHeight) {
        // 底部
        newPosition = 4
      } else if (
        scrollTop + clientHeight >
        scrollHeight - willBottomThreshold
      ) {
        // 接近底部
        newPosition = 3
      } else {
        // 中间
        newPosition = 2
      }
      updatePosition(newPosition)
    }
    scrollEventTarget.addEventListener('scroll', computePosition, {
      passive: true,
    })
    // eslint-disable-next-line
    const observer = new MutationObserver(computePosition)
    observer.observe(observerEle, {
      childList: true,
      subtree: true,
    })
    computePosition()
    return function clearUp() {
      scrollEventTarget.removeEventListener('scroll', computePosition, {
        passive: true,
      })
      observer.disconnect()
      observer = null
    }
  }, [scrollerId, willBottomThreshold])
  return position
}

export default usePosition
