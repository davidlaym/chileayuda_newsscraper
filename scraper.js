const fetcher = require('./lib/fetcher')
const controllerBuilder = require('./lib/controller')
// const config = require('./appConfig.json');
const argv = require('yargs')
            .usage('Usage: $0 --source [source name] \n Check Readme.md for currently supported sources')
            .alias('s', 'source')
            .demandOption(['source'])
            .argv



const controller = controllerBuilder.build(fetcher)

const chainParams = {
  source: argv.source
}

Promise
  .resolve(chainParams)
  .then(controller.checkValidSource)
  .then(controller.scrape)

