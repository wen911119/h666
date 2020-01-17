import { h, Component } from 'preact'
import WithRouter from '@ruiyun/preact-m-router'

@WithRouter
export default class Detail extends Component {
  state = {
    name: 'wenjun'
  }

  back = () => {
    this.props.$router.pop()
  }

  render() {
    return (
      <div>
        Detail
        <div onClick={this.back}>back</div>
      </div>
    )
  }
}
