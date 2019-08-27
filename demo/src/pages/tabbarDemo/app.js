import { h, Component } from 'preact'
import TabBar from '../../components/TabBar'
import Item1 from './tab1'
import Item2 from './tab2'
import Item3 from './tab3'

const tabbarConfig = {
  options: [
    {
      text: '大咖秀',
      icon: 'icon-viedo'
    },
    {
      text: '线下活动',
      icon: 'icon-job'
    },
    {
      text: '我的',
      icon: 'icon-user'
    }
  ],
  color: '#ccc',
  activeColor: '#659AF4',
  textSize: 24,
  iconSize: 40
}

export default class TabbarDemo extends Component {
  state = {
    name: 'wenjun'
  }
  render () {
    return (
      <TabBar config={tabbarConfig}>
        <Item1 />
        <Item2 />
        <Item3 />
      </TabBar>
    )
  }
}
