const _ = require('lodash')

exports = module.exports = {
  name: 'MINSAL',
  url: 'http://web.minsal.cl/category/noticias/',
  parser: _parser
}

const months = {
  'enero': '01',
  'febrero': '02',
  'marzo': '03',
  'abril': '04',
  'mayo': '05',
  'junio': '06',
  'julio': '07',
  'agosto': '08',
  'septiembre': '09',
  'octubre': '10',
  'noviembre': '11',
  'diciembre': '12'
}

function _parser($) {
  const $news = $('div.post.tarjeta')
  const root = ''

  const parsed = _.map($news, n => ({
    source: 'Ministerio de Salud',
    timestamp: DateToTimeStamp($(n).find('div.texto span.meta').text().trim()),
    title: $(n).find('div.texto h4.title').text().trim(),
    thumbnail: root + $(n).find('img').attr('src'),
    cannonical: root + $(n).find('a').attr('href')
  }))

  const follow = []

  function DateToTimeStamp(date) {
    const parts = date.split(' ')
    const d = parseInt(parts[0]) > 9 ? parts[0] : '0' + parts[0]
    const y = parts[4]
    const m = monthNameToNumber(parts[2])
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
