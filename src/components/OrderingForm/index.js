import React from 'react'

import OrdersHelper from '../../services/Orders/OrdersHelper.js'
import { createOrder } from '../../services/api/orders'
import { saveOrder, editSavedOrder, getSavedOrders } from '../../services/api/saveOrders'
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
      comments: {},
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
        name: this.state.name,
        date: this.state.date,
        period: this.state.period,
        comments: this.state.comments,
      }
      createOrder(orderDict)
        .then(res => {
          if (res === 'OK') {
            this.props.setSnackbar('show', {
              text: 'Order has been successfully sent.'
            })
            this.props.history.push('/orderingoptions')
          }
          else this.props.setSnackbar('show', {
            text: 'An error has occurred'
          })
        })
        .catch(err => this.props.setSnackbar('show', {
          text: 'An error has occurred'
        }))
    }
    else this.props.setSnackbar('show', {
      text: 'Please make sure all **fieldsare entered.'
    })
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
        let commentsDict = Object.assign({}, this.state.comments)
        commentsDict[index] = value
        this.setState({comments: commentsDict})
      }
    }
  }

  onDeleteComment(dictKey) {
    let commentsDict = Object.assign({}, this.state.comments)
    delete commentsDict[dictKey]
    this.setState({comments: commentsDict})
  }

  onDateChange(date) {
    this.setState({date: date})
  }

  onOverwrite(orderDict, orderId) {
    let order = {
      name: orderDict.name,
      period: orderDict.period,
      comments: orderDict.comments
    }
    editSavedOrder(order, orderId)
      .then(res => {
        if (res === 'OK') this.props.setSnackbar('show', {
          text: 'Order has been overwritten.'
        })
      })
      .catch(err => this.props.setSnackbar('show', {
        text: 'An error occurred.'
      }))
    this.props.setModal('hide')
  }

  onSave() {
    if (this.state.name !== '' && this.state.period !== '') {
      let orderDict = {
        date: this.state.date,
        name: this.state.name,
        period: this.state.period,
        comments: this.state.comments,
      }
      saveOrder(orderDict)
        .then(res => {
          if (res === 'OK') this.props.setSnackbar('show', {
            text: 'New Order has been saved!'
          })
          else if (res.error === 'same name error') {
            let modalProps = {
              name: 'Order already exists. Overwrite?',
              data: orderDict,
              orderId: res.order.id,
              functions: this.onOverwrite.bind(this)
            }
            this.props.setModal('show', 'ConfirmationModal', modalProps)
          }
        })
    }
    else this.props.setSnackbar('show', {
      text: 'Please make sure all *fields are entered.'
    })
  }

  setOrder(order) {
    if (order) {
      this.setState({
        name: order.name,
        period: order.period,
        comments: order.comments,
      },() => this.props.setModal('hide'))
    }
  }

  viewSavedOrders() {
    getSavedOrders()
      .then(orders => {
        let savedOrderModalDict = {
          setOrder: this.setOrder,
          savedOrders: orders,
          viewSavedOrders: this.viewSavedOrders.bind(this)
        }
        this.props.setModal('show', 'SavedOrdersModal', savedOrderModalDict)
      })
  }

  renderViewer() {
    return (
      <div className="ordering-previewWrapper">
        <div className="ordering-previewWrapper-savedOrders">
          <div className="ordering-previewWrapper-savedOrders-button" onClick={this.viewSavedOrders}>
            Saved Orders
          </div>
        </div>
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
