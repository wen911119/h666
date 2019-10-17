import { h } from 'preact'
import { SlotColumnView, RowView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import Line from '@ruiyun/preact-line'
import DemoPage from '../../components/DemoPage'

const LineDemo = () => (
  <DemoPage title='Line'>
    <SlotColumnView
      margin={[30, 30, 30, 30]}
      padding={[30, 0, 30, 0]}
      bgColor='#fff'
      hAlign='center'
      slot={30}
    >
      <Text>默认(水平1像素)：</Text>
      <Line />
      <Text>加粗：</Text>
      <Line size='4px' />
      <Text>变色：</Text>
      <Line color='#f8584f' />
      <Text>两端缩进：</Text>
      <Line color='#CCCCFF' indent={[30, 30]} />
      <Text>纵向：</Text>
      <RowView height={60}>
        <Line color='#CCCCFF' v />
      </RowView>
    </SlotColumnView>
  </DemoPage>
)

export default LineDemo
