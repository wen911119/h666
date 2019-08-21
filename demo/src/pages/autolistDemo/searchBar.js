import { h } from 'preact'
import { SlotRowView } from '@ruiyun/preact-layout-suite'
import Image from '@ruiyun/preact-image'
import Text from '@ruiyun/preact-text'
import searchIcon from '../../assets/search.jpg'
import SearchInput from '../../components/SearchInput'

const SearchBar = props => (
  <SlotRowView
    padding={[30, 30, 30, 30]}
    hAlign='center'
    bgColor='#fff'
    slot={20}
  >
    <SlotRowView
      padding={[0, 30, 0, 30]}
      slot={13}
      height={60}
      // width={690}
      bgColor='#F8F9FD'
      style={{ borderRadius: '0.4rem', flex: 1 }}
    >
      <Image src={searchIcon} height={40} width={40} />
      <SearchInput
        height={40}
        type='search'
        textSize={28}
        style={{ backgroundColor: '#F8F9FD' }}
        formStyle={{ flex: 1 }}
        {...props}
      />
    </SlotRowView>
    <Text size={30} color='#919191' onClick={props.close}>
        取消
    </Text>
  </SlotRowView>
)

export default SearchBar
