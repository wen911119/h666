import { h, Component } from 'preact'
import { WithActionSheet } from '@ruiyun/preact-m-actionsheet'

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
      <div>
        <div onClick={this.openActionSheet}>打开ActionSheet</div>
      </div>
    )
  }
}
