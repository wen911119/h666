import { h, Component } from 'preact'
import style from './app.css'

export default class ImageDemo extends Component {
  state = {
    name: 'wenjun'
  }
  render () {
    return (
      <div>
        ImageDemo
        <div className={style.test}>{this.state.name}</div>
      </div>
    )
  }
}
