import { useRef } from 'preact/compat'

const useId = () => {
  const id = useRef(`scroller_${Math.random()}`)
  return id.current
}

export default useId