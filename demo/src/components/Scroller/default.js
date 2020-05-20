import { h } from 'preact'
import { XCenterView, RowView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import Loading from '@ruiyun/preact-loading'
import classNames from './default.css'

const STAGE_MAP = {
  hide: '',
  show: '上拉加载更多',
  loading: '加载中...',
  nomore: '没有更多了~',
  error: '加载出错，点击重试'
}

export const DefaultLoadMoreFooter = ({ stage, onRetry }) => {
  return stage !== 'hide' ? (
    <XCenterView height={80} onClick={stage === 'error' ? onRetry : undefined}>
      <Text color='#ccc' size={26}>
        {STAGE_MAP[stage]}
      </Text>
    </XCenterView>
  ) : (
    undefined
  )
}

export const DefaultRefreshHeader = ({
  stage,
  refreshHeaderHeight = 50,
  distance
}) => {
  return (
    <RowView
      height={refreshHeaderHeight + 'px'}
      hAlign='center'
      style={{
        transition: stage > 2 ? 'margin-top 330ms' : 'none',
        marginTop: `${distance - refreshHeaderHeight}px`
      }}
    >
      {stage === 3 ? (
        <Loading />
      ) : (
        <css-icon
          className={classNames['icon-downward']}
          style={{
            transform: stage === 2 ? `rotate(180deg)` : `rotate(0deg)`
          }}
        />
      )}
    </RowView>
  )
}
