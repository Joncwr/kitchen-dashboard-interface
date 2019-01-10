import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import './index.css'

class SavedOrdersModal extends React.Component {
  constructor(){
    super()

    this.state = {
      savedOrders: [],
    }
    this.getOrders=this.getOrders.bind(this)
  }

  componentDidMount() {
    this.getOrders()
  }

  getOrders() {
    if (localStorage.getItem('savedOrders')) {
      let parseSavedOrders = Object.assign([], JSON.parse(localStorage.getItem('savedOrders')))
      this.setState({savedOrders: parseSavedOrders})
    }
  }

  onSelectOrder(index) {
    this.props.modalProps(this.state.savedOrders[index])
  }

  onDelete(index) {
    let savedOrders = Object.assign([], this.state.savedOrders)
    savedOrders.splice(index, 1)

    localStorage.setItem('savedOrders', JSON.stringify(savedOrders))
    this.getOrders()

  }

  renderSavedOrders() {
    if (this.state.savedOrders.length > 0) {
      let renderSavedOrdersArr = []
      this.state.savedOrders.forEach((data,index) => {
        renderSavedOrdersArr.push(
          <div className="savedOrdersModal-listContainer-order" key={index}>
            <div className="savedOrdersModal-listContainer-order-textContainer"onClick={() => this.onSelectOrder(index)}>
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
