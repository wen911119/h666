import { h, Component } from 'preact'
import Switch from '@ruiyun/preact-switch'

export default class SwitchDemo extends Component {
  state = {
    switch1: true,
    switch2: false,
    switch3: true,
    switch4: false
  }
  onChange1 = v => {
    console.log('switch1=>', v)
  }
  onChange2 = v => {
    console.log('switch2=>', v)
  }
  onReset = () => {
    this.setState({ switch1: true, switch2: false })
  }
  render () {
    console.log('render SwitchDemo')
    return (
      <div>
        SwitchDemo
        <div>
          switch1(默认)
          <Switch
            value={this.state.switch1}
            onChange={this.onChange1}
          />
        </div>
        <div>
          switch2(自定义大小颜色)
          <Switch
            value={this.state.switch2}
            color='#fc9153'
            size={150}
            onChange={this.onChange2}
          />
        </div>
        <div>
          switch3(默认+on+disabled)
          <Switch disabled value={this.state.switch3} />
        </div>
        <div>
          switch4(默认+off+disabled)
          <Switch disabled value={this.state.switch4} />
        </div>
        <div onClick={this.onReset}>重置</div>
      </div>
    )
  }
}
