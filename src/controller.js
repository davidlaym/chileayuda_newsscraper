const Promise = require('bluebird')
// const _ = require('lodash')

exports = module.exports = builder

// let sources = [
//   {name: 'GobCord', url:'http://www.gobernacioncordillera.gov.cl/noticias/'},
//   {name: 'MDS', url:'http://www.ministeriodesarrollosocial.gob.cl/noticias/'},
// ];

function builder(fetcher) {
  return new Controller(fetcher)
}

class Controller {

  constructor(fetcher) {
    this.fetcher = fetcher
  }

  _checkInvalidParams(params) {
    if (!params || !params.source) {
      throw { message: 'invalid "source" parameter' }
    }
  }

  checkValidSource(params) {

    Promise
      .resolve(params)
      .then(this._checkInvalidParams)

  }
}

