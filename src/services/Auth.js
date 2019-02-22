const axios = require('axios')

module.exports = {
  authorizeUser: (username,password) => {
    return new Promise((resolve, reject) => {
      let userDetails = {
        username,
        password
      }

      axios.post('http://18.191.120.71:80/api/admin/login', userDetails)
      .then(res => {
        if (res.status === 200) resolve()
        else reject(res)
      })
      .catch(err => reject(err))
    })
  }
}
