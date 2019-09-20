import { h } from 'preact'
import { SlotColumnView } from '@ruiyun/preact-layout-suite'
import Button, { FlatButton, TextButton } from '@ruiyun/preact-button'

import DemoPage from '../../components/DemoPage'

const ButtonDemo = () => (
  <DemoPage title='Button'>
    <SlotColumnView slot={50} hAlign='center'>
      <TextButton padding={[10, 30, 10, 30]} textColor='#15b3e8'>
        文字按钮
      </TextButton>
      <FlatButton
        width={120}
        height={60}
        textSize={22}
        borderRadius={0}
        borderColor='#ccc'
        disable={false}
      >
        扁平按钮
      </FlatButton>
      <Button color='#F1722D' height={70} width={450} bdr={35}>
        推荐餐厅(定长定宽)
      </Button>
      <Button
        textSize={32}
        style={{ boxShadow: '0px 8px 8px 0px rgba(0,0,0,0.1)' }}
        color='#5581fa'
        width={380}
        height={80}
        borderRadius={10}
        disable
      >
        确认添加(disable)
      </Button>
      <Button
        style={{ boxShadow: '0px 8px 8px 0px rgba(0,0,0,0.1)' }}
        color='#5581fa'
        padding={[10, 30, 10, 30]}
      >
        确认(动态宽高)
      </Button>
    </SlotColumnView>
  </DemoPage>
)

export default ButtonDemo
