import React from 'react'

import './index.css'

class ToggleButton extends React.Component {
  constructor(){
    super()

    this.state = {

    }

  }

  render() {
    let state = this.props.toggle ? ' toggleButton-circle--on' : ' toggleButton-circle--off'
    return (
      <div className="toggleButton">
        <div className={"toggleButton-circle" + state}>
        </div>
        {this.props.text ?
          <div className="toggleButton-text">
            <div className={"toggleButton-text-on" + state}></div>
            <div className={"toggleButton-text-off" + state}></div>
          </div>
        :
          null
        }
      </div>
    )
  }
}

export default ToggleButton
