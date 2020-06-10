import { h, Component } from 'preact'
import SafeSet from 'lodash.set'
import Text from '@ruiyun/preact-text'
import { useState } from 'preact/hooks'
import {
  SlotColumnView,
  SlotRowView,
  RowView,
  XCenterView,
  ColumnView,
} from '@ruiyun/preact-layout-suite'
import Line from '@ruiyun/preact-line'
import { WithActionSheet } from '@ruiyun/preact-m-actionsheet'
import NumberInput from '@ruiyun/preact-number-input'
import classNames from './app.css'
import DemoPage from '../../components/DemoPage'

const Block = ({ children, subTitle, description }) => (
  <SlotColumnView slot={20} padding={[100, 30, 100, 30]}>
    <Text color='#99CC99'>{subTitle}</Text>
    <Text color='#CCCC66' size={22}>
      {description}
    </Text>
    {children}
  </SlotColumnView>
)
const NumericalUpdater = ({ onChange, value, name }) => (
  <RowView>
    <Text color='#919191' size={26}>
      {name} : &nbsp;
    </Text>
    <NumberInput
      value={value}
      onChange={onChange}
      height={50}
      width={100}
      className={classNames.input}
    />
  </RowView>
)
const BgColorUpdater = ({ onChange, value }) => (
  <RowView>
    <Text color='#919191' size={26}>
      bgColor : &nbsp;
    </Text>
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={classNames.colorinput}
      type='color'
    />
  </RowView>
)
const PaddingUpdater = ({ onChange, value }) => (
  <RowView>
    <Text color='#919191' size={26}>
      padding : &nbsp;
    </Text>
    <Text>[</Text>
    <NumberInput
      value={value[0]}
      onChange={onChange('padding.0')}
      height={50}
      width={50}
      className={classNames.input}
    />
    <Text>，</Text>
    <NumberInput
      value={value[1]}
      onChange={onChange('padding.1')}
      height={50}
      width={50}
      className={classNames.input}
    />
    <Text>，</Text>
    <NumberInput
      value={value[2]}
      onChange={onChange('padding.2')}
      height={50}
      width={50}
      className={classNames.input}
    />
    <Text>，</Text>
    <NumberInput
      value={value[3]}
      onChange={onChange('padding.3')}
      height={50}
      width={50}
      className={classNames.input}
    />
    <Text>]</Text>
  </RowView>
)

@WithActionSheet
class AlignUpdater extends Component {
  optionsMap = ['left', 'right', 'center', 'between', 'around']
  onClick = () => {
    this.props
      .$actionsheet('请选择', this.options, { cancelColor: '#f8584f' })
      .then((index) => {
        this.onChange(this.options[index])
      })
  }

  constructor(props) {
    super(props)
    this.onChange = props.onChange(props.type)
    if (props.type === 'vAlign') {
      this.options = ['top', 'bottom', 'center', 'between', 'around']
    } else {
      this.options = ['left', 'right', 'center', 'between', 'around']
    }
  }

  render() {
    const { value, type } = this.props
    return (
      <RowView>
        <Text color='#919191' size={26}>
          {type} : &nbsp;
        </Text>
        <XCenterView
          height={50}
          width={140}
          bgColor='#ffffff'
          onClick={this.onClick}
        >
          <Text>{value}</Text>
        </XCenterView>
      </RowView>
    )
  }
}

