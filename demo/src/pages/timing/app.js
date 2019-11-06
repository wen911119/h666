import { h, Component } from 'preact'
import Indicator from 'h5-indicator'
import style from './app.css'

export default class Timing extends Component {
  state = {
    name: 'wenjun'
  }
  componentDidMount () {
    document.addEventListener(
      'plusready',
      () => {
        Indicator.toast('plusready', {
          timeout: 10000
        })
      },
      false
    )
  }
  render () {
    return (
      <div>
        Timing
        <input type='file' name='audio' accept='video/*' capture='user' />
        <div className={style.test}>{this.state.name}</div>
      </div>
    )
  }
}
