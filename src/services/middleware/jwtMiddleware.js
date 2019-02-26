let axios = require('axios')

module.exports = {
  jwtFetch: (method, endpoint, json) => {
    return new Promise((resolve, reject) => {
      let { token } = JSON.parse(localStorage.getItem('user'))
      axios({
        url: process.env.REACT_APP_SERVER + endpoint,
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        data: JSON.stringify(json),
        timeout: 15000
      })
      .then(res => {
        if (res.status >= 200 && res.status < 300){
          resolve(res.data)
        }
        else {
          reject()
        }
      })
      .catch (err => reject(err))
    })
  }
}
