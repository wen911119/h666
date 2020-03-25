import { h, Component } from 'preact'
import style from './app.css'

export default class ErrorLog extends Component {
  state = {
    name: 'wenjun'
  }
  doit = () => {
    // eslint-disable-next-line
    console.log(a.b)
  }
  render () {
    return (
      <div>
        ErrorLog
        <div className={style.test} onClick={this.doit}>{this.state.name}</div>
      </div>
    )
  }
}
