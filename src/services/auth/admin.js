const axios = require('axios')

module.exports = {
  createUser: (username,password) => {
    return new Promise((resolve, reject) => {
      let userDetails = {
        username,
        password
      }

      axios.post(process.env.REACT_APP_SERVER+ 'admin/createUser', userDetails)
      .then(res => {
        if (res.status === 200) resolve()
        else reject(res)
      })
      .catch(err => reject(err))
    })
  }
}
