import { h, Component } from 'preact'
import style from './app.css'

export default class ImagePreviewDemo extends Component {
  state = {
    name: 'wenjun'
  }
  render () {
    return (
      <div>
        ImagePreviewDemo
        <div className={style.test}>{this.state.name}</div>
      </div>
    )
  }
}
