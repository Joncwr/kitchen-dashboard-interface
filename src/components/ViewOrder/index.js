import React from 'react'

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
      hasNoOrders: false,
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
          this.setState({data: res.data})
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
            <UsersComponent
              setEditableState={this.setEditableState}
              isEditable={this.state.isEditable}
              setOptionsAnimated={this.setOptionsAnimated}
              isOptionsAnimated={this.state.isOptionsAnimated}
              data={this.state.data}
              getOrders={this.getOrders.bind(this)}
            />
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
    else {
      return (
        <div className="viewOrder" onMouseDown={() => this.setEditableState(false)}>
          <div className="viewOrder-left">

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
