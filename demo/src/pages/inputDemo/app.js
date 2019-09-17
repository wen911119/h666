import { h, Component } from 'preact'
import style from './app.css'

export default class InputDemo extends Component {
  state = {
    name: 'wenjun'
  }
  render () {
    return (
      <div>
        InputDemo
        <div className={style.test}>{this.state.name}</div>
      </div>
    )
  }
}
