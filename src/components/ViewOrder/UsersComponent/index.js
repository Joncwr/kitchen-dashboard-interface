import React from 'react'

import { deleteOrder } from '../../../services/api/orders'
import OrderComponent from '../../OrderingForm/OrderComponent'

import './index.css'

let mouseDownTimer

class UsersComponent extends React.Component {
  constructor(){
    super()

    this.state = {
      editIndex: '',
    }
    this.onMouseDown=this.onMouseDown.bind(this)
    this.onMouseUp=this.onMouseUp.bind(this)
    this.editMode=this.editMode.bind(this)
    this.deleteOrder=this.deleteOrder.bind(this)
  }

  renderOrders() {
    let { orders } = this.props.data
    if (orders) {
      let renderOrders = []
      orders.map((data, index) =>
        renderOrders.push(
          <div
            className="usersComponent-orderComponentContainer-wrapper"
            key={index}
            onMouseDown={() => this.onMouseDown(index)}
            onMouseUp={this.onMouseUp}
          >
            {this.renderEditMode(index)}
            <OrderComponent
              date={data.date}
              name={data.name}
              period={data.period}
              comments={data.comments}
            />
          </div>
        )
      )

      return renderOrders
    }
  }

  onMouseDown(index) {
    mouseDownTimer = setTimeout(() => {
      this.editMode(index)
    }, 500)
  }

  onMouseUp() {
    clearTimeout(mouseDownTimer)
  }

  editMode(index) {
    this.props.setEditableState(true)
    this.setState({editIndex: index},() => {

      console.log(this.props.data.orders[this.state.editIndex]);
    })
  }

  deleteOrder() {
    this.props.setOptionsAnimated(true)
    let orderId = this.props.data.orders[this.state.editIndex].id
    deleteOrder(orderId)
      .then(res => {
        this.setState({editIndex: ''},() => {
          this.props.setEditableState('false')
          this.props.getOrders()
          this.props.setSnackbar('show', {
            text: 'Selected order has been successfully deleted.'
          })
        })
      })
      .catch(err => this.props.setSnackbar('show', {
        text: 'An error has occurred.'
      }))

    // OrdersHelper.deleteOrder(this.state.editIndex)
    // .then(res => {
    //   this.setState({editIndex: ''},() => {
    //     this.props.setEditableState('false')
    //     this.props.getOrders()
    //     let snackbarText = {
    //       text: 'Selected order has been successfully deleted.'
    //     }
    //     this.props.setSnackbar('show', snackbarText)
    //   })
    // })
    // .catch(err => console.log(err))
  }

  renderEditMode(index) {
    if (this.props.isEditable && index === this.state.editIndex) {
      let isOptionsAnimated = this.props.isOptionsAnimated ? ' isAnimated' : ''
      return (
        <div className="usersComponent-orderComponentContainer-editMode" onMouseDown={e => e.stopPropagation()}>
          <div className="usersComponent-orderComponentContainer-editMode-wrapper">
            <div className={"usersComponent-orderComponentContainer-editMode-animationContainer" + isOptionsAnimated}>
              <div className="usersComponent-orderComponentContainer-editMode-container" onClick={() => this.props.setOptionsAnimated(true)}>
                <div className="usersComponent-orderComponentContainer-editMode-container-icon"/>
              </div>
              <div className="usersComponent-orderComponentContainer-editMode-confirmation">
                <div className="usersComponent-orderComponentContainer-editMode-confirmation-confirmContainer" onClick={() => this.deleteOrder()}>
                  <div className="usersComponent-orderComponentContainer-editMode-confirmation-confirmContainer-icon" />
                </div>
                <div className="usersComponent-orderComponentContainer-editMode-confirmation-declineContainer" onClick={() => this.props.setEditableState(false)}>
                  <div className="usersComponent-orderComponentContainer-editMode-confirmation-declineContainer-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  componentDidMount() {
    console.log(this.props.data);
  }

  render() {
    let { username } = this.props.data
    return (
      <div className="usersComponent">
        <div className="usersComponent-nameContainer">
          <div className="usersComponent-nameContainer-name">
            {username}
          </div>
        </div>
        <div className="usersComponent-orderComponentContainer">
          {this.renderOrders()}
        </div>
      </div>
    )
  }
}

export default UsersComponent
