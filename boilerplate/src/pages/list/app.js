import { h, Component } from 'preact'
import WithRouter from '@ruiyun/preact-m-router'
import style from './app.css'

@WithRouter
export default class List extends Component {
  state = {
    name: 'wenjun'
  }

  gotoDetail = () => {
    this.props.$router.push('detail')
  }

  replaceDetail = () => {
    this.props.$router.replace(
      'detail',
      {},
      {
        bgColor: '#ccc'
      }
    )
  }

  back = () => {
    this.props.$router.pop()
  }

  changeTitle = () => {
    this.props.$router.setTitle('123456')
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
