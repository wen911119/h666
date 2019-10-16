import { h, Component } from 'preact'
import style from './app.css'

export default class RedundantPage3 extends Component {
  state = {
    name: 'wenjun'
  }
  render () {
    return (
      <div>
        RedundantPage3
        <div className={style.test}>{this.state.name}</div>
      </div>
    )
  }
}
