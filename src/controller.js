const Promise = require('bluebird')
const _ = require('lodash')

exports = module.exports = builder

function builder(fetcher, writer, parsers, filter) {
  return new Controller(fetcher, writer, parsers, filter)
}

class Controller {

  constructor(fetcher, writer, parsers, filter) {
    if (!fetcher) {
      throw { message: '"fetcher" parameter is required. null given.' }
    }
    if (!parsers || !parsers.length) {
      throw { message: '"parsers" parameter is required. null given.' }
    }
    if (!writer) {
      throw { message: '"writer" parameter is required. null given.' }
    }
    if (!filter) {
      throw { message: '"filter" parameter is required. null given.' }
    }
    this.fetcher = fetcher
    this.parsers = parsers
    this.writer = writer
    this.filter = filter
  }

  scrape(params) {
    console.log('Initializing scraper')

    params = Object.assign({}, params)
    params.fetcher = this.fetcher
    params.parsers = this.parsers
    params.writer = this.writer
    params.filter = this.filter


    return Promise
      .resolve(params)
      .then(this._checkInvalidParams)
      .then(this._shouldBeValidSource)
      .then(this._fetchUrl)
      .then(this._parseHtml)
      .then(this._filterContent)
      .then(this._generateFile)
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
      console.log(`Selected source: ${source.name}`)
    } else {
      throw {message: `invalid source: ${params.source}`}
    }
    return params
  }

  _fetchUrl(params) {
    const url = params.source.url
    console.log(`fetching url: ${url}`)
    return params.fetcher
      .fetchHtml(url)
      .then($ => {
        params.$ = $
        return params
      })
  }

  _parseHtml(params) {
    console.log('parsing ...')
    params.parsed = params.source.parser(params.$)
    return params
  }

  _filterContent(params) {
    console.log('filtering ...')

    function IsIncluded(element) {
      for (const i in params.filter.include) {
        if (element[params.filter.by].search(params.filter.include[i]) > -1) {
          return true
        }
      }
      return false
    }

    if (params.parsed.parsed.length > 0) {
      params.parsed.parsed = params.parsed.parsed.filter(IsIncluded)
    }
    return params
  }

  _generateFile(params) {
    console.log(`writing to ${params.output}`)
    return params.writer.write(params.output, params.parsed.parsed)
  }

}

