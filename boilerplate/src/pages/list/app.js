import { h, Component } from 'preact'
import WithNav from '@ruiyun/preact-m-nav'
import style from './app.css'

@WithNav
export default class List extends Component {
  state = {
    name: 'wenjun'
  }

  gotoDetail = () => {
    this.props.$nav.push('detail')
  }

  replaceDetail = () => {
    this.props.$nav.replace(
      'detail',
      {},
      {
        bgColor: '#ccc'
      }
    )
  }

  back = () => {
    this.props.$nav.pop()
  }

  changeTitle = () => {
    this.props.$nav.setTitle('123456')
  }

  render() {
    return (
      <div>
        List
        <div className={style.test} onClick={this.changeTitle}>
          {this.state.name}
        </div>
        <div onClick={this.gotoDetail}>go to detail</div>
        <div onClick={this.replaceDetail}>replace to detail</div>
        <div onClick={this.back}>back</div>
      </div>
    )
  }
}
