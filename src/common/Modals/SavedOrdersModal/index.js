import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import { deleteSavedOrder } from '../../../services/api/saveOrders'

import './index.css'

class SavedOrdersModal extends React.Component {
  onSelectOrder(order) {
    this.props.modalProps.setOrder(order)
  }

  onDelete(index) {
    let order = this.props.modalProps.savedOrders[index]
    deleteSavedOrder(order.id)
      .then(res => {
        this.props.modalProps.viewSavedOrders()
      })
      .catch(() => this.props.setSnackbar('show', {
        text: 'An error has occurred.'
      }))
  }

  renderSavedOrders() {
    let savedOrders = this.props.modalProps.savedOrders
    if (savedOrders.length > 0) {
      let renderSavedOrdersArr = []
      savedOrders.forEach((data,index) => {
        renderSavedOrdersArr.push(
          <div className="savedOrdersModal-listContainer-order" key={index}>
            <div className="savedOrdersModal-listContainer-order-textContainer"onClick={() => this.onSelectOrder(savedOrders[index])}>
              <div className="savedOrdersModal-listContainer-order-textContainer-text">
                {data.name}
              </div>
            </div>
            <div className="savedOrdersModal-listContainer-order-delete" onClick={() => this.onDelete(index)}>
              <div className="savedOrdersModal-listContainer-order-delete-icon" />
            </div>
          </div>
        )
      })

      return renderSavedOrdersArr
    }
    else {
      return (
        <div className="savedOrdersModal-listContainer-blank">
          <div className="savedOrdersModal-listContainer-blank-icon" />
          <div className="savedOrdersModal-listContainer-blank-text">
            There are no saved orders.
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="savedOrdersModal">
        <div className="savedOrdersModal-header">
          <div className="savedOrdersModal-header-text">
            All Saved Orders
          </div>
        </div>
        <div className="savedOrdersModal-listContainer">
          <Scrollbars autoHide>
            {this.renderSavedOrders()}
          </Scrollbars>
        </div>
      </div>
    )
  }
}

export default SavedOrdersModal
