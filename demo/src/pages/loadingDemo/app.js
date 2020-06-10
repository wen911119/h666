import { h, Component } from 'preact'
import { RowView, SlotColumnView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import Loading from '@ruiyun/preact-loading'
import DemoPage from '../../components/DemoPage'

export default class LoadingDemo extends Component {
  state = {
    name: 'wenjun',
  }

  render() {
    return (
      <DemoPage title='Loading'>
        <SlotColumnView
          slot={30}
          bgColor='#fff'
          hAlign='center'
          margin={[30, 30, 30, 30]}
          padding={[30, 30, 30, 30]}
        >
          <RowView>
            <Text>默认：</Text>
            <Loading />
          </RowView>
          <RowView>
            <Text>加大：</Text>
            <Loading size={60} />
          </RowView>
          <RowView>
            <Text>变色：</Text>
            <Loading color='#99CC66' />
          </RowView>
        </SlotColumnView>
      </DemoPage>
    )
  }
}
