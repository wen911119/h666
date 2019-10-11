import { h } from 'preact'
import Input from '@ruiyun/preact-input'
import Text from '@ruiyun/preact-text'
import NumberInput from '@ruiyun/preact-number-input'
import SearchInput from '@ruiyun/preact-m-search-input'
import { SlotColumnView, RowView } from '@ruiyun/preact-layout-suite'
import { useState } from 'preact/hooks'
import DemoPage from '../../components/DemoPage'

import classNames from './app.css'

const InputDemo = () => {
  const [keywords, updateKeywords] = useState()
  return (
    <DemoPage title='input'>
      <SlotColumnView hAlign='center' vAlign='center' slot={20} padding={[0, 0, 100, 0]}>
        <Text color='#FF9966'>最基本的文本输入框(最多5个字)</Text>
        <Input
          className={classNames.input}
          height={60}
          width={550}
          maxlength={5}
          placeholder='请输入姓名'
        />
        <Text color='#FF9966'>整数输入框(最多3位)</Text>
        <NumberInput
          className={classNames.input}
          height={60}
          width={550}
          limit={3}
          placeholder='请输入年龄'
        />
        <Text color='#FF9966'>小数输入框(小数点后2位)</Text>
        <NumberInput
          className={classNames.input}
          float
          height={60}
          width={550}
          placeholder='请输入体重'
        />
        <Text color='#FF9966'>数字千分位</Text>
        <NumberInput
          className={classNames.input}
          float
          height={60}
          width={550}
          format='thousand'
          placeholder='请输入金额'
        />
        <Text color='#FF9966'>自定义格式化之(银行卡号)</Text>
        <NumberInput
          className={classNames.input}
          height={60}
          limit={19}
          width={550}
          format={{ delimiter: ' ', block: 4 }}
          placeholder='请输入银行卡号'
        />
        <SlotColumnView hAlign='center'>
          <Text color='#CC6699'>搜索输入框带</Text>
          <Text color='#CC6699' size={24}>带清除按钮</Text>
          <Text color='#CC6699' size={24}>输入去抖</Text>
          <Text color='#CC6699' size={24}>修复ios搜索键盘</Text>
          <Text color='#CC6699' size={24}>修复拼音输入备选词触发的bug</Text>
          <Text color='#336699' size={26}>【{keywords}】</Text>
        </SlotColumnView>
        <RowView height={60} width={550} bgColor='#fff' padding={[0, 15, 0, 15]}>
          <SearchInput
            className={classNames.searchinput}
            placeholder='请输入关键字搜索'
            value={keywords}
            onTextInput={updateKeywords}
          />
        </RowView>
      </SlotColumnView>
    </DemoPage>
  )
}

export default InputDemo
