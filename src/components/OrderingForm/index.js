import React from 'react'
import axios from 'axios'

import OrderComponent from './OrderComponent'
import OrderForm from './OrderForm'

import './index.css'

class Ordering extends React.Component {
  constructor(){
    super()

    this.state = {
      date: new Date(),
      itemName: '',
      period: '',
      comments: [],
    }
    this.onSubmit=this.onSubmit.bind(this)
    this.onDateChange=this.onDateChange.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.onDeleteComment=this.onDeleteComment.bind(this)
  }

  onSubmit() {
    if (this.state.itemName !== '' && this.state.period !== '') {
      let orderDict = {
        name: JSON.parse(localStorage.getItem('account')).username,
        order: {
          name: this.state.itemName,
          date: this.state.date,
          period: this.state.period,
          comments: this.state.comments,
        }
      }

      axios.post(process.env.REACT_APP_SERVER + '/sendOrder', orderDict)
      .then(res => {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });

      this.props.history.push('/orderingoptions')
      // console.log(orderDict);
    }
  }

  handleChange(event, index) {
    let name = event.target.name
    let value = event.target.value
    let strLength = event.target.value.length

    if (name === 'itemName') {
      if (strLength < 80) {
        this.setState({[name]: value})
      }
    }

    else if (name === 'period') {
      if (strLength < 10) {
        this.setState({[name]: value})
      }
    }

    else if (name === 'comments') {
      if (strLength < 40) {
        let commentsArr = Object.assign([], this.state.comments)
        commentsArr[index] = value
        this.setState({comments: commentsArr})
      }
    }
  }

  onDeleteComment(commentsNumber) {
    let commentsArr = Object.assign([], this.state.comments)
    if (commentsArr[commentsNumber-1]) {
      commentsArr.pop()
      this.setState({comments: commentsArr})
    }
  }

  onDateChange(date) {
    this.setState({date: date})
  }

  renderViewer() {
    return (
      <div className="ordering-previewWrapper">
        <div className="ordering-previewContainer">
          <div className="ordering-previewContainer-header">Preview Box</div>
          <div className="ordering-previewContainer-wrapper">
            <OrderComponent
              data={testData}
              date={this.state.date}
              itemName={this.state.itemName}
              period={this.state.period}
              comments={this.state.comments}
            />
          </div>
        </div>
        <div className="ordering-extraText">
          *Please always view the web app after posting to see if theres any cutoff.*
        </div>
        <div className="ordering-sendOrder" onClick={() => this.onSubmit()}>
          Send order!
        </div>
      </div>
    )
  }

  renderOrderForm() {
    return (
      <div className="orderForm">
        <OrderForm
          onSubmit={this.onSubmit}
          handleChange={this.handleChange}
          onDateChange={this.onDateChange}
          onDeleteComment={this.onDeleteComment}
          date={this.state.date}
          itemName={this.state.itemName}
          period={this.state.period}
          comments={this.state.comments}
        />
      </div>
    )
  }

  render() {
    return (
      <div className="default">
        <div className="ordering-back" onClick={() => this.props.history.goBack()}/>
        <div className="ordering">
          {this.renderOrderForm()}
          {this.renderViewer()}
        </div>
      </div>
    )
  }
}

export default Ordering


let testData = {
  name: 'Chicken Sandwich',
  deadline: '2019-01-05T10:17:16+08:00',
  period: 'Breakfast',
  comments: ['Only put 1 tbsp of sweetener on my shit','only put 1 tbsp of oil'],
}
