import { h, Component } from 'preact'
import WithNav from '@ruiyun/preact-m-nav'

@WithNav
export default class Detail extends Component {
  state = {
    name: 'wenjun'
  }

  back = () => {
    this.props.$nav.pop()
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
