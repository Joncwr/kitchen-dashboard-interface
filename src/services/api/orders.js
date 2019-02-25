const { jwtFetch } = require('../middleware/jwtMiddleware')

module.exports = {
  createOrder: (orderDict) => {
    let { userId } = JSON.parse(localStorage.getItem('user'))

    return jwtFetch('POST', 'api/orders/createOrder/' + userId, orderDict)
  },

  deleteLastOrder: () => {
    let { userId } = JSON.parse(localStorage.getItem('user'))

    return jwtFetch('DELETE', 'api/orders/deleteLastOrder/' + userId)
  },

  deleteOrder: (orderId) => {
    return jwtFetch('DELETE', 'api/orders/deleteOrder/' + orderId)
  },

  getAllOrders: () => {
    return jwtFetch('GET', 'api/orders/getAllOrders/')
  },

  getOrders: () => {
    let { userId } = JSON.parse(localStorage.getItem('user'))

    return jwtFetch('GET', 'api/orders/getOrders/' + userId)
  }
}
