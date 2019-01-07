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
        <div className="start-orderingContainer" onClick={() => this.onClick('addOrder')}>
          <div className="start-orderingContainer-alignMiddle">
            <div className="start-orderingContainer-alignMiddle-icon orderingOptions-addOrder" />
            <div className="start-orderingContainer-alignMiddle-text">
              Add Order
            </div>
          </div>
        </div>
        <div className="start-recipeViewer" onClick={() => this.onClick('deleteLastOrder')}>
          <div className="start-recipeViewer-alignMiddle">
            <div className="start-recipeViewer-alignMiddle-icon orderingOptions-deleteLastOrder" />
            <div className="start-recipeViewer-alignMiddle-text">
              Delete Last Order
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OrderingOptions
