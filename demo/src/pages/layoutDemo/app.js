import { h, Component } from 'preact'
import style from './app.css'

export default class LayoutDemo extends Component {
  state = {
    name: 'wenjun'
  }
  render () {
    return (
      <div>
        LayoutDemo
        <div className={style.test}>{this.state.name}</div>
      </div>
    )
  }
}
