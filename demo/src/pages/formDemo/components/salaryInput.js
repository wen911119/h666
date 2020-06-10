import { h, Component } from 'preact'
import NumberInput from '@ruiyun/preact-number-input'
import { FormRow } from '@ruiyun/preact-m-form-component'

const salaryRange = {
  产品经理: '8000~30000',
  测试工程师: '6000~20000',
  开发工程师: '10000~50000',
  运营专员: '4500~12000',
}

export default class FormInput extends Component {
  onChange = (value) => {
    this.props.sync(value)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.role !== this.props.role) {
      // 清空本输入框
      setTimeout(this.props.sync, 0)
    }
  }

  render() {
    const { label, err, role, required, height, ...otherProps } = this.props
    console.log('render-salary-input')
    return (
      <FormRow label={label} err={err} required={required} height={height}>
        <NumberInput
          {...otherProps}
          height='100%'
          width='100%'
          format='thousand'
          onChange={this.onChange}
          placeholder={`薪资范围${role ? salaryRange[role] : '? ~ ?'}`}
          style={{ textAlign: 'right' }}
        />
      </FormRow>
    )
  }
}
