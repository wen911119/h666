import { useState, useRef, useEffect } from 'preact/compat'
import { computePosition } from './utils'

const useRefresh = (id, position, onRefresh, resetLoadMore, config) => {
  const [refreshState, updateRefreshState] = useState({
    stage: 1,
    distance: 0,
  })

  const startPoint = useRef(null)

  useEffect(() => {
    const defaultConfig = {
      degree: 30,
      refreshHeaderHeight: 50,
      refreshDamping: 2.5,
    }
    const mergedConfig = Object.assign(
      {},
      defaultConfig,
      JSON.parse(JSON.stringify(config))
    )
    const { degree, refreshHeaderHeight, refreshDamping } = mergedConfig
    const ele = document.getElementById(id)
    const onTouchStartHandler = (event) => {
      if (refreshState.stage === 4) {
        updateRefreshState({
          stage: 1,
          distance: 0
        })
      }
      startPoint.current = event.touches[0]
    }
    const onTouchMoveHandler = (event) => {
      const { angle, yDistance } = computePosition(
        startPoint.current,
        event.touches[0]
      )
      if (position < 2 && yDistance > 0 && Math.abs(angle) < degree) {
        event.preventDefault()
        if (refreshState.stage < 3) {
          const distance = yDistance / refreshDamping
          updateRefreshState({
            stage: distance > refreshHeaderHeight ? 2 : 1,
            distance
          })
        }
      }
    }
    const onTouchEndHandler = (event) => {
      if (refreshState.stage < 3) {
        const { yDistance } = computePosition(
          startPoint.current,
          event.changedTouches[0]
        )
        if (yDistance > refreshHeaderHeight * refreshDamping) {
          updateRefreshState({
            stage: 3,
            distance: refreshHeaderHeight
          })
          onRefresh((isSuccess) => {
            updateRefreshState({
              stage: 4,
              distance: 0
            })
            resetLoadMore && isSuccess && resetLoadMore()
          })
        } else {
          updateRefreshState({
            stage: 4,
            distance: 0
          })
        }
      }
    }
    if (position < 2) {
      ele.addEventListener('touchstart', onTouchStartHandler, {
        passive: true,
      })
      ele.addEventListener('touchmove', onTouchMoveHandler, {
        passive: false,
      })
      ele.addEventListener('touchend', onTouchEndHandler, {
        passive: true,
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
      ele.removeEventListener('touchend', onTouchEndHandler, {
        passive: true,
      })
    }
  }, [id, position, onRefresh, resetLoadMore, config])

  return refreshState
}

export default useRefresh
