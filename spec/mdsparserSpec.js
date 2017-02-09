// eslint-disable-next-line no-unused-vars
const should = require('should')
const cheerio = require('cheerio')
const parser = require('../src/mds.parser.js')

describe('MDS Parser', () => {

  describe('border conditions', () => {
    it('declares correct url', () => {
      parser.url.should.equal('http://www.ministeriodesarrollosocial.gob.cl/noticias/')
    })

    it('declares correct name', () => {
      parser.name.should.equal('MDS')
    })

    it('no news returns empty structure', () => {
      const $ = cheerio.load('')
      const parsed = parser.parser($)

      parsed.should.deepEqual({
        follow: [],
        parsed: []
      })
    })
  })

  describe('news list parsing', () => {

    const htmlBlock = `
      <ul class="list"><li>
        <time datetime="2017-01-28 20:32:18">28 de January de 2017</time>
        <h3 class="title">
        <a href="/noticias/2017/01/28/mds-encabeza-operativo-social-en-localidad-de-los-aromos-en-el-maule">
          MDS encabeza operativo social en localidad de Los Aromos en El Maule</a></h3>        
        <img 
          src="http://www.ministeriodesarrollosocial.gob.cl/img/media/9a39e_IMG-20170128-WA0019_crop_690x332.jpg"
          width="160" alt="">
        <p><em>
          En el lugar, afectado por un incendio forestal, se dispusieron encuestadores de la Ficha B&aacute;sica 
          de Emergencia y se entreg&oacute; kit l&uacute;dico para emergencias del Chile Crece Contigo, adem&aacute;s 
          de agua y servicios b&aacute;sicos de salud para residentes y voluntarios.</em></p>
        <a class="more" 
        href="/noticias/2017/01/28/mds-encabeza-operativo-social-en-localidad-de-los-aromos-en-el-maule">
        Seguir leyendo &raquo; </a>
    </li><li>
        <time datetime="2017-01-27 21:30:36">27 de January de 2017</time>
        <h3 class="title">
        <a href="/noticias/2017/01/27/subsecretario-de-servicios-sociales-visito-zona-afectada-de-marchigüe">
        Subsecretario de Servicios Sociales visitó zona afectada de Marchigüe</a></h3>
        <img src="http://www.ministeriodesarrollosocial.gob.cl/img/media/c4d3a_subse.jpg" 
        width="160" alt=""><p><em>
        El viaje se enmarc&oacute; en la entrega de ayuda a quienes han resultado afectados por los incendios 
        que afectan el centro sur del pa&iacute;s, en una acci&oacute;n coordinada &nbsp;por la Presidenta Michelle 
        Bachelet junto con todas las entidades de Gobierno.</em></p>
        <a class="more"
        href="/noticias/2017/01/27/subsecretario-de-servicios-sociales-visito-zona-afectada-de-marchigüe">
        Seguir leyendo &raquo; </a>
    </li></ul>
    `

    it('parses correct amount of articles', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      parsed.parsed.should.not.be.null()
      parsed.parsed.length.should.equal(2)
    })

    it('get source', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      parsed.parsed[0].source.should.equal('Ministerio Desarrollo Social')
    })

    it('parses timestamp', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      parsed.parsed.should.not.be.null()
      parsed.parsed[0].timestamp.should.equal('2017-01-28 20:32:18')
      parsed.parsed[1].timestamp.should.equal('2017-01-27 21:30:36')
    })

    it('parses title', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      parsed.parsed.should.not.be.null()
      parsed.parsed[0].title.should.equal('MDS encabeza operativo social en localidad de Los Aromos en El Maule')
      parsed.parsed[1].title.should.equal('Subsecretario de Servicios Sociales visitó zona afectada de Marchigüe')
    })


    it('parses thumbnail', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      parsed.parsed.should.not.be.null()
      // eslint-disable-next-line max-len
      parsed.parsed[0].thumbnail.should.equal('http://www.ministeriodesarrollosocial.gob.cl/img/media/9a39e_IMG-20170128-WA0019_crop_690x332.jpg')
      // eslint-disable-next-line max-len
      parsed.parsed[1].thumbnail.should.equal('http://www.ministeriodesarrollosocial.gob.cl/img/media/c4d3a_subse.jpg')
    })


    it('parses summary', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      parsed.parsed.should.not.be.null()
      // eslint-disable-next-line max-len
      parsed.parsed[0].summary.should.equal('En el lugar, afectado por un incendio forestal, se dispusieron encuestadores de la Ficha Básica de Emergencia y se entregó kit lúdico para emergencias del Chile Crece Contigo, además de agua y servicios básicos de salud para residentes y voluntarios.')
      // eslint-disable-next-line max-len
      parsed.parsed[1].summary.should.equal('El viaje se enmarcó en la entrega de ayuda a quienes han resultado afectados por los incendios que afectan el centro sur del país, en una acción coordinada  por la Presidenta Michelle Bachelet junto con todas las entidades de Gobierno.')
    })

    it('parses cannonical link', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      parsed.parsed.should.not.be.null()
      // eslint-disable-next-line max-len
      parsed.parsed[0].cannonical.should.equal('http://www.ministeriodesarrollosocial.gob.cl/noticias/2017/01/28/mds-encabeza-operativo-social-en-localidad-de-los-aromos-en-el-maule')
      // eslint-disable-next-line max-len
      parsed.parsed[1].cannonical.should.equal('http://www.ministeriodesarrollosocial.gob.cl/noticias/2017/01/27/subsecretario-de-servicios-sociales-visito-zona-afectada-de-marchigüe')
    })

    it('parses follow links', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      parsed.parsed.should.not.be.null()
      // eslint-disable-next-line max-len
      parsed.follow[0].url.should.equal('http://www.ministeriodesarrollosocial.gob.cl/noticias/2017/01/28/mds-encabeza-operativo-social-en-localidad-de-los-aromos-en-el-maule')
      // eslint-disable-next-line max-len
      parsed.follow[1].url.should.equal('http://www.ministeriodesarrollosocial.gob.cl/noticias/2017/01/27/subsecretario-de-servicios-sociales-visito-zona-afectada-de-marchigüe')
    })

    it('sets follow parser', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      parsed.parsed.should.not.be.null()
      // eslint-disable-next-line max-len
      parsed.follow[0].parser.should.be.type('function')
      // eslint-disable-next-line max-len
      parsed.follow[1].parser.should.be.type('function')
    })
  })

})
