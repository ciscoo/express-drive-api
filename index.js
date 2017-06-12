const google = require('./google')
const express = require('express')
const bodyParser = require('body-parser')
const googleApis = require('googleapis')

// https://github.com/google/google-api-nodejs-client/issues/197
const Promise = require('bluebird')

const app = express()
const port = process.env.PORT || 3000
const { files } = googleApis.drive('v3')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

google.authorize((err, tokens) => {
  if (err) {
    throw err
  }
  startServer()
})

app.get('/api/:fileId', async ({ query, params }, res) => {
    if (query.alt && query.alt.toLowerCase().trim() === 'media') {
    // Set to JSON as we need to get the content type of the resource
    query.alt = 'json'

    // Get the Files Resource JSON
    const options = createOptions(query, params.fileId)
    const filesResource = await Promise.fromCallback(cb => files.get(options, cb))

     // Grab the raw image bytes
    query.alt = 'media'
    await createAPIRequest(createOptions(query, params.fileId), 'get', res, filesResource)
    } else {
        await createAPIRequest(createOptions(query, params.fileId), 'get', res)
    }
})

function createOptions (query, fileId, props = {}) {
  let options = Object.assign({ auth: google, fileId }, query)
  options = Object.assign(options, props)
  return options
}

async function createAPIRequest (options, method, res, filesResource = {}) {
  try {
    const response = await Promise.fromCallback(cb => files[method](options, cb))
    if (filesResource.hasOwnProperty('mimeType')) {
      res.type(filesResource.mimeType)
      const image = Buffer.from(response, 'binary')
      res.end(image)
    } else {
      res.json(response)
    }
  } catch (error) {
    res.json(error)
  }
}

function startServer() {
  app.listen(port, () => {
    console.log(`Listening on ${port}`)
  })
}