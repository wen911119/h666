import { h, Component } from 'preact'
import style from './app.css'

export default class LoadingDemo extends Component {
  state = {
    name: 'wenjun'
  }
  render () {
    return (
      <div>
        LoadingDemo
        <div className={style.test}>{this.state.name}</div>
      </div>
    )
  }
}
