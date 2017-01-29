const Promise = require('bluebird')
const _ = require('lodash')

exports = module.exports = builder

const validSsources = {
  'GOBCORD': 'http://www.gobernacioncordillera.gov.cl/noticias/',
  'MDS': 'http://www.ministeriodesarrollosocial.gob.cl/noticias/'
}

function builder(fetcher) {
  return new Controller(fetcher)
}

class Controller {

  constructor(fetcher) {
    if (!fetcher) {
      throw { message: '"fetcher" parameter is required. null given.' }
    }
    this.fetcher = fetcher
  }

  _checkInvalidParams(params) {
    if (!params || !params.source) {
      const feedback = (params) ? params.source : 'null'
      throw { message: `invalid "source" parameter ${feedback}` }
    }
    return params
  }

  _shouldBeValidSource(params) {
    if (_.has(validSsources, params.source)) {

    } else {
      throw {message: `invalid source: ${params.source}`}
    }
    return params
  }

  _fetchUrl(params) {

    const url = validSsources[params.source]
    params.fetcher.fetchHtml(url)

    return params
  }

  checkValidSource(params) {
    params = Object.assign({}, params)
    params.fetcher = this.fetcher

    return Promise
      .resolve(params)
      .then(this._checkInvalidParams)
      .then(this._shouldBeValidSource)
      .then(this._fetchUrl)

  }
}

