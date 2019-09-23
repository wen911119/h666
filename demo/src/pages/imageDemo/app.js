import { h } from 'preact'
import Text from '@ruiyun/preact-text'
import { SlotColumnView } from '@ruiyun/preact-layout-suite'
import Image from '@ruiyun/preact-image'

import DemoPage from '../../components/DemoPage'
import demoImage from '../../assets/img-demo.jpg'

const ImageDemo = () => (
  <DemoPage title='Image'>
    <SlotColumnView slot={30} hAlign='center' padding={[30, 30, 30, 30]}>
      <Text size={24} color='#919191'>
        默认模式，严格按照所设置宽高显示（原图700*375，显示400*200）
      </Text>
      <Image
        src={demoImage}
        width={400}
        height={200}
        style={{ border: '1px solid #f8584f', boxSizing: 'content-box' }}
      />
      <Text size={24} color='#919191'>
        默认模式设置的宽高比例和原图比例不一致则会有拉伸（原图700*375，显示400*400）
      </Text>
      <Image
        src={demoImage}
        width={400}
        height={400}
        style={{ border: '1px solid #f8584f', boxSizing: 'content-box' }}
      />
      <Text size={24} color='#919191'>
        fit模式，保证不裁剪不拉伸但有留白（原图700*375，显示400*400）
      </Text>
      <Image
        src={demoImage}
        width={400}
        height={400}
        mode='fit'
        style={{ border: '1px solid #f8584f', boxSizing: 'content-box' }}
      />
      <Text size={24} color='#919191'>
        fill模式，保证不留白不拉伸但有裁剪（原图700*375，显示400*400）
      </Text>
      <Image
        src={demoImage}
        width={400}
        height={400}
        mode='fill'
        style={{ border: '1px solid #f8584f', boxSizing: 'content-box' }}
      />
    </SlotColumnView>
  </DemoPage>
)

export default ImageDemo
