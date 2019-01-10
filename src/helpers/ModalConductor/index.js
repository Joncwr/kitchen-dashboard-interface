import React from 'react'

import ConfirmationModal from '../../common/Modals/ConfirmationModal'
import SavedOrdersModal from '../../common/Modals/SavedOrdersModal'

import './index.css'

class ModalComponent extends React.Component {
  renderChildren(name){
    switch (name){
      case "ConfirmationModal":
        return <ConfirmationModal
                  modalProps={this.props.modalProps}
                  setModal={this.props.setModal}
               />

       case "SavedOrdersModal":
         return <SavedOrdersModal
                  modalProps={this.props.modalProps}
                  setModal={this.props.setModal}
                />

      default:
        return null
    }
  }

  render() {
    let { modalName, modalStatus } = this.props

    if (modalStatus === 'show') {
      return (
        <div className="modal">
          <div className="modal-overlay" onClick={() => this.props.setModal('hide')}/>
          <div className="modal-container" onMouseDown={e => e.stopPropagation()}>
            {this.renderChildren(modalName)}
          </div>
        </div>
      )
    }
    else {
      return null
    }
  }
}

export default ModalComponent
