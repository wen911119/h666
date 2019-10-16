import { h, Component } from 'preact'
import style from './app.css'

export default class IndicatorDemo extends Component {
  state = {
    name: 'wenjun'
  }
  render () {
    return (
      <div>
        IndicatorDemo
        <div className={style.test}>{this.state.name}</div>
      </div>
    )
  }
}
