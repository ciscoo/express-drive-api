const google = require('googleapis')
const serviceAccount = require('./serviceAccount.json')

const { client_email, private_key } = serviceAccount
const scopes = [
  'https://www.googleapis.com/auth/drive.readonly'
]

module.exports = new google.auth.JWT(client_email, serviceAccount, private_key, scopes)
