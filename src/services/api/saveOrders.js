const { jwtFetch } = require('../middleware/jwtMiddleware')

module.exports = {
  saveOrder: (orderDict) => {
    let { userId } = JSON.parse(localStorage.getItem('user'))

    return jwtFetch('POST', 'api/orders/saveOrder/' + userId, orderDict)
  },

  editSavedOrder: (orderDict, orderId) => {
    return jwtFetch('PUT', 'api/orders/editSavedOrder/' + orderId, orderDict)
  },

  getSavedOrders: () => {
    let { userId } = JSON.parse(localStorage.getItem('user'))

    return jwtFetch('GET', 'api/orders/getSavedOrders/' + userId)
  }
}
