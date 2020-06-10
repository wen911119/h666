import { h, Component } from 'preact'
import { XCenterView, SlotColumnView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import { WithModal } from '@ruiyun/preact-modal'
import Button from '@ruiyun/preact-button'

import DemoPage from '../../components/DemoPage'

const renderModalContent = () => (
  <XCenterView height={300} bgColor='#fff' width={600}>
    <Text>modal</Text>
  </XCenterView>
)

const renderLeftModalContent = () => (
  <XCenterView height='100vh' bgColor='#fff' width={600}>
    <Text>left-modal</Text>
  </XCenterView>
)

const renderRightModalContent = () => (
  <XCenterView height='100vh' bgColor='#fff' width={600}>
    <Text>right-modal</Text>
  </XCenterView>
)

const renderTopModalContent = () => (
  <XCenterView width='100vw' bgColor='#fff' height={400}>
    <Text>top-modal</Text>
  </XCenterView>
)

const renderBottomModalContent = () => (
  <XCenterView width='100vw' height='80vh' bgColor='#fff'>
    <Text>bottom-modal</Text>
  </XCenterView>
)

@WithModal
export default class TabsDemo extends Component {
  openCenterModal = () => {
    this.props.$modal.show({ content: renderModalContent, mask: 0.5 })
  }

  openLeftModal = () => {
    this.props.$modal.show({
      content: renderLeftModalContent,
      position: 'left',
    })
  }

  openRightModal = () => {
    this.props.$modal.show({
      content: renderRightModalContent,
      position: 'right',
    })
  }

  openTopModal = () => {
    this.props.$modal.show({
      content: renderTopModalContent,
      position: 'top',
    })
  }

  openBottomModal = () => {
    this.props.$modal.show({
      content: renderBottomModalContent,
      position: 'bottom',
    })
  }

  render() {
    return (
      <DemoPage title='Modal'>
        <SlotColumnView hAlign='center' slot={30}>
          <Button
            onClick={this.openCenterModal}
            color='#99CC33'
            width={600}
            height={80}
          >
            打开modal(中间)
          </Button>
          <Button
            onClick={this.openLeftModal}
            color='#99CCFF'
            width={600}
            height={80}
          >
            打开modal(左边)
          </Button>
          <Button
            onClick={this.openRightModal}
            color='#99CCCC'
            width={600}
            height={80}
          >
            打开modal(右边)
          </Button>
          <Button
            onClick={this.openTopModal}
            color='#CCCCFF'
            width={600}
            height={80}
          >
            打开modal(上边)
          </Button>
          <Button
            onClick={this.openBottomModal}
            color='#CC6699'
            width={600}
            height={80}
          >
            打开modal(下边)
          </Button>
        </SlotColumnView>
      </DemoPage>
    )
  }
}
