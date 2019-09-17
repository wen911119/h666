import { h, Component } from 'preact'
import style from './app.css'

export default class NavDemo3 extends Component {
  state = {
    name: 'wenjun'
  }
  render () {
    return (
      <div>
        NavDemo3
        <div className={style.test}>{this.state.name}</div>
      </div>
    )
  }
}
