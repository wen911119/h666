import { h } from 'preact'
import { SlotColumnView } from '@ruiyun/preact-layout-suite'
import Icon from '@ruiyun/preact-icon'
import Text from '@ruiyun/preact-text'
const EmptyView = ({ text = '暂无数据' } = {}) => (
  <SlotColumnView
    hAlign='center'
    slot={30}
    bgColor='#fff'
    padding={[300, 0, 200, 0]}
  >
    <Icon name='iconzanwushuju' color='#f3f3f3' size={100} />
    <Text size={26} color='#999999'>
      {text}
    </Text>
  </SlotColumnView>
)
export default EmptyView
