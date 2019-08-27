import { h, Component, toChildArray, cloneElement } from 'preact'
import {
  ColumnView,
  RowView,
  SlotColumnView
} from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import Icon from '@ruiyun/preact-icon'
import className from './index.css'

class Item extends Component {
  shouldComponentUpdate () {
    // 切换tab不需要重新rerender子元素
    return false
  }
  render () {
    const { children } = this.props
    return children
  }
}

export default class Tabbar extends Component {
  refsArr = []
  state = {
    index: 0
  }
  onSwitch = index => {
    this.setState(
      {
        index
      },
      () => {
        const onActive = this.refsArr[index].onActive
        onActive && onActive()
      }
    )
  }
  render () {
    const { index } = this.state
    const {
      children,
      config: { options, color, activeColor, textSize, iconSize },
      padding = [10, 50, 0, 50],
      slot = 5
    } = this.props
    const childrenArr = toChildArray(children)
    return (
      <ColumnView height='100%'>
        {childrenArr.map((child, key) => (
          <div
            key={key}
            className={className.item}
            style={{
              display: key === index ? 'block' : 'none'
            }}
          >
            <Item>
              {cloneElement(child, {
                ref: s => (this.refsArr[key] = s)
              })}
            </Item>
          </div>
        ))}
        <RowView
          hAlign='between'
          padding={padding}
          className={className.noShrink}
          style={{ boxShadow: '0px -5px 5px -5px rgba(0,0,0,.1)' }}
        >
          {options.map((item, i) => (
            <SlotColumnView
              slot={slot}
              hAlign='center'
              // eslint-disable-next-line
              onClick={this.onSwitch.bind(this, i)}
              key={item.text}
            >
              <Icon
                name={item.icon}
                size={iconSize}
                color={index === i ? activeColor : color}
              />
              <Text size={textSize} color={index === i ? activeColor : color}>
                {item.text}
              </Text>
            </SlotColumnView>
          ))}
        </RowView>
      </ColumnView>
    )
  }
}
