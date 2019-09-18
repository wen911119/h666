import { h, Component } from 'preact'

import DemoPage from '../../components/DemoPage'
import style from './app.css'

export default class TextDemo extends Component {
  state = {
    name: 'wenjun3'
  }
  render () {
    return (
      <DemoPage title='Text'>
        <div className={style.test}>{this.state.name}</div>
      </DemoPage>
    )
  }
}
