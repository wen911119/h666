import { h, Component } from 'preact'
import Text from '@ruiyun/preact-text'

export default class Item3 extends Component {
  constructor(props) {
    super(props)
    console.log('tab-item-3===>constructor')
  }

  onTabShow = () => {
    console.log('tab-item-3 is show!')
  }

  onTabHide = () => {
    console.log('tab-item-3 is hide!')
  }

  componentDidMount() {
    console.log('tab-item-3', 'componentDidMount')
  }

  componentWillUnmount() {
    console.log('tab-item-3', 'componentWillUnmount')
  }

  render() {
    return <Text>tab-item-3</Text>
  }
}
