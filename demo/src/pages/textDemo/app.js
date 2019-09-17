import { h, Component } from 'preact'
import style from './app.css'

export default class TextDemo extends Component {
  state = {
    name: 'wenjun'
  }
  render () {
    return (
      <div>
        TextDemo
        <div className={style.test}>{this.state.name}</div>
      </div>
    )
  }
}
