const _ = require('lodash')

exports = module.exports = {
  name: 'MINVU',
  url: 'http://www.minvu.cl/opensite_20170103115635.aspx',
  parser: _parser
}

const months = {
  'ene': '01',
  'feb': '02',
  'mar': '03',
  'abr': '04',
  'may': '05',
  'jun': '06',
  'jul': '07',
  'ago': '08',
  'sep': '09',
  'oct': '10',
  'nov': '11',
  'dic': '12'
}

function _parser($) {
  const $news = $('div.noticias_area')
  const root = 'http://www.minvu.cl/'
  const parsed = _.map($news, n => ({
    timestamp: DateToTimeStamp($(n).find('p.date').text().trim()),
    title: $(n).find('h1').text().trim(),
    thumbnail: root + $(n).find('img').attr('src'),
    cannonical: root + $(n).find('a').attr('href')
  }))

  const follow = []

  function RemoveDateText(date_text) {
    return date_text.replace('Publicado el: ', '').replace(' de ', ' ').replace(' del ', ' ')
  }

  function DateToTimeStamp(dateText) {
    const date = RemoveDateText(dateText)
    const parts = date.split(' ')
    parts[0] = parseInt(parts[0])
    const d = parts[0] > 9 ? parts[0] : '0' + parts[0]
    const y = parts[2]
    const m = monthNameToNumber(parts[1])
    return `${y}-${m}-${d} 00:00:00`
  }

  function monthNameToNumber(monthName) {

    return months[monthName]
  }

  return {
    parsed,
    follow,
  }
}
