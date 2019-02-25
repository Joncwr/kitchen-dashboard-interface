

let saveOrder = (saveOrderDict) => {
  let savedOrders = localStorage.getItem('savedOrders')
  let snackbarText = {
    text: 'New Order has been saved!'
  }
  if (savedOrders) {
    let parseSavedOrders = Object.assign([],JSON.parse(savedOrders))
    let sameOrder = false
    parseSavedOrders.forEach((data,index) => {
      if (data.name === saveOrderDict.name) {
        sameOrder = true
        parseSavedOrders[index] = saveOrderDict.orderDict
        let modalProps = {
          name: 'Order already exists. Overwrite?',
          data: parseSavedOrders,
          functions: saveOrderDict.modalProps,
          setSnackbar: saveOrderDict.setSnackbar
        }
        saveOrderDict.setModal('show', 'ConfirmationModal', modalProps)
        return
      }
    })
    if (!sameOrder) {
      parseSavedOrders.push(saveOrderDict.orderDict)
      localStorage.setItem('savedOrders', JSON.stringify(parseSavedOrders))
      saveOrderDict.setSnackbar('show',snackbarText)
    }
  }

  else {
    localStorage.setItem('savedOrders',JSON.stringify([saveOrderDict.orderDict]))
    saveOrderDict.setSnackbar('show',snackbarText)
  }
}

module.exports = {
  saveOrder: saveOrder,
}
