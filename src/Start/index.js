import React from 'react'

import './index.css'

class Start extends React.Component {
  constructor(){
    super()

    this.state = {

    }
    this.onClick=this.onClick.bind(this)
  }

  onClick(page) {
    this.props.history.push(page)
  }

  render() {
    return (
      <div className="start">
        <div className="start-orderingContainer" onClick={() => this.onClick('ordering')}>
          <div className="start-orderingContainer-alignMiddle">
            <div className="start-orderingContainer-alignMiddle-icon" />
            <div className="start-orderingContainer-alignMiddle-text">
              Ordering
            </div>
          </div>
        </div>
        <div className="start-recipeViewer" onClick={() => this.onClick('recipeviewer')}>
          <div className="start-recipeViewer-alignMiddle">
            <div className="start-recipeViewer-alignMiddle-icon" />
            <div className="start-recipeViewer-alignMiddle-text">
              Recipe Viewer
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Start
