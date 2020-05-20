// copy from https://github.com/ElemeFE/mint-ui/blob/master/packages/infinite-scroll/src/directive.js
export const getScrollEventTarget = element => {
  let currentNode = element
  // bugfix, see http://w3help.org/zh-cn/causes/SD9013 and http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome
  while (
    currentNode &&
    currentNode.tagName !== 'HTML' &&
    currentNode.tagName !== 'BODY' &&
    currentNode.nodeType === 1
  ) {
    const overflowY = document.defaultView.getComputedStyle(currentNode)
      .overflowY
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode
    }
    currentNode = currentNode.parentNode
  }
  return window
}

export const computePosition = (startPoint, currentPoint) => {
  const xDistance = currentPoint.clientX - startPoint.clientX
  const yDistance = currentPoint.clientY - startPoint.clientY
  return {
    angle: (Math.atan(xDistance / yDistance) * 180) / Math.PI,
    xDistance,
    yDistance
  }
}

export const throttle = (fn, delay, atleast) => {
  // 简化版
  // 这里不用lodash.throttle 减少体积
  let timer = null
  let previous = Date.now()

  return function() {
    const now = Date.now()
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
