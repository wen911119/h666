import { h, Component } from 'preact'
import TabBar from '@ruiyun/preact-m-tabbar'

import BaseComponents from './baseComponents'
import ComposeComponents from './composeComponents'

import './app.css'

const tabbarConfig = {
  options: [
    {
      text: '基础组件',
      icon: 'icon-zujian'
    },
    {
      text: '复合组件',
      icon: 'icon-zujian1'
    },
    {
      text: '表单',
      icon: 'icon-biaodan'
    },
    {
      text: '路由',
      icon: 'icon-luyou'
    }
  ],
  color: '#A9AEB1',
  activeColor: '#30AD1C',
  textSize: 24,
  iconSize: 40
}

export default class Index extends Component {
  // demos: [
  //   'buttonDemo',
  //   'actionsheetDemo',
  //   'dialogDemo',
  //   'modalDemo',
  //   'swiperDemo',
  //   'tabsDemo',
  //   'formDemo',
  //   'switchDemo',
  //   'searchPickerDemo',
  //   'tabbarDemo',
  //   'treepickerDemo'
  // ]

  render () {
    return (
      <TabBar config={tabbarConfig}>
        <BaseComponents />
        <ComposeComponents />
        <BaseComponents />
        <BaseComponents />
      </TabBar>
    )
  }
}
