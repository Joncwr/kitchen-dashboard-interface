let axios = require('axios')

let sendOrder = (orderDict) => {
  return new Promise((resolve, reject) => {
    axios.post(process.env.REACT_APP_SERVER + '/sendOrder', orderDict)
    .then(res => {
      resolve(res.data);
    })
    .catch(function (error) {
      reject(error);
    });
  })
}

let getOrders = () => {
  return new Promise((resolve, reject) => {
    let userName = {name: JSON.parse(localStorage.getItem('account')).username}
    axios.post(process.env.REACT_APP_SERVER + '/getOrders', userName)
    .then(res => {
      resolve(res)
    })
    .catch(err => reject(err))
  })
}

let deleteOrder = (orderIndex) => {
  return new Promise((resolve, reject) => {
    let deleteOrderDict = {
      name: JSON.parse(localStorage.getItem('account')).username,
      order: orderIndex,
    }

    axios.post(process.env.REACT_APP_SERVER + '/deleteOrder', deleteOrderDict)
    .then(res => {
      resolve(res)
    })
    .catch(err => reject(err))
  })
}

let deleteLastOrder = () => {
  return new Promise((resolve, reject) => {
    let userDict = {
      name: JSON.parse(localStorage.getItem('account')).username
    }

    axios.post(process.env.REACT_APP_SERVER + '/deleteLastOrder', userDict)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => reject(err))
  })
}

let saveOrder = (saveOrderDict) => {
  let savedOrders = localStorage.getItem('savedOrders')
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
        }
        saveOrderDict.callModal('show', 'ConfirmationModal', modalProps)
        return
      }
    })
    if (!sameOrder) {
      parseSavedOrders.push(saveOrderDict.orderDict)
      localStorage.setItem('savedOrders', JSON.stringify(parseSavedOrders))
    }
  }

  else {
    localStorage.setItem('savedOrders',JSON.stringify([saveOrderDict.orderDict]))
  }
}

module.exports = {
  sendOrder: sendOrder,
  getOrders: getOrders,
  deleteOrder: deleteOrder,
  deleteLastOrder: deleteLastOrder,
  saveOrder: saveOrder,
}
