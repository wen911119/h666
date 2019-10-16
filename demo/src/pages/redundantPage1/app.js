import { h, Component } from 'preact'
import style from './app.css'

export default class RedundantPage1 extends Component {
  state = {
    name: 'wenjun'
  }
  render () {
    return (
      <div>
        RedundantPage1
        <div className={style.test}>{this.state.name}</div>
      </div>
    )
  }
}
