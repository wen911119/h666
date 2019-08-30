import { h, Component } from 'preact'
import WithNav from '@ruiyun/preact-m-nav'
import './app.css'

@WithNav
export default class Index extends Component {
  state = {
    name: 'wenjun1991'
  }
  goto = () => {
    this.props.$nav.push('buttonDemo')
  }

  goto2 = () => {
    this.props.$nav.push('actionsheetDemo')
  }

  goto3 = () => {
    this.props.$nav.push('dialogDemo')
  }

  goto4 = () => {
    this.props.$nav.push('modalDemo')
  }

  goto5 = () => {
    this.props.$nav.push('swiperDemo')
  }

  goto6 = () => {
    this.props.$nav.push('tabsDemo')
  }

  goto7 = () => {
    this.props.$nav.push('formDemo')
  }

  goto8 = () => {
    this.props.$nav.push('switchDemo')
  }
  goto9 = () => {
    this.props.$nav.push('searchPickerDemo')
  }
  goto10 = () => {
    this.props.$nav.push('tabbarDemo')
  }
  goto11 = () => {
    this.props.$nav.push('treepickerDemo')
  }
  render () {
    return (
      <div>
        Index-7
        <div className='test'>{this.state.name}</div>
        <div onClick={this.goto}>go to buttonDemo</div>
        <div onClick={this.goto2}>go to actionsheetDemo</div>
        <div onClick={this.goto3}>go to dialogDemo</div>
        <div onClick={this.goto4}>go to modalDemo</div>
        <div onClick={this.goto5}>go to swiperDemo</div>
        <div onClick={this.goto6}>go to tabsDemo</div>
        <div onClick={this.goto7}>go to formDemo</div>
        <div onClick={this.goto8}>go to switchDemo</div>
        <div onClick={this.goto9}>go to searchPickerDemo</div>
        <div onClick={this.goto10}>go to tabbarDemo</div>
        <div onClick={this.goto11}>go to treepickerDemo</div>
      </div>
    )
  }
}
