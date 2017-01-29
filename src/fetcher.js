const cheerio = require('cheerio')
// const _ = require('lodash');
const rq = require('request-promise')

const userAgent = 'ChileAyuda.com Web Scraper - ¿Porque no tienen RSS?';

exports = module.exports = {
  fetchHtml,
}

function fetchHtml(url) {
  return rq({
    uri: url,
    transform(body) {
      return cheerio.load(body)
    },
    rejectUnauthorized: false,
    headers: {
      'User-Agent': userAgent
    }
  })
  .then(result => result)
}
