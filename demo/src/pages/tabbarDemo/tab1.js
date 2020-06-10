import { h, Component } from 'preact'
import Text from '@ruiyun/preact-text'

export default class Item1 extends Component {
  constructor(props) {
    super(props)
    console.log('tab-item-1===>constructor')
    this.state = {
      name: 'tab-item-1',
    }
  }

  onTabShow = () => {
    console.log('tab-item-1 is show!')
  }

  onTabHide = () => {
    console.log('tab-item-1 is hide!')
  }

  change = () => {
    this.setState({
      name: 'tab-item-1 has changed',
    })
  }

  componentDidMount() {
    console.log('tab-item-1', 'componentDidMount')
  }

  componentWillUnmount() {
    console.log('tab-item-1', 'componentWillUnmount')
  }

  render() {
    console.log('render-item-1')
    return (
      <div style={{ height: '1500px' }}>
        <Text onClick={this.change}>{this.state.name}</Text>
      </div>
    )
  }
}
