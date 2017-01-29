const Promise = require('bluebird')
const fs = require('fs')
const _ = require('lodash')

exports = module.exports = {
  write
}

function write(filename, data) {

  return Promise
  .resolve({filename, data})
  .then(_ensureFileExists)
  .then(_readExisting)
  .then(_consolidateFile)
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

function _consolidateFile(params) {
  const existing = params.existing
  const parsed = params.data
  const result = _.unionBy(parsed, existing, 'cannonical')
  params.result = result
  return params
}

function _writeData(params) {
  const p = Promise.defer()
  const dataStr = JSON.stringify(params.result)
  fs.writeFile(params.filename, dataStr, (err) => {
    if (!err) {
      p.resolve(params.filename)
    } else {
      p.reject(err)
    }
  })
  return p.promise
}
