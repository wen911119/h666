import { h, Component } from 'preact'
import Text from '@ruiyun/preact-text'

export default class Item2 extends Component {
  constructor (props) {
    super(props)
    console.log('tab-item-2===>constructor')
  }
  onActive = () => {
    console.log('tab-item-2 is active!')
  }
  componentDidMount () {
    console.log('tab-item-2', 'componentDidMount')
  }
  componentWillUnmount () {
    console.log('tab-item-2', 'componentWillUnmount')
  }
  render () {
    return <Text>tab-item-2</Text>
  }
}
