const Promise = require('bluebird')
const _ = require('lodash')

exports = module.exports = builder

function builder(fetcher, parsers) {
  return new Controller(fetcher, parsers)
}

class Controller {

  constructor(fetcher, parsers) {
    if (!fetcher) {
      throw { message: '"fetcher" parameter is required. null given.' }
    }
    if (!parsers || !parsers.length) {
      throw { message: '"parsers" parameter is required. null given.' }
    }
    this.fetcher = fetcher
    this.parsers = parsers
  }

  _checkInvalidParams(params) {
    if (!params || !params.source) {
      const feedback = (params) ? params.source : 'null'
      throw { message: `invalid "source" parameter ${feedback}` }
    }
    return params
  }

  _shouldBeValidSource(params) {
    const source = _.find(params.parsers, {name: params.source})
    if (source) {
      params.source = source
    } else {
      throw {message: `invalid source: ${params.source}`}
    }
    return params
  }

  _fetchUrl(params) {

    const url = params.source.url
    params.fetcher.fetchHtml(url)

    return params
  }

  scrape(params) {
    params = Object.assign({}, params)
    params.fetcher = this.fetcher
    params.parsers = this.parsers

    return Promise
      .resolve(params)
      .then(this._checkInvalidParams)
      .then(this._shouldBeValidSource)
      .then(this._fetchUrl)

  }
}

