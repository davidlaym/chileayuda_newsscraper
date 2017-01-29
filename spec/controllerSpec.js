
// eslint-disable-no-unused-vars
const should = require('should')
const cheerio = require('cheerio')
// let sinon = require('sinon')
// let Promise = require('bluebird')
const controllerBuilder = require('../src/controller')

describe('Controller', () => {

  function createController(fetcher, parserDef) {
    if (!fetcher) {
      fetcher = generateFakeForFetcher()
    }
    if (!parserDef) {
      parserDef = generateFakeForParser()
    }
    return controllerBuilder(fetcher, parserDef)
  }

  describe('scrape', () => {

    it('throws when no params are given', done => {
      const controller = createController()

      controller.scrape()
        .then(() => {
          done('exception expected, but none received')
        })
        .catch(() => {
          done()
        })

    })
    it('throws when no source are given', done => {
      const controller = createController()
      controller.scrape({})
        .then(() => {
          done('exception expected, but none received')
        })
        .catch(() => {
          done()
        })
    })

    it('throws when invalid source is given', done => {
      const controller = createController()
      controller.scrape({source: 'INVALID'})
        .then(() => {
          done('exception expected, but none received')
        })
        .catch((err) => {
          done()
        })
    })

    it('when valid, send url to fetcher', done => {
      let flag = ''
      const fetcher = {
        fetchHtml(url) {
          flag = url
          return Promise.resolve(cheerio.load('<div></div>'))
        }
      }
      const controller = createController(fetcher)
      controller.scrape({source: 'VALID'})
        .then(() => {
          flag.should.equal('http://valid.url.test')
          done()
        })
        .catch((err) => {
          done('there was an unhandled exception in the promise chain: ' + err.message)
        })
    })

    it('when valid, send fetched html to parser', done => {
      let flag = false
      const parserDef = generateFakeForParser()
      parserDef[0].parser = ($) => {
        if ($.html() === '<div></div>') {
          flag = true
        }
      }
      const controller = createController(null, parserDef)
      controller.scrape({source: 'VALID'})
        .then(() => {
          flag.should.be.true()
          done()
        })
        .catch((err) => {
          done('there was an unhandled exception in the promise chain: ' + err.message)
        })
    })
  })

  function generateFakeForFetcher() {
    return {
      fetchHtml(rootUrl) {
        return Promise.resolve(cheerio.load('<div></div>'))
      }
    }
  }

  function generateFakeForParser() {
    return [
      {
        name: 'VALID',
        url: 'http://valid.url.test',
        parser: ($) => {

        }
      }
    ]
  }
})
