import React from 'react'

import { deleteLastOrder } from '../../services/api/orders'

import './index.css'

class OrderingOptions extends React.Component {
  constructor(){
    super()
    this.onClick=this.onClick.bind(this)
  }

  onClick(action) {
    if (action === 'addOrder') {
      this.props.history.push('orderingform')
    }
    else if (action === 'viewOrder') {
      this.props.history.push('viewOrder')
    }
    else if (action === 'deleteLastOrder') {
      deleteLastOrder()
        .then(res => {
          if (res === 'OK') this.props.setSnackbar('show', {
            text: 'Last order has been successfully deleted.'
          })
        })
        .catch(err => this.props.setSnackbar('show', {
          text: 'An error has occurred'
        }))
    }
  }

  render() {
    return (
      <div className="start">
        <div className="default-buttonContainer" onClick={() => this.onClick('addOrder')}>
          <div className="default-buttonContainer-alignMiddle">
            <div className="default-buttonContainer-alignMiddle-icon orderingOptions-addOrder" />
            <div className="default-buttonContainer-alignMiddle-text">
              Add Order
            </div>
          </div>
        </div>
        <div className="default-buttonContainer" onClick={() => this.onClick('deleteLastOrder')}>
          <div className="default-buttonContainer-alignMiddle">
            <div className="default-buttonContainer-alignMiddle-icon orderingOptions-deleteLastOrder" />
            <div className="default-buttonContainer-alignMiddle-text">
              Delete Last Order
            </div>
          </div>
        </div>
        <div className="default-buttonContainer" onClick={() => this.onClick('viewOrder')}>
          <div className="default-buttonContainer-alignMiddle">
            <div className="default-buttonContainer-alignMiddle-icon orderingOptions-viewOrder" />
            <div className="default-buttonContainer-alignMiddle-text">
              View Order
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OrderingOptions
