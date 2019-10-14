import { h, Component } from 'preact'
import { WithDialog } from '@ruiyun/preact-m-dialog'
import Image from '@ruiyun/preact-image'

@WithDialog
export default class TabsDemo extends Component {
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
      //   '我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容',
      btn: '确定',
      cb: this.onBtnClick,
      slot: () => (
        <Image
          src='https://img.banggo.com/sources/cms/banggo2017/APP/LB65-1.jpg'
          width={200}
          height={100}
        />
      )
    })
  }

  render () {
    return (
      <div>
        <div style={{ height: '1000px' }} />
        <div onClick={this.openAlert}>打开alert</div>
        <div onClick={this.openConfirm}>打开confirm</div>
        <div onClick={this.openPrompt}>打开prompt</div>
        <div onClick={this.openSlotDialog}>打开slot-dialog</div>
      </div>
    )
  }
}
