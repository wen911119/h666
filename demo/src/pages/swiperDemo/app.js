import { h, Component } from 'preact'
import { XCenterView, RowView } from '@ruiyun/preact-layout-suite'
import Swiper from '@ruiyun/preact-m-swiper'
import Button from '@ruiyun/preact-button'
import Text from '@ruiyun/preact-text'

import DemoPage from '../../components/DemoPage'

const Item1 = (props) => {
  console.log('render-item-1', props.active)
  return (
    <RowView
      height={414}
      hAlign='center'
      bgColor='#66CC00'
      margin={[0, 30, 0, 30]}
    >
      <Text color='#fff'>{props.text}</Text>
    </RowView>
  )
}

const Item2 = (props) => {
  console.log('render-item-2', props.active)
  return (
    <RowView
      height={414}
      hAlign='center'
      bgColor='#99CCFF'
      margin={[0, 30, 0, 30]}
    >
      <Text color='#fff'>{props.text}</Text>
    </RowView>
  )
}

const Item3 = (props) => {
  console.log('render-item-3', props.active)
  return (
    <RowView
      height={414}
      hAlign='center'
      bgColor='#fff'
      margin={[0, 30, 0, 30]}
    >
      <Button color='#f8584f' onClick={props.onClick} height={80} width={350}>
        点我回到第二张
      </Button>
    </RowView>
  )
}
export default class ScrollerDemo extends Component {
  state = {
    current: 0,
  }

  onSwipe = (index) => {
    this.setState({ current: index })
  }

  doSwipe = () => {
    this.setState({ current: 1, text: '第一张2' })
  }

  render() {
    return (
      <DemoPage title='Swiper'>
        <Swiper onChange={this.onSwipe} activeIndex={this.state.current}>
          <Item1 text='左滑切换到第二个' />
          <Item2 text='这是第二个' />
          <Item3 onClick={this.doSwipe} />
        </Swiper>
        <XCenterView height={100}>
          <Text>{`(${this.state.current + 1}/3)`}</Text>
        </XCenterView>
      </DemoPage>
    )
  }
}
