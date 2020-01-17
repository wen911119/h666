import { h, Component } from 'preact'
import WithRouter from '@ruiyun/preact-m-router'
import style from './app.css'

@WithRouter
export default class Index extends Component {
  state = {
    name: 'wenjun1991'
  }

  goto = () => {
    this.props.$router.push('list', {}, {
      title: '商品列表',
      bgColor: '#f8584f'
    })
  }

  render() {
    return (
      <div>
        Index
        <div className={style.test}>{this.state.name}</div>
        <div onClick={this.goto}>go to list</div>
      </div>
    )
  }
}
