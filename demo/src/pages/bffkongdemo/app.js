import { h, Component } from 'preact'
import Ajax from '@ruiyun/ajax'
import Button from '@ruiyun/preact-button'
import { XCenterView } from '@ruiyun/preact-layout-suite'
import DemoPage from '../../components/DemoPage'

export default class Bffkongdemo extends Component {
  state = {
    name: 'wenjun',
  }

  onHandleClick = async () => {
    const ret = await Ajax.post('https://api.ruiyun2015.com/dog/add', {
      name: '大黄',
      age: 3,
      color: 'yellow',
    })
    console.log({ ret })
  }

  render() {
    return (
      <DemoPage title='分享演示'>
        <XCenterView height={300}>
          <Button
            color='#f8584f'
            width={300}
            height={80}
            onClick={this.onHandleClick}
          >
            发送请求
          </Button>
        </XCenterView>
      </DemoPage>
    )
  }
}
