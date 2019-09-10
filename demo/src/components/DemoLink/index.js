import { h } from 'preact'
import WithNav from '@ruiyun/preact-m-nav'
import { RowView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import Icon from '@ruiyun/preact-icon'

const DemoLink = ({ demo, $nav }) => (
  <RowView
    height={100}
    padding={[0, 30, 0, 30]}
    onClick={() => $nav.push(demo.route)}
    bgColor='#fff'
    hAlign='between'
    margin={[0, 0, 20, 0]}
  >
    <Text>{demo.name}</Text>
    <Icon name='icon-qianjin' color='#919191' />
  </RowView>
)

export default WithNav(DemoLink)
