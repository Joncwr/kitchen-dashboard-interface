import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import OrdersHelper from '../../services/Orders/OrdersHelper.js'
import UsersComponent from './UsersComponent'

import './index.css'

class ViewOrder extends React.Component {
  constructor(){
    super()

    this.state = {
      isEditable: false,
      isOptionsAnimated: false,
      data: '',
      hasNoOrders: true,
    }
    this.setEditableState=this.setEditableState.bind(this)
    this.setOptionsAnimated=this.setOptionsAnimated.bind(this)
    this.getOrders=this.getOrders.bind(this)
  }

  componentDidMount() {
    this.getOrders()
  }

  getOrders() {
    OrdersHelper.getOrders()
    .then(res => {
      if (res.data) {
        if (res.data.orders.length > 0) {
          this.setState({data: res.data, hasNoOrders: false})
        }
        else {
          this.setState({hasNoOrders: true})
        }
      }
    })
    .catch(err => console.log())
  }

  renderPreview() {
    if (this.state.data) {
      if (this.state.data.orders.length > 0) {
        return (
          <div className="viewOrder-right-container">
            <Scrollbars autoHide>
              <UsersComponent
                setEditableState={this.setEditableState}
                isEditable={this.state.isEditable}
                setOptionsAnimated={this.setOptionsAnimated}
                isOptionsAnimated={this.state.isOptionsAnimated}
                data={this.state.data}
                getOrders={this.getOrders}
                setSnackbar={this.props.setSnackbar}
              />
            </Scrollbars>
          </div>
        )
      }
    }
  }

  setEditableState(state) {
    if (state === false) this.setState({isOptionsAnimated: false})
    this.setState({isEditable: state})
  }

  setOptionsAnimated(state) {
    this.setState({isOptionsAnimated: state})
  }

  renderNoOrders() {
    if (this.state.hasNoOrders) {
      return (
        <div className="blank">
          <div className="blank-image" />
          <div className="blank-text">There are no current Orders.</div>
        </div>
      )
    }
    else if (!this.state.hasNoOrders) {
      return (
        <div className="viewOrder" onMouseDown={() => this.setEditableState(false)}>
          <div className="viewOrder-left">
            <div className="viewOrder-left-container">
              <div className="viewOrder-left-container-image" />
              <div className="viewOrder-left-container-textContainer">
                <div className="viewOrder-left-container-textContainer-text">
                  Click and hold the order to activate deletion mode. Please wait a few seconds after deleting for the orders to update.
                </div>
              </div>
            </div>
          </div>
          <div className="viewOrder-right">
            {this.renderPreview()}
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className='default'>
        <div className="ordering-back" onClick={() => this.props.history.goBack()}/>
        {this.renderNoOrders()}
      </div>
    )
  }
}

export default ViewOrder
