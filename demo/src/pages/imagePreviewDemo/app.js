import { h, Component } from 'preact'
import Text from '@ruiyun/preact-text'
import { RowView } from '@ruiyun/preact-layout-suite'
import WithImagePreview from '@ruiyun/preact-m-image-preview'
import Image from '@ruiyun/preact-image'
import DemoPage from '../../components/DemoPage'

@WithImagePreview
export default class ImagePreviewDemo extends Component {
  state = {
    images: [
      'https://h666-demo.ruiyun2015.com/1910151352-1.jpg',
      'https://h666-demo.ruiyun2015.com/1910151352-2.jpg',
      'https://h666-demo.ruiyun2015.com/1910151352-5.jpg',
    ],
  }

  preview = (index) => {
    this.props.$preview(this.state.images, index)
  }

  render() {
    return (
      <DemoPage title='ImagePreview'>
        <RowView hAlign='center'>
          <Text size={26} color='#CC9999'>
            点击下面的任意一张图进入预览模式(可滑动切换)
          </Text>
        </RowView>
        <RowView
          hAlign='between'
          padding={[30, 15, 30, 15]}
          bgColor='#fff'
          margin={[30, 30, 30, 30]}
        >
          {this.state.images.map((url, index) => (
            <Image
              key={url}
              src={url}
              width={200}
              height={100}
              // eslint-disable-next-line
              onClick={this.preview.bind(this, index)}
            />
          ))}
        </RowView>
      </DemoPage>
    )
  }
}
