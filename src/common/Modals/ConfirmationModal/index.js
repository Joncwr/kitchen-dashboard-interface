import React from 'react'

import './index.css'

class ModalComponent extends React.Component {
  onConfirm() {
    if (this.props.modalProps) {
      if (this.props.modalProps.functions) {
        let snackbarText = {
          text: 'Order has been successfully overwritten.'
        }
        this.props.modalProps.functions(this.props.modalProps.data)
        this.props.modalProps.setSnackbar('show', snackbarText)
      }
    }
  }

  render() {
    let { modalProps } = this.props
    let header
    if (modalProps) header = modalProps.name
    return (
      <div className="confirmationModal">
        <div className="confirmationModal-headerContainer">
          <div className="confirmationModal-headerContainer-text">
            {header}
          </div>
          <div className="confirmationModal-actionContainer">
            <div className="confirmationModal-actionContainer-confirm" onClick={() => this.onConfirm()}>
              Confirm
            </div>
            <div className="confirmationModal-actionContainer-decline" onClick={() => this.props.setModal('hide')}>
              Decline
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ModalComponent
