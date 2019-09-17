import { h, Component } from 'preact'
import style from './app.css'

export default class Timing extends Component {
  state = {
    name: 'wenjun'
  }
  render () {
    return (
      <div>
        Timing
        <div className={style.test}>{this.state.name}</div>
      </div>
    )
  }
}
