const fetcher = require('./src/fetcher')
const controllerBuilder = require('./src/controller')
const writer = require('./src/writer')
const _ = require('lodash')
// const config = require('./appConfig.json');
const argv = require('yargs')
            .usage('Usage: $0 -s <source-name> -o <file-path>', 'Check Readme.md for currently supported sources')
            .alias('s', 'source')
            .nargs('s', 1)
            .alias('o', 'output')
            .nargs('o', 1)
            .demandOption(['s', 'o'])
            .argv


//routes
const parserNames = [
  'mds',
  'gobcord',
  'gobtalca',
  'minvu'
]

// load child routers
const parsers = _.map(parserNames, n => require(`./src/${n}.parser.js`))

const controller = controllerBuilder(fetcher, writer, parsers)

const chainParams = {
  source: argv.source,
  output: argv.output
}

Promise
  .resolve(chainParams)
  .then(controller.scrape.bind(controller))
  .catch(err => {
    console.log('unhandled error', err)
  })

