const axios = require('axios')

module.exports = {
  login: (username,password) => {
    return new Promise((resolve, reject) => {
      let userDetails = {
        username,
        password
      }

      axios.post(process.env.REACT_APP_SERVER+ 'admin/login', userDetails)
      .then(res => {
        if (res.status === 200) resolve(res.data)
        else reject(res)
      })
      .catch(err => reject(err))
    })
  }
}
