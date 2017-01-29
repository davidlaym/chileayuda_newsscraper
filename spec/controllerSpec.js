
// eslint-disable-no-unused-vars
const should = require('should')
const cheerio = require('cheerio')
// let sinon = require('sinon')
// let Promise = require('bluebird')
const controllerBuilder = require('../src/controller')

describe('Controller', () => {

  function createController() {
    return controllerBuilder(generateFakeForFetcher())
  }

  describe('Validates Sources', () => {

    it('throws when no params are given', done => {
      const controller = createController()

      controller.checkValidSource()
        .then(() => {
          should.fail('there was no exception thrown')
          done()
        })
        .catch(() => {
          done()
        })

    })
    it('throws when no source are given', () => {
      const controller = createController()
      try {
        controller.checkValidSource({})
        should.fail('there was no exception thrown')
      } catch (err) {

      }
    })
  })

  function generateFakeForFetcher() {
    return {
      fetchHtml(rootUrl) {
        return Promise.resolve(cheerio.load('<div></div>'))
      }
    }
  }
})
