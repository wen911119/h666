import { h, Component } from 'preact'
import style from './app.css'

export default class Analytics extends Component {
  state = {
    name: 'wenjun'
  }
  render () {
    return (
      <div>
        Analytics
        <div className={style.test}>{this.state.name}</div>
      </div>
    )
  }
}
