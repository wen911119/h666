import { useState, useEffect, useCallback, useRef } from 'preact/compat'
import { computePosition } from './utils'

// 解决滚动穿透问题
// 等overscroll-behavior普及时就可以去掉了
const useFixed = (id, position) => {
  useEffect(() => {
    const ele = document.getElementById(id)
    const touchstartPoint = useRef(null)
    const onTouchStartHandler = (event) => {
      touchstartPoint.current = event.touches[0]
    }
    const onTouchMoveHandler = (event) => {
      const { angle, yDistance } = computePosition(
        touchstartPoint.current,
        event.touches[0]
      )
      if (
        (position < 2 && yDistance > 0 && Math.abs(angle) < 30) ||
        (position === 4 && yDistance < 0 && Math.abs(angle) < 30)
      ) {
        // 在顶部下拉或者底部下拉
        event.preventDefault()
        event.stopPropagation()
      }
    }
    if (position < 2 || position === 4) {
      ele.addEventListener('touchstart', onTouchStartHandler, {
        passive: true,
      })
      ele.addEventListener('touchmove', onTouchMoveHandler, {
        passive: false,
      })
    }
    return function cleanup() {
      ele.removeEventListener('touchstart', onTouchStartHandler, {
        passive: true,
      })
      ele.removeEventListener('touchmove', onTouchMoveHandler, {
        passive: false,
      })
    }
  }, [id, position])
}

export default useFixed
