const Promise = require('bluebird')
const fs = require('fs')

exports = module.exports = {
  write
}

function write(filename, data) {

  return Promise
  .resolve({filename, data})
  .then(_ensureFileExists)
  .then(_readExisting)
  .then(_writeData)
}

function _ensureFileExists(params) {
  fs.closeSync(fs.openSync(params.filename, 'a'))
  return params
}

function _readExisting(params) {
  const p = Promise.defer()
  fs.readFile(params.filename, 'utf8', (err, data) => {
    if (err) {
      p.reject(err)
    } else {
      if (!data) {
        params.existing = {}
      } else {
        params.existing = JSON.parse(data)
      }
      p.resolve(params)
    }
  })
  return p.promise
}

function _writeData(params) {
  const p = Promise.defer()
  const dataStr = JSON.stringify(params.data)
  fs.writeFile(params.filename, dataStr, (err) => {
    if (!err) {
      p.resolve(params.filename)
    } else {
      p.reject(err)
    }
  })
  return p.promise
}
