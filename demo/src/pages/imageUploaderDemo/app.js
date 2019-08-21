import { h, Component } from 'preact'
import Uploader from '@ruiyun/preact-image-uploader'
import { WithOSS } from '@ruiyun/preact-oss'
import { RowView, SlotColumnView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import style from './app.css'

const getOSSConfig = async () =>
  // const { success, data } = await getSts()
  // if (success) {
  //   return {
  //     region: 'oss-cn-shanghai',
  //     accessKeyId: data.AccessKeyId,
  //     accessKeySecret: data.AccessKeySecret,
  //     bucket: 'zhongzhi-dev-idcard-image',
  //     stsToken: data.SecurityToken,
  //     secure: true
  //   }
  // }
  // return null
  ({
    region: 'oss-cn-shanghai',
    accessKeyId: 'LTAIpnyXCaVMB88z',
    accessKeySecret: 'y4tw2Qv8oHK91QVBwWyMg8rXkAFTvH',
    bucket: 'hua-chao-shang-mao'
  })

const ImageUploaderWithOSS = WithOSS({
  getOSSConfig,
  genFileName: file => '/test/' + file.name.replace('.', `-${Date.now()}.`)
})(Uploader)

export default class ImageUploaderDemo extends Component {
  state = {
    name: 'wenjun',
    images: []
  }
  onUpload = urls => {
    this.setState({
      images: urls
    })
  }
  renderPlaceHolder = () => (
    <SlotColumnView hAlign='center' vAlign='center'>
      <Text size={90} color='#ccc'>
        +
      </Text>
      <Text size={24} color='#ccc'>
        {this.state.images.length > 0 ? '国徽面照片' : '人像面照片'}
      </Text>
    </SlotColumnView>
  )
  render () {
    return (
      <div>
        ImageUploaderDemo
        <div className={style.test}>{this.state.name}</div>
        <RowView padding={[30, 30, 30, 30]}>
          <ImageUploaderWithOSS
            size={[330, 200]}
            rowSlot={30}
            rowItems={2}
            max={2}
            onChange={this.onUpload}
            placeholder={this.renderPlaceHolder}
          />
        </RowView>
        <RowView padding={[30, 30, 30, 30]}>
          <ImageUploaderWithOSS
            max={9}
            onChange={this.onUpload}
          />
        </RowView>
      </div>
    )
  }
}
