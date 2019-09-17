import { h, Component } from 'preact'
import style from './app.css'

export default class NavDemo extends Component {
  state = {
    name: 'wenjun'
  }
  render () {
    return (
      <div>
        NavDemo
        <div className={style.test}>{this.state.name}</div>
      </div>
    )
  }
}
