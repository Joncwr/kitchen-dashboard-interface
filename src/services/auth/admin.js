const axios = require('axios')

module.exports = {
  createUser: (username,password,household_name) => {
    return new Promise((resolve, reject) => {
      let userDetails = {
        username,
        password,
        household_name
      }

      axios.post(process.env.REACT_APP_SERVER+ 'admin/createUser', userDetails)
      .then(res => {
        if (res.status === 200) resolve(res)
        else reject(res)
      })
      .catch(err => reject(err))
    })
  },

  createHousehold: (username, password, household_name) => {
    return new Promise((resolve, reject) => {
      let userDetails = {
        username,
        password,
        household_name
      }

      axios.post(process.env.REACT_APP_SERVER+ 'admin/households/createHousehold', userDetails)
      .then(res => {
        if (res.status === 200) resolve(res)
        else reject(res)
      })
      .catch(err => reject(err))
    })
  }
}
