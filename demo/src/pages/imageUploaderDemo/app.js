import { h, Component } from 'preact'
import Uploader from '@ruiyun/preact-image-uploader'
import { WithOSS } from '@ruiyun/preact-oss'
import { RowView, SlotColumnView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import Line from '@ruiyun/preact-line'
import DemoPage from '../../components/DemoPage'

// 可以是async异步获取
const getOSSConfig = () => ({
  region: 'oss-cn-shanghai',
  accessKeyId: window.atob('TFRBSTRHSGhzNDZRTDRHSnRlRW56UWM2'),
  accessKeySecret: window.atob('T29xTzVMMTNFTEpwYVBORmJpdVFYb3NpeE9HWFR3'),
  bucket: 'hua-chao-shang-mao',
})

const ImageUploaderWithOSS = WithOSS({
  getOSSConfig,
  genFileName: (file) => '/test/' + file.name.replace('.', `-${Date.now()}.`),
})(Uploader)

export default class ImageUploaderDemo extends Component {
  state = {
    name: 'wenjun',
    images: [],
  }

  onUpload = (urls) => {
    this.setState({
      images: urls,
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

  render() {
    return (
      <DemoPage title='ImageUploader'>
        <SlotColumnView slot={30} padding={[0, 0, 100, 0]}>
          <RowView padding={[0, 50, 50, 50]}>
            <Text size={26} style={{ textAlign: 'center' }} color='#CC9999'>
              图片上传组件需要装载驱动才可以使用。这里演示的是上传到阿里云OSS，用的是@ruiyun/preact-oss这个驱动。如果需要上传到其它平台，则更换其它驱动即可。
            </Text>
          </RowView>
          <SlotColumnView slot={10} padding={[0, 30, 0, 30]}>
            <Text color='#FF9900' weight='bold'>
              默认形态:
            </Text>
            <Text size={24} color='#99CCCC'>
              配置：max=3，size=[190, 190]
            </Text>
          </SlotColumnView>
          <RowView padding={[30, 30, 30, 30]} bgColor='#fff'>
            <ImageUploaderWithOSS
              size={[210, 210]}
              max={3}
              onChange={this.onUpload}
            />
          </RowView>
          <RowView height={60}>
            <Line color='#ccc' />
          </RowView>
          <SlotColumnView slot={10} padding={[0, 30, 0, 30]}>
            <Text color='#FF9900' weight='bold'>
              自定义形态:
            </Text>
            <Text size={24} color='#99CCCC'>
              配置：max=2，size=[330, 200], rowSlot=30, rowItems=2
            </Text>
          </SlotColumnView>
          <RowView padding={[30, 30, 30, 30]} bgColor='#fff'>
            <ImageUploaderWithOSS
              size={[330, 200]}
              rowSlot={30}
              rowItems={2}
              max={2}
              onChange={this.onUpload}
              placeholder={this.renderPlaceHolder}
            />
          </RowView>
        </SlotColumnView>
      </DemoPage>
    )
  }
}
