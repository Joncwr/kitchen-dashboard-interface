import React from 'react'

import './index.css'

class Snackbar extends React.Component {
  renderSnackbarProps(snackbarProps) {
    return (
      <div className="snackbar-container-propsContainer">
        <div className="snackbar-container-propsContainer-text">
          {snackbarProps.text}
        </div>
      </div>
    )
  }

  render() {
    let { snackbarProps, snackbarStatus } = this.props
    let animationDuration = snackbarProps.duration ? snackbarProps.duration : '3s'
    if (snackbarStatus === 'show') {
      return (
        <div className="snackbar">
          <div className="snackbar-container" style={{animationDuration: animationDuration}}>
            {this.renderSnackbarProps(snackbarProps)}
          </div>
        </div>
      )
    }
    else {
      return null
    }
  }
}

export default Snackbar
