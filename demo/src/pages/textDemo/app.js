import { h } from 'preact'
import Text from '@ruiyun/preact-text'
import { SlotColumnView } from '@ruiyun/preact-layout-suite'

import DemoPage from '../../components/DemoPage'

const TextDemo = () => (
  <DemoPage title='Text'>
    <SlotColumnView
      hAlign='center'
      vAlign='center'
      margin={[0, 30, 0, 30]}
      padding={[50, 0, 50, 0]}
      bgColor='#fff'
      slot={10}
    >
      <Text>这是一句默认文本</Text>
      <Text size={40}>这是一句大一点的文本</Text>
      <Text color='#ccc'>这是一句灰一点的文本</Text>
      <Text weight='bold'>这是一句粗一点的文本</Text>
      <Text weight='bold' size={24} color='#f8584f'>这是一句完全不同的文本</Text>
    </SlotColumnView>
  </DemoPage>
)

export default TextDemo
