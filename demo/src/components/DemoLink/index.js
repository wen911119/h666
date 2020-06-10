import { h } from 'preact'
import WithRouter from '@ruiyun/preact-m-router'
import { RowView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import Icon from '@ruiyun/preact-icon'

const DemoLink = ({ demo, $router, action = 'push' }) => (
  <RowView
    height={100}
    padding={[0, 30, 0, 30]}
    onClick={() => {
      $router[action](
        demo.route,
        {},
        {
          title: demo.name,
        }
      )
    }}
    bgColor='#fff'
    hAlign='between'
    margin={[0, 0, 20, 0]}
  >
    <Text>{demo.name}</Text>
    <Icon name='icon-qianjin' color='#919191' />
  </RowView>
)

export default WithRouter(DemoLink)
