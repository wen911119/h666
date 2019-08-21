import { h, Component } from 'preact'
import WithNav from '@ruiyun/preact-m-nav'
import { XCenterView } from '@ruiyun/preact-layout-suite'
// import TouchOpacity from '../../components/TouchOpacity'
import Button, { FlatButton, TextButton } from '@ruiyun/preact-button'
import style from './app.css'

@WithNav
export default class Index extends Component {
  state = {
    name: 'wenjun1991'
  }
  goto = () => {
    // this.props.$nav.push('list')
    console.log('list')
  }
  clickHandler = target => {
    console.log(target)
  }
  render () {
    return (
      <div>
        <TextButton
          padding={[10, 30, 10, 30]}
          onClick={this.clickHandler.bind(this, '文字按钮')}
          textColor='#15b3e8'
        >
          文字按钮
        </TextButton>
        <div className={style.test}>{this.state.name}</div>
        <div onClick={this.goto}>go to list</div>
        <XCenterView height={200}>
          <FlatButton
            width={120}
            height={60}
            textSize={22}
            borderRadius={0}
            borderColor='#ccc'
            disable={false}
            onClick={this.clickHandler.bind(this, '我是按钮')}
          >
            我是按钮
          </FlatButton>
        </XCenterView>
        <XCenterView height={200}>
          <Button
            onClick={this.clickHandler.bind(this, '推荐餐厅')}
            color='#F1722D'
            height={70}
            width={450}
            bdr={35}
          >
            推荐餐厅
          </Button>
        </XCenterView>
        <XCenterView height={200}>
          <Button
            onClick={this.clickHandler.bind(this, '确认添加')}
            textSize={32}
            style={{ boxShadow: '0px 8px 8px 0px rgba(0,0,0,0.1)' }}
            color='#5581fa'
            width={280}
            height={80}
            borderRadius={10}
            disable
          >
            确认添加
          </Button>
        </XCenterView>
        <XCenterView height={200}>
          <Button
            onClick={this.clickHandler.bind(this, '确认添加确认添加')}
            style={{ boxShadow: '0px 8px 8px 0px rgba(0,0,0,0.1)' }}
            color='#5581fa'
            padding={[10, 30, 10, 30]}
          >
            确认添加确认添加
          </Button>
        </XCenterView>
      </div>
    )
  }
}
