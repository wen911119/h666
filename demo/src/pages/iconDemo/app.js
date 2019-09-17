import { h, Component } from 'preact'
import style from './app.css'

export default class IconDemo extends Component {
  state = {
    name: 'wenjun'
  }
  render () {
    return (
      <div>
        IconDemo
        <div className={style.test}>{this.state.name}</div>
      </div>
    )
  }
}
