import React from 'react'
import DatePicker from 'react-date-picker';

import Input from '../../../common/Input'

import './index.css'

class OrderForm extends React.Component {
  constructor(){
    super()

    this.state = {
      comments: 0,
    }
    this.onPress=this.onPress.bind(this)
  }

  renderComments() {
    let renderCommentsArr = []
    let renderDeleteButton
    if (this.state.comments > 0 ? true : false) {
      renderDeleteButton = <div className="form-comments-buttons-container" onClick={() => this.onPress('deleteComment')}>-</div>
    }

    for (let i = 0; i < this.state.comments; i++) {
      renderCommentsArr.push(
        <Input
          key={i}
          style={{height: '40px', textAlign: 'center'}}
          handleChange={(e) => this.props.handleChange(e,i)}
          name={'comments'}
          state={this.props.comments[i]}
        />
      )
    }

    return (
      <div className='form-comments-wrapper'>
        {renderCommentsArr}
        <div className="form-comments-buttons">
          <div className="form-comments-buttons-container" onClick={() => this.onPress('addComment')}>
            +
          </div>
          {renderDeleteButton}
        </div>
      </div>
    )
  }

  onPress(action) {
    if (action === 'addComment' && this.state.comments < 3) {
      this.setState({comments: this.state.comments + 1})
    }
    else if (action === 'deleteComment') {
      this.props.onDeleteComment(this.state.comments)
      this.setState({comments: this.state.comments - 1})
    }
  }

  render() {
    return (
      <form>
        <div className="form">
          <div className="form-date">
            <div className="form-header">
              Date:
            </div>
            <DatePicker
              onChange={this.props.onDateChange}
              value={this.props.date}
              clearIcon={null}
              calendarClassName='form-datepicker'
              className='form-datepicker-wrapper'
            />
          </div>
          <div className="form-period">
            <div className="form-header">
              Meal/Time Period:
            </div>
            <Input
              style={{height: '40px', textAlign: 'center'}}
              handleChange={this.props.handleChange}
              name='period'
              state={this.props.period}
            />
          </div>
          <div className="form-itemName">
            <div className="form-header">
              Order Name:
            </div>
            <Input
              handleChange={this.props.handleChange}
              name='name'
              state={this.props.name}
            />
          </div>
          <div className="form-comments">
            <div className="form-header">
              Comments:
            </div>
            {this.renderComments()}
          </div>
        </div>
      </form>
    )
  }
}

export default OrderForm
