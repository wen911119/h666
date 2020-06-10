import { h } from 'preact'
import { ScrollerWithPreventBounce } from '@ruiyun/preact-m-scroller'
import DemoTitle from '../DemoTitle'

const DemoPage = ({ children, height = '100%', title }) => (
  <ScrollerWithPreventBounce height={height}>
    <DemoTitle title={title} />
    {children}
  </ScrollerWithPreventBounce>
)

export default DemoPage
