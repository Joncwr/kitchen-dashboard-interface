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
      name: '',
      period: '',
      comments: [],
    }
    this.onSubmit=this.onSubmit.bind(this)
    this.onDateChange=this.onDateChange.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.onDeleteComment=this.onDeleteComment.bind(this)
    this.onOverwrite=this.onOverwrite.bind(this)
    this.viewSavedOrders=this.viewSavedOrders.bind(this)
    this.setOrder=this.setOrder.bind(this)
  }

  onSubmit() {
    if (this.state.name !== '' && this.state.period !== '') {
      let orderDict = {
        name: JSON.parse(localStorage.getItem('account')).username,
        order: {
          name: this.state.name,
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
    }
  }

  handleChange(event, index) {
    let name = event.target.name
    let value = event.target.value
    let strLength = event.target.value.length

    if (name === 'name') {
      if (strLength < 70) {
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

  onOverwrite(parseSavedOrders) {
    localStorage.setItem('savedOrders', JSON.stringify(parseSavedOrders))
    this.props.setModal('hide')
  }

  onSave() {
    let orderDict = {
      name: this.state.name,
      order : {
        date: this.state.date,
        name: this.state.name,
        period: this.state.period,
        comments: this.state.comments,
      }
    }

    if (this.state.name !== '' && this.state.period !== '') {
      let savedOrders = localStorage.getItem('savedOrders')
      if (savedOrders) {
        let parseSavedOrders = Object.assign([],JSON.parse(savedOrders))
        let sameOrder = false
        parseSavedOrders.forEach((data,index) => {
          if (data.name === this.state.name) {
            sameOrder = true
            parseSavedOrders[index] = orderDict
            let modalProps = {
              name: 'Order already exists. Overwrite?',
              data: parseSavedOrders,
              functions: this.onOverwrite,
            }
            this.props.setModal('show', 'ConfirmationModal', modalProps)
            return
          }
        })
        if (!sameOrder) {
          parseSavedOrders.push(orderDict)
          localStorage.setItem('savedOrders', JSON.stringify(parseSavedOrders))
        }
      }

      else {
        localStorage.setItem('savedOrders',JSON.stringify([orderDict]))
      }
    }
  }

  setOrder(orderDict) {
    if (orderDict) {
      let { order } = orderDict
      this.setState({
        date: order.date,
        name: order.name,
        period: order.period,
        comments: order.comments,
      },() => this.props.setModal('hide'))
    }
  }

  viewSavedOrders() {
    this.props.setModal('show', 'SavedOrdersModal', this.setOrder)
  }

  renderViewer() {
    return (
      <div className="ordering-previewWrapper">
        <div className="ordering-previewContainer">
          <div className="ordering-previewContainer-header">Preview Box</div>
          <div className="ordering-previewContainer-wrapper">
            <OrderComponent
              date={this.state.date}
              name={this.state.name}
              period={this.state.period}
              comments={this.state.comments}
            />
          </div>
        </div>
        <div className="ordering-extraText">
          *Please always view the web app after posting to see if theres any cutoff.*
        </div>
        <div className="ordering-options">
          <div className="ordering-options-container-save" onClick={() => this.onSave()}>
            Save order!
          </div>
          <div className="ordering-options-container-send" onClick={() => this.onSubmit()}>
            Send order!
          </div>
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
          name={this.state.name}
          period={this.state.period}
          comments={this.state.comments}
          viewSavedOrders={this.viewSavedOrders}
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
