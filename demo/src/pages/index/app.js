import { h, Component } from 'preact'
import TabBar from '@ruiyun/preact-m-tabbar'

import BaseComponents from './baseComponents'
import DecoratorComponents from './decoratorComponents'
import ComposeComponents from './composeComponents'
import Metric from './metric'

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
      text: 'API',
      icon: 'icon-api1'
    },
    {
      text: '指标',
      icon: 'icon-zhibiao2'
    }
  ],
  color: '#A9AEB1',
  activeColor: '#30AD1C',
  textSize: 24,
  iconSize: 40
}

export default class Index extends Component {
  render () {
    return (
      <TabBar config={tabbarConfig}>
        <BaseComponents />
        <ComposeComponents />
        <DecoratorComponents />
        <Metric />
      </TabBar>
    )
  }
}
