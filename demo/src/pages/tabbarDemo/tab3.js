import { h, Component } from 'preact'
import Text from '@ruiyun/preact-text'

export default class Item3 extends Component {
  constructor (props) {
    super(props)
    console.log('tab-item-3===>constructor')
  }
  onActive = () => {
    console.log('tab-item-3 is active!')
  }
  componentDidMount () {
    console.log('tab-item-3', 'componentDidMount')
  }
  componentWillUnmount () {
    console.log('tab-item-3', 'componentWillUnmount')
  }
  render () {
    return <Text>tab-item-3</Text>
  }
}
