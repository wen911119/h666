import { h, Component } from 'preact'
import { WithActionSheet } from '@ruiyun/preact-m-actionsheet'
import { SlotColumnView } from '@ruiyun/preact-layout-suite'
import Image from '@ruiyun/preact-image'
import Button from '@ruiyun/preact-button'
import DemoPage from '../../components/DemoPage'
import codeImg from '../../assets/declarative.jpg'

@WithActionSheet
export default class ActionSheetDemo extends Component {
  openActionSheet = () => {
    this.props
      .$actionsheet(
        '选择发票类型',
        ['增值税普通发票', '电子发票', '定额发票'],
        { cancelColor: '#f8584f' }
      )
      .then(index => {
        console.log(index)
      })
  }

  render () {
    return (
      <DemoPage title='ActionSheet'>
        <SlotColumnView slot={30} hAlign='center'>
          <Image src={codeImg} width={626} height={334} />
          <Button width={600} height={80} color='#99CC66' onClick={this.openActionSheet}>打开ActionSheet</Button>
        </SlotColumnView>
      </DemoPage>
    )
  }
}
