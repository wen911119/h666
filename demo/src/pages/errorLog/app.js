import { h, Component } from 'preact'
import style from './app.css'

export default class ErrorLog extends Component {
  state = {
    name: 'wenjun'
  }
  render () {
    return (
      <div>
        ErrorLog
        <div className={style.test}>{this.state.name}</div>
      </div>
    )
  }
}
