import { h, Component } from 'preact'
import { ColumnView, RowView } from '@ruiyun/preact-layout-suite'
import Button from '@ruiyun/preact-button'
import Form from '@ruiyun/preact-form'
import { required, range } from '@ruiyun/preact-form/validate'
import Line from '@ruiyun/preact-line'
import Ajax from '@ruiyun/ajax'
import Scroller from '@ruiyun/preact-m-scroller'

import {
  FormTextInput,
  FormActionSheetInput,
  FormNumberInput,
  FormPickerInput,
  FormSwitchInput,
  FormTreePickerInput,
  FormTextAreaInput,
} from '@ruiyun/preact-m-form-component'
import Indicator from 'h5-indicator'

import SalaryInput from './components/salaryInput'
import DemoTitle from '../../components/DemoTitle'
import { REGIONS_OPTIONS, CITY_OPTIONS, JOB_OPTIONS } from '../../constans/other'

const phoneCheck = async (phoneNum) => {
  const lid = Indicator.showLoading()
  const p = new Promise((resolve) => {
    setTimeout(resolve, 1500)
  })
  await p
  Indicator.hideLoading(lid)
  if (phoneNum === '13020271611') {
    return null
  }
  return '手机号不存在'
}

let cityOptions

const getCityOptions = async () => {
  if (!cityOptions) {
    const lid = Indicator.showLoading()
    const p = new Promise((resolve) => setTimeout(resolve, 1000))
    await p
    Indicator.hideLoading(lid)
    cityOptions = CITY_OPTIONS
  }
  return cityOptions
}

export default class FormDemo extends Component {
  state = {
    name: 'wenjun',
  }

  onReset = () => {
    this.form.init({
      ad: true,
    })
  }

  onSubmit = () => {
    this.form.validate(
      (formData) => {
        console.log('formData', formData)
      },
      (errors) => {
        console.log('error', errors)
      }
    )
  }

  getChildren = async (parent) => {
    if (!this.mockData) {
      this.mockData = []
      const ret = await Ajax.get(
        'https://uapi.dev.quancheng-ec.com/uac/groups',
        {
          params: {
            type: 'GT_REGION',
          },
          headers: {
            loading: 'false',
            identifier: 'hrg-mp',
          },
        }
      )
      if (ret && ret.success) {
        this.mockData = ret.result.data
      }
    }
    const parentId = parent ? parent.id : ''
    return this.mockData.filter((item) => item.pid === parentId)
  }

  componentDidMount() {
    this.form.init({
      ad: true,
    })
  }

  render() {
    return (
      <ColumnView height='100%'>
        <Scroller>
          <DemoTitle title='Form' />
          <ColumnView padding={[0, 30, 0, 30]}>
            <Form ref={(form) => (this.form = form)}>
              <Form.Field label='姓名' field='name' validate={[required]}>
                <FormTextInput
                  required
                  maxLength={3}
                  placeholder='请输入姓名'
                />
              </Form.Field>
              <Line />
              <Form.Field label='年龄' field='age' validate={[range(0, 150)]}>
                <FormNumberInput limit={3} placeholder='请输入年龄' />
              </Form.Field>
              <Line />
              <Form.Field label='籍贯' field='region' validate={[required]}>
                <FormPickerInput
                  required
                  title='请选择'
                  placeholder='请选择你的籍贯'
                  options={REGIONS_OPTIONS}
                />
              </Form.Field>
              <Line />
              <Form.Field label='地区' field='regions'>
                <FormTreePickerInput
                  getLabel={(item) => item.name}
                  placeholder='请选择地区'
                  getChildren={this.getChildren}
                />
              </Form.Field>
              <Line />
              <Form.Field label='接受职位信息推送' field='ad'>
                <FormSwitchInput />
              </Form.Field>
              <Line />
              <Form.Condition condition={({ ad }) => ad}>
                <Form.Field
                  label='手机号'
                  field='phone'
                  validate={[required, phoneCheck]}
                >
                  <FormNumberInput
                    required
                    limit={11}
                    placeholder='异步校验/条件字段'
                  />
                </Form.Field>
              </Form.Condition>
              <Line />
              <Form.Field
                label='个人介绍'
                field='profile'
                validate={[required]}
              >
                <FormTextAreaInput
                  placeholder='请填写个人简介'
                  max={200}
                  required
                />
              </Form.Field>
              <Line />
              <Form.Fragment namespace='apply'>
                <Form.Field label='申请的职位' field='role'>
                  <FormActionSheetInput
                    placeholder='请选择你期望的职位'
                    options={JOB_OPTIONS}
                  />
                </Form.Field>
                <Line />
                <Form.Field
                  label='期望的薪资(联动)'
                  field='salary'
                  validate={[range(0, 30)]}
                  link={{ role: 'apply.role' }}
                >
                  <SalaryInput placeholder='请输入期望的薪资' />
                </Form.Field>
                <Line />
                <Form.Field
                  label='期望工作城市'
                  field='city'
                  validate={[required]}
                >
                  <FormPickerInput
                    placeholder='请选择期望的工作的城市'
                    mode={3}
                    getOptions={getCityOptions}
                    required
                  />
                </Form.Field>
                <Line />
              </Form.Fragment>
            </Form>
            <RowView height={200} />
          </ColumnView>
        </Scroller>
        <RowView
          height={100}
          hAlign='between'
          padding={[0, 30, 0, 30]}
          bgColor='#fff'
          style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px -5px 5px -5px', zIndex: 1 }}
        >
          <Button
            onClick={this.onReset}
            color='#f36d16'
            height={80}
            width={250}
          >
            重置
          </Button>
          <Button
            onClick={this.onSubmit}
            color='#07c160'
            height={80}
            width={400}
          >
            提交
          </Button>
        </RowView>
      </ColumnView>
    )
  }
}
