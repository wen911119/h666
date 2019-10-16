import { h, Component } from 'preact'
import style from './app.css'

export default class RedundantPage2 extends Component {
  state = {
    name: 'wenjun'
  }
  render () {
    return (
      <div>
        RedundantPage2
        <div className={style.test}>{this.state.name}</div>
      </div>
    )
  }
}
