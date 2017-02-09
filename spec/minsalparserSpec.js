// eslint-disable-next-line no-unused-vars
const should = require('should')
const cheerio = require('cheerio')
const parser = require('../src/minsal.parser.js')

describe('Minsal Parser', () => {

  describe('border conditions', () => {
    it('declares correct url', () => {
      parser.url.should.equal('http://web.minsal.cl/category/noticias/')
    })

    it('declares correct name', () => {
      parser.name.should.equal('MINSAL')
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

    /* eslint-disable */
    const htmlBlock = `
      <div class="stream">
        <h5>Noticias</h5>
        <div class="post tarjeta">
            <div class="pic">
                <a href="http://web.minsal.cl/emergencia-por-incendios-forestales-intenso-trabajo-de-equipos-de-respuesta-rapida-del-ministerio-de-salud-en-las-regiones-de-ohiggins-maule-y-biobio/">
                <img width="320" height="210" src="http://web.minsal.cl/wp-content/uploads/2017/01/ERR-320x210.png" class="attachment-320x210 size-320x210 wp-post-image" alt="">                               </a>
            </div>
            <div class="texto">
                <span class="meta">31 de enero de 2017 </span>
                <h4 class="title">
                <a href="http://web.minsal.cl/emergencia-por-incendios-forestales-intenso-trabajo-de-equipos-de-respuesta-rapida-del-ministerio-de-salud-en-las-regiones-de-ohiggins-maule-y-biobio/">Emergencia por incendios forestales: Intenso trabajo de Equipos de Respuesta Rápida del Ministerio de Salud en regiones afectadas</a></h4>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="post tarjeta">
            <div class="pic">
            <a href="http://web.minsal.cl/ministra-de-salud-en-santa-olga-hay-personas-que-han-vivido-situaciones-dramaticas-y-hemos-dispuesto-equipos-para-apoyar-la-salud-mental-de-la-poblacion/">
            <img width="320" height="210" src="http://web.minsal.cl/wp-content/uploads/2017/01/STA_OLGA_30_01_2017_01-320x210.jpg" class="attachment-320x210 size-320x210 wp-post-image" alt="">                                </a>
            </div>
            <div class="texto">
            <span class="meta">30 de enero de 2017 </span>
            <h4 class="title"><a href="http://web.minsal.cl/ministra-de-salud-en-santa-olga-hay-personas-que-han-vivido-situaciones-dramaticas-y-hemos-dispuesto-equipos-para-apoyar-la-salud-mental-de-la-poblacion/">Ministra de Salud en Santa Olga: Hay personas que han vivido situaciones dramáticas y hemos dispuesto equipos para apoyar la salud mental de la población</a></h4>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="post tarjeta">
            <div class="pic">
            <a href="http://web.minsal.cl/ministerio-de-salud-valora-esfuerzo-desplegado-por-trabajadores-de-la-red-asistencial/">
            <img width="320" height="210" src="http://web.minsal.cl/wp-content/uploads/2017/01/subsecretaria-alarcon-samu-320x210.png" class="attachment-320x210 size-320x210 wp-post-image" alt="">                                </a>
            </div>
            <div class="texto">
            <span class="meta">30 de enero de 2017 </span>
            <h4 class="title"><a href="http://web.minsal.cl/ministerio-de-salud-valora-esfuerzo-desplegado-por-trabajadores-de-la-red-asistencial/">Subsecretaria de Redes Asistenciales y situación de incendios forestales: Más de 200 personas han contribuido a aumentar la dotación de los equipos en terreno</a></h4>
            </div>
            <div class="clearfix"></div>
        </div>       
    </div>
    `
    /* eslint-enable */

    it('parses correct amount of articles', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      parsed.parsed.should.not.be.null()
      parsed.parsed.length.should.equal(3)
    })

    it('get source', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      parsed.parsed[0].source.should.equal('Ministerio de Salud')
    })

    it('parses timestamp', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      parsed.parsed.should.not.be.null()
      parsed.parsed[0].timestamp.should.equal('2017-01-31 00:00:00')
      parsed.parsed[1].timestamp.should.equal('2017-01-30 00:00:00')
    })

    it('parses title', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      parsed.parsed.should.not.be.null()
      // eslint-disable-next-line max-len
      parsed.parsed[0].title.should.equal('Emergencia por incendios forestales: Intenso trabajo de Equipos de Respuesta Rápida del Ministerio de Salud en regiones afectadas')
      // eslint-disable-next-line max-len
      parsed.parsed[1].title.should.equal('Ministra de Salud en Santa Olga: Hay personas que han vivido situaciones dramáticas y hemos dispuesto equipos para apoyar la salud mental de la población')
    })


    it('parses thumbnail', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      parsed.parsed.should.not.be.null()
      // eslint-disable-next-line max-len
      parsed.parsed[0].thumbnail.should.equal('http://web.minsal.cl/wp-content/uploads/2017/01/ERR-320x210.png')
      // eslint-disable-next-line max-len
      parsed.parsed[1].thumbnail.should.equal('http://web.minsal.cl/wp-content/uploads/2017/01/STA_OLGA_30_01_2017_01-320x210.jpg')
    })

    it('parses cannonical link', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      parsed.parsed.should.not.be.null()
      // eslint-disable-next-line max-len
      parsed.parsed[0].cannonical.should.equal('http://web.minsal.cl/emergencia-por-incendios-forestales-intenso-trabajo-de-equipos-de-respuesta-rapida-del-ministerio-de-salud-en-las-regiones-de-ohiggins-maule-y-biobio/')

      // eslint-disable-next-line max-len
      parsed.parsed[1].cannonical.should.equal('http://web.minsal.cl/ministra-de-salud-en-santa-olga-hay-personas-que-han-vivido-situaciones-dramaticas-y-hemos-dispuesto-equipos-para-apoyar-la-salud-mental-de-la-poblacion/')
    })

  })

})
