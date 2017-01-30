// eslint-disable-next-line no-unused-vars
const should = require('should')
const cheerio = require('cheerio')
const parser = require('../src/gobtalca.parser.js')

describe('MDS Parser', () => {

    describe('border conditions', () => {
        it('declares correct url', () => {
            parser.url.should.equal('http://www.gobernaciontalca.gov.cl/noticias/')
        })

        it('declares correct name', () => {
            parser.name.should.equal('GOBTALCA')
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
      <div class="post tarjeta">
        <div class="pic">
          <a href="/sin-categoria/detalle-de-beneficios-para-afectados-por-incendios-forestales/">
          <img width="320" height="210" src="/media/2017/01/presi-2-320x210.jpg" 
          class="attachment-320x210 size-320x210 wp-post-image" alt="presi 2" />               </a>
        </div>
        <div class="texto">
          <span class="meta">27 de enero de 2017 </span>
          <h4 class="title">
          <a href="/sin-categoria/detalle-de-beneficios-para-afectados-por-incendios-forestales/">
          Detalle de beneficios para afectados por incendios forestales</a></h4>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="post tarjeta">
        <div class="pic">
          <a href="/noticias/beneficios-para-afectados-por-incendios-forestales/">
          <img width="320" height="210" src="/media/2017/01/Logo-web-320x210.jpg" 
          class="attachment-320x210 size-320x210 wp-post-image" alt="Logo-web" />               </a>
        </div>
        <div class="texto">
          <span class="meta">26 de enero de 2017 </span>
          <h4 class="title">
          <a href="/noticias/beneficios-para-afectados-por-incendios-forestales/">
          Beneficios para afectados por incendios forestales</a></h4>
        </div>
        <div class="clearfix"></div>
      </div>
    `

        it('parses correct amount of articles', () => {
            const $ = cheerio.load(htmlBlock)
            const parsed = parser.parser($)

            parsed.parsed.should.not.be.null()
            parsed.parsed.length.should.equal(2)
        })


        it('parses timestamp', () => {
            const $ = cheerio.load(htmlBlock)
            const parsed = parser.parser($)

            parsed.parsed.should.not.be.null()
            parsed.parsed[0].timestamp.should.equal('2017-01-27 00:00:00')
            parsed.parsed[1].timestamp.should.equal('2017-01-26 00:00:00')
        })

        it('parses title', () => {
            const $ = cheerio.load(htmlBlock)
            const parsed = parser.parser($)

            parsed.parsed.should.not.be.null()
            parsed.parsed[0].title.should.equal('Detalle de beneficios para afectados por incendios forestales')
            parsed.parsed[1].title.should.equal('Beneficios para afectados por incendios forestales')
        })


        it('parses thumbnail', () => {
            const $ = cheerio.load(htmlBlock)
            const parsed = parser.parser($)

            parsed.parsed.should.not.be.null()
                // eslint-disable-next-line max-len
            parsed.parsed[0].thumbnail.should.equal('http://www.gobernaciontalca.gov.cl/media/2017/01/presi-2-320x210.jpg')
                // eslint-disable-next-line max-len
            parsed.parsed[1].thumbnail.should.equal('http://www.gobernaciontalca.gov.cl/media/2017/01/Logo-web-320x210.jpg')
        })

        it('parses cannonical link', () => {
            const $ = cheerio.load(htmlBlock)
            const parsed = parser.parser($)

            parsed.parsed.should.not.be.null()
                // eslint-disable-next-line max-len
            parsed.parsed[0].cannonical.should.equal('http://www.gobernaciontalca.gov.cl/sin-categoria/detalle-de-beneficios-para-afectados-por-incendios-forestales/')
                // eslint-disable-next-line max-len
            parsed.parsed[1].cannonical.should.equal('http://www.gobernaciontalca.gov.cl/noticias/beneficios-para-afectados-por-incendios-forestales/')
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

    })

})
