import React from 'react'

import './index.css'

class Input extends React.Component {
  render() {
    return (
      <div>
        <textarea
          className='form-textarea'
          style={this.props.style}
          name={this.props.name}
          value={this.props.state}
          onChange={this.props.handleChange}
        />
      </div>
    )
  }
}

export default Input
