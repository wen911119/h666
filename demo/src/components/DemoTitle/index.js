import { h } from 'preact'
import { SlotColumnView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import Line from '@ruiyun/preact-line'

const DemoTitle = ({ title }) => (
  <SlotColumnView
    hAlign='center'
    vAlign='center'
    slot={20}
    padding={[100, 300, 100, 300]}
  >
    <Text color='#B8B9BA'>{title}</Text>
    <Line size='3px' color='#D2D3D4' />
  </SlotColumnView>
)

export default DemoTitle
