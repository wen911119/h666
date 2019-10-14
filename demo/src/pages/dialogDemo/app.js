import { h, Component } from 'preact'
import { WithDialog } from '@ruiyun/preact-m-dialog'
import Image from '@ruiyun/preact-image'
import { SlotColumnView } from '@ruiyun/preact-layout-suite'
import Button from '@ruiyun/preact-button'
import imageDemo from '../../assets/img-demo.jpg'
import DemoPage from '../../components/DemoPage'

@WithDialog
export default class DialogDemo extends Component {
  onBtnClick = (index, value) => {
    console.log('kkk', index, value)
  }
  openAlert = () => {
    this.props.$alert({
      title: '我是标题',
      content:
        '我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容',
      btn: '确定',
      cb: this.onBtnClick
    })
  }
  openConfirm = () => {
    this.props.$confirm({
      title: '无法访问照片',
      content: '你未开启“允许网易云音乐访问照片”选项',
      btns: ['知道了', '去设置'],
      cb: this.onBtnClick
    })
  }

  openPrompt = () => {
    this.props.$prompt({
      title: '修改手机号',
      // content: '修改手机号后需要重新登录',
      placeholder: '请输入手机号',
      value: '13020271611',
      btns: ['取消', '确定'],
      config: {
        btnsColor: ['#999']
      },
      cb: this.onBtnClick
    })
  }

  openSlotDialog = () => {
    this.props.$alert({
      title: '我是标题',
      // content:
      //   '自定义插槽可以是任何内容比如图片',
      btn: '确定',
      cb: this.onBtnClick,
      slot: () => <Image src={imageDemo} width={300} height={150} />
    })
  }

  render () {
    return (
      <DemoPage title='Dialog'>
        <SlotColumnView hAlign='center' slot={30}>
          <Button onClick={this.openAlert} color='#99CC33' width={600} height={80}>alert</Button>
          <Button onClick={this.openConfirm} color='#99CCFF' width={600} height={80}>confirm</Button>
          <Button onClick={this.openPrompt} color='#99CCCC' width={600} height={80}>prompt</Button>
          <Button onClick={this.openSlotDialog} color='#CC6699' width={600} height={80}>slot-dialog</Button>
        </SlotColumnView>
      </DemoPage>
    )
  }
}