const LayoutDemo = () => {
  const [rowViewConfig, updateRowViewConfig] = useState({
    hAlign: 'left',
    vAlign: 'center',
    bgColor: '#ffffff',
    height: 200,
    padding: [0, 30, 0, 30],
  })
  const [columnViewConfig, updateColumnViewConfig] = useState({
    hAlign: 'left',
    vAlign: 'top',
    bgColor: '#ffffff',
    height: 400,
    padding: [30, 30, 30, 30],
  })
  const [slotRowViewConfig, updateSlotRowViewConfig] = useState({
    hAlign: 'left',
    vAlign: 'center',
    bgColor: '#ffffff',
    height: 200,
    padding: [0, 30, 0, 30],
    slot: 20,
  })
  const [slotColumnViewConfig, updateSlotColumnViewConfig] = useState({
    hAlign: 'left',
    vAlign: 'top',
    bgColor: '#ffffff',
    height: 400,
    padding: [30, 30, 30, 30],
    slot: 20,
  })
  const [xCenterViewConfig, updateXCenterViewConfig] = useState({
    bgColor: '#ffffff',
    height: 400,
    width: 400,
  })
  const loadTheUpdater = (updater) => (attribute) => (v) =>
    updater((oldConfig) =>
      SafeSet(
        Object.assign({}, oldConfig),
        attribute,
        isNaN(parseInt(v)) ? v : parseInt(v)
      )
    )
  const updateRowViewConfigOf = loadTheUpdater(updateRowViewConfig)
  const updateColumnViewConfigOf = loadTheUpdater(updateColumnViewConfig)
  const updateSlotRowViewConfigOf = loadTheUpdater(updateSlotRowViewConfig)
  const updateSlotColumnViewConfigOf = loadTheUpdater(
    updateSlotColumnViewConfig
  )
  const updateXCenterViewConfigOf = loadTheUpdater(updateXCenterViewConfig)
  return (
    <DemoPage title='Layout'>
      <RowView padding={[0, 50, 0, 50]}>
        <Text color='#CC9999' size={22} style={{ textAlign: 'center' }}>
          【布局套件】由以下5个子组件构成。可以通过配置项bgColor(背景色)、hAlign(水平对齐)、vAlign(垂直对齐)、slot(插槽)、height、padding灵活设置样式。组合使用几乎可以完成所有的页面布局
        </Text>
      </RowView>
      <Block
        subTitle='横向布局-RowView'
        description='默认hAlign=left,vAlign=center,padding=[0,0,0,0]'
      >
        <BgColorUpdater
          value={rowViewConfig.bgColor}
          onChange={updateRowViewConfigOf('bgColor')}
        />
        <NumericalUpdater
          onChange={updateRowViewConfigOf('height')}
          value={rowViewConfig.height}
          name='高度'
        />
        <PaddingUpdater
          value={rowViewConfig.padding}
          onChange={updateRowViewConfigOf}
        />
        <AlignUpdater
          value={rowViewConfig.hAlign}
          onChange={updateRowViewConfigOf}
          type='hAlign'
        />
        <AlignUpdater
          value={rowViewConfig.vAlign}
          onChange={updateRowViewConfigOf}
          type='vAlign'
        />
        <RowView {...rowViewConfig}>
          <Text color='#FFCC00'>Item-1</Text>
          <Text color='#009999'>Item-2</Text>
          <Text color='#CC3333'>Item-3</Text>
        </RowView>
      </Block>
      <Line color='#ccc' />
      <Block
        subTitle='纵向布局-ColumnView'
        description='默认hAlign=left,vAlign=top,padding=[0,0,0,0]'
      >
        <BgColorUpdater
          value={columnViewConfig.bgColor}
          onChange={updateColumnViewConfigOf('bgColor')}
        />
        <NumericalUpdater
          onChange={updateColumnViewConfigOf('height')}
          value={columnViewConfig.height}
          name='高度'
        />
        <PaddingUpdater
          value={columnViewConfig.padding}
          onChange={updateColumnViewConfigOf}
        />
        <AlignUpdater
          value={columnViewConfig.hAlign}
          onChange={updateColumnViewConfigOf}
          type='hAlign'
        />
        <AlignUpdater
          value={columnViewConfig.vAlign}
          onChange={updateColumnViewConfigOf}
          type='vAlign'
        />
        <ColumnView {...columnViewConfig}>
          <Text color='#FFCC00'>Item-1</Text>
          <Text color='#009999'>Item-2</Text>
          <Text color='#CC3333'>Item-3</Text>
        </ColumnView>
      </Block>
      <Line color='#ccc' />
      <Block
        subTitle='带插槽的横向布局-SlotRowView'
        description='在RowView的基础上增加了插槽slot。slot为数值时表现为空间隙，为render函数时则渲染为占位组件。这里只演示最简单最常见的数值slot。'
      >
        <BgColorUpdater
          value={slotRowViewConfig.bgColor}
          onChange={updateSlotRowViewConfigOf('bgColor')}
        />
        <NumericalUpdater
          onChange={updateSlotRowViewConfigOf('height')}
          value={slotRowViewConfig.height}
          name='高度'
        />
        <PaddingUpdater
          value={slotRowViewConfig.padding}
          onChange={updateSlotRowViewConfigOf}
        />
        <AlignUpdater
          value={slotRowViewConfig.hAlign}
          onChange={updateSlotRowViewConfigOf}
          type='hAlign'
        />
        <AlignUpdater
          value={slotRowViewConfig.vAlign}
          onChange={updateSlotRowViewConfigOf}
          type='vAlign'
        />
        <NumericalUpdater
          name='slot'
          value={slotRowViewConfig.slot}
          onChange={updateSlotRowViewConfigOf('slot')}
        />
        <SlotRowView {...slotRowViewConfig}>
          <Text color='#FFCC00'>Item-1</Text>
          <Text color='#009999'>Item-2</Text>
          <Text color='#CC3333'>Item-3</Text>
        </SlotRowView>
      </Block>
      <Line color='#ccc' />
      <Block
        subTitle='带插槽的纵向布局-SlotColumnView'
        description='在ColumnView的基础上增加了插槽slot。slot为数值时表现为空间隙，为render函数时则渲染为占位组件。这里只演示最简单最常见的数值slot。'
      >
        <BgColorUpdater
          value={slotColumnViewConfig.bgColor}
          onChange={updateSlotColumnViewConfigOf('bgColor')}
        />
        <NumericalUpdater
          onChange={updateSlotColumnViewConfigOf('height')}
          value={slotColumnViewConfig.height}
          name='高度'
        />
        <PaddingUpdater
          value={slotColumnViewConfig.padding}
          onChange={updateSlotColumnViewConfigOf}
        />
        <AlignUpdater
          value={slotColumnViewConfig.hAlign}
          onChange={updateSlotColumnViewConfigOf}
          type='hAlign'
        />
        <AlignUpdater
          value={slotColumnViewConfig.vAlign}
          onChange={updateSlotColumnViewConfigOf}
          type='vAlign'
        />
        <NumericalUpdater
          name='slot'
          value={slotColumnViewConfig.slot}
          onChange={updateSlotColumnViewConfigOf('slot')}
        />
        <SlotColumnView {...slotColumnViewConfig}>
          <Text color='#FFCC00'>Item-1</Text>
          <Text color='#009999'>Item-2</Text>
          <Text color='#CC3333'>Item-3</Text>
        </SlotColumnView>
      </Block>
      <Line color='#ccc' />
      <Block
        subTitle='绝对居中-XCenterView'
        description='XCenterView其实就是hAlign=center的RowView,但是为了语义化考虑,单独成了一个组件'
      >
        <BgColorUpdater
          value={xCenterViewConfig.bgColor}
          onChange={updateXCenterViewConfigOf('bgColor')}
        />
        <NumericalUpdater
          onChange={updateXCenterViewConfigOf('height')}
          value={xCenterViewConfig.height}
          name='高度'
        />
        <NumericalUpdater
          name='宽度'
          value={xCenterViewConfig.width}
          onChange={updateXCenterViewConfigOf('width')}
        />
        <XCenterView {...xCenterViewConfig}>
          <Text color='#FFCC00'>Item</Text>
        </XCenterView>
      </Block>
    </DemoPage>
  )
}

export default LayoutDemo
