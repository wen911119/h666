import { useEffect, useRef } from 'preact/compat'
import { computePosition } from './utils'

// 解决滚动穿透问题
// 等overscroll-behavior普及时就可以去掉了
const usePreventBounce = (id, position, degree = 90) => {
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
        (position < 2 && yDistance > 0 && Math.abs(angle) < degree) ||
        ((position === 0 || position === 4) && yDistance < 0 && Math.abs(angle) < degree)
      ) {
        // 在顶部阻止下拉
        // 在底部阻止上拉
        // 内容高度不足以滚动时阻止上下拉
        event.preventDefault()
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
      // 清理
      ele.removeEventListener('touchstart', onTouchStartHandler, {
        passive: true,
      })
      ele.removeEventListener('touchmove', onTouchMoveHandler, {
        passive: false,
      })
    }
  }, [id, position, degree])
}

export default usePreventBounce
