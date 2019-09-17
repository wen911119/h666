import { h, Component } from 'preact'
import style from './app.css'

export default class LineDemo extends Component {
  state = {
    name: 'wenjun'
  }
  render () {
    return (
      <div>
        LineDemo
        <div className={style.test}>{this.state.name}</div>
      </div>
    )
  }
}
