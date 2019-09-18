import { h } from 'preact'
import Scroller from '@ruiyun/preact-m-scroller'
import DemoTitle from '../DemoTitle'

const DemoPage = ({ children, height = '100%', title }) => (
  <Scroller height={height}>
    <DemoTitle title={title} />
    {children}
  </Scroller>
)

export default DemoPage
