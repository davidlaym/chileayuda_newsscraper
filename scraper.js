const fetcher = require('./lib/fetcher')
const controllerBuilder = require('./lib/controller')
const _ = require('lodash')
// const config = require('./appConfig.json');
const argv = require('yargs')
            .usage('Usage: $0 --source [source name] \n Check Readme.md for currently supported sources')
            .alias('s', 'source')
            .demandOption(['source'])
            .argv


//routes
const parserNames = [
  'mds',
  'gobcord'
]

// load child routers
const parsers = _(parserNames)
  .chain()
  .map(n => require(`./src/${n}.parser.js`))
  .value()

const controller = controllerBuilder.build(fetcher, parsers)

const chainParams = {
  source: argv.source
}

Promise
  .resolve(chainParams)
  .then(controller.scrape)

