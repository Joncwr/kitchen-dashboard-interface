let login = [
  {
    name: 'Jon',
    password: 'sibeizai'
  },
  {
    name: 'Crystal',
    password: 'imcute'
  },
]

module.exports = {
  authorizeUser: (username,password) => {
    return new Promise((resolve, reject) => {
      login.forEach((data,index) => {
        if (data.name === username && data.password === password) {
          resolve('login!')
        }
      })
      reject('login failed')
    })
  }
}
