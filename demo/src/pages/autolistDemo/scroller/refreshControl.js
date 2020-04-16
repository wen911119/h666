import { h, Component, cloneElement } from 'preact'
import { XCenterView } from '@ruiyun/preact-layout-suite'
import p2r from 'p-to-r'
import Text from '@ruiyun/preact-text'
import Loading from '@ruiyun/preact-loading'

import classNames from './refreshControl.css'

window.navigator.vibrate && window.navigator.vibrate(20)

const DefaultRefreshHeader = ({ stage, percent, animation, error, success }) => {
  // let text
  // switch (stage) {
  //   case 2:
  //     text = '释放刷新'
  //     break
  //   case 3:
  //     text = '正在刷新'
  //     break
  //   case 4:
  //     text = '刷新完成'
  //     break
  //   default:
  //     text = '下拉刷新'
  //     break
  // }
  // if (error) {
  //   text = '刷新失败'
  // }
  let bgColor
  if (stage === 4) {
    if (error) {
      bgColor = '#f7948e'
    } else {
      bgColor = '#7be47a'
    }
  }
  return (
    <XCenterView
      bgColor={bgColor}
      height={stage ===4 ? 60: 100}
      style={{
        marginTop: `${p2r(-100 + (100 * percent) / 100)}`,
        transition: animation
      }}
    >
      {(stage ===1 || stage ===2) && <css-icon class={classNames["icon-refresh"]} style={{transform: `rotate(${percent * 3.6}deg)`}} />}
      {stage ===3 && <Loading />}
      {stage ===4 && <Text size={26} color='#fff'>{error || success}</Text>}
    </XCenterView>
  )
}

export default class RefreshControl extends Component {
  state = {
    animation: 'none',
    stage: 1,
    percent: 0,
    success: null,
    error: null
  }

  renderRefreshHeader = this.props.renderRefreshHeader || DefaultRefreshHeader

  onGestureStart = () => {
  }

  onPullDown = distance => {
    if (this.state.stage === 1 || this.state.stage === 2) {
      const percent = (distance / 2.5 / 50) * 100
      if (this.state.stage === 1 && percent >= 100) {
        console.log(window.navigator.vibrate, 555555)
        window.navigator.vibrate && window.navigator.vibrate(20)
      }
      this.setState({
        stage: percent >= 100 ? 2 : 1,
        percent,
        animation: 'none'
      })
    }
  }

  onGestureEnd = () => {
    if (this.state.stage === 2) {
      this.setState(
        {
          stage: 3,
          percent: 100,
          animation: '330ms'
        },
        () => {
          this.props.onRefresh((success = '刷新成功') => {
            setTimeout(() => {
              this.setState({
                stage: 4,
                percent: 100,
                success
              })
            }, 2000)
            setTimeout(()=>{
              this.setState({
                stage: 1,
                percent: 0,
                animation: '330ms'
              })
            }, 3000)
          })
        }
      )
    } else {
      this.setState({
        percent: 0,
        animation: (this.state.percent / 100 * 330) + 'ms'
      })
    }
  }

  render() {
    const { children, height, refreshError, ...otherProps } = this.props
    const { animation, stage, percent, success } = this.state
    return (
      <div style={{ height }} className={classNames.flex}>
        {this.renderRefreshHeader({ stage, percent, animation, error: refreshError ? '刷新失败': null, success })}
        <div className={classNames.flex}>
          {cloneElement(children, {
            onPullDown: this.onPullDown,
            onGestureEnd: this.onGestureEnd,
            ...otherProps
          })}
        </div>
      </div>
    )
  }
}
