import React from 'react'

import OrderComponent from './OrderComponent'

import './index.css'

class Ordering extends React.Component {
  constructor(){
    super()

    this.state = {

    }

  }

  renderViewer() {
    return (
      <div>
        <div className="ordering-previewContainer">
          <div className="ordering-previewContainer-header">Preview Box</div>
          <div className="ordering-previewContainer-wrapper">
            <OrderComponent data={testData} />
          </div>
        </div>
        <div className="ordering-extraText">
          *Please always view the web app after posting to see if theres any cutoff.*
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="default">
        <div className="ordering">
          {this.renderViewer()}
        </div>
      </div>
    )
  }
}

export default Ordering


let testData = {
  name: 'Chicken Sandwich',
  deadline: '17 Sep 2019',
  period: 'Breakfast',
  comments: ['Only put 1 tbsp of sweetener on my shit','only put 1 tbsp of oil'],
}
