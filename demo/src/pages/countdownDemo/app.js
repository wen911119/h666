import { h, Component } from 'preact'
import style from './app.css'

export default class CountdownDemo extends Component {
  state = {
    name: 'wenjun'
  }
  render () {
    return (
      <div>
        CountdownDemo
        <div className={style.test}>{this.state.name}</div>
      </div>
    )
  }
}
