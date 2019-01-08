import React from 'react'

import UsersComponent from './UsersComponent'

import './index.css'

class ViewOrder extends React.Component {
  constructor(){
    super()

    this.state = {

    }

  }

  renderPreview() {
    return (
      <div className="viewOrder-right-container">
        <UsersComponent
          data={testData}
        />
      </div>
    )
  }

  render() {
    return (
      <div className="viewOrder">
        <div className="viewOrder-left">

        </div>
        <div className="viewOrder-right">
          {this.renderPreview()}
        </div>
      </div>
    )
  }
}

export default ViewOrder

let testData = {
  name: "Jon",
  orders: [
    {
      name: "awdwa",
      period: "awda",
      comments: [],
      date: "2019-01-09T16:00:00.000Z"
    }, {
      name: "awdawdaw",
      period: "awdwad",
      comments: [],
      date: "2019-01-09T16:00:00.000Z"
    }, {
      name: "wadwa",
      period: "dawd",
      comments: ["awd", "awd", "awd"],
      date: "2019-01-09T16:00:00.000Z"
    }
  ]
}
