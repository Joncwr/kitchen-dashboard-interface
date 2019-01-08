import React from 'react'
import axios from 'axios'

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
      let userDict = {
        name: JSON.parse(localStorage.getItem('account')).username
      }
      axios.post(process.env.REACT_APP_SERVER + '/deleteLastOrder', userDict)
      .then(res => {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
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
