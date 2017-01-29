const _ = require('lodash')

exports = module.exports = {
  name: 'MDS',
  url: 'http://www.ministeriodesarrollosocial.gob.cl/noticias/',
  parser: _parser
}

function _parser($) {
  const $news = $('ul.list li')
  const root = 'http://www.gobernacioncordillera.gov.cl'

  const parsed = _.map($news, n => ({
    timestamp: $(n).find('time').attr('datetime'),
    title: $(n).find('h3 a').text().trim(),
    thumbnail: $(n).find('img').attr('src'),
    summary: $(n).find('p em').text().trim().replace(/ {2,100}/g, '').replace(/[\r|\n]/g, ''),
    cannonical: root + $(n).find('li>a').attr('href')
  }))

  const follow = _.map(parsed, n => ({
    url: n.cannonical,
    parser: singleParser
  }))


  return {
    parsed,
    follow,
  }

  function singleParser($) {
    return {
      //   structure: {},
      //   follow: [
      //     {
      //       url: '',
      //       parser: ($) => {
      //       }
      //     }
      //   ],
    }
  }
}
