// eslint-disable-next-line no-unused-vars
const should = require('should')
const cheerio = require('cheerio')
const parser = require('../src/gobcord.parser.js')

describe('GobCoord Parser', () => {

  describe('border conditions', () => {
    it('declares correct url', () => {
      parser.url.should.equal('http://www.gobernacioncordillera.gov.cl/noticias/')
    })

    it('declares correct name', () => {
      parser.name.should.equal('GOBCORD')
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
    /* eslint-disable max-len */
    const htmlBlock = `
	      <div class="stream">

					<h5>Noticias</h5>

											<div class="post tarjeta">
							<div class="pic">
								<a href="/noticias/brigadistas-de-conaf-y-helicopteros-siguen-trabajando-en-incendios-forestales-de-pirque-y-el-canelo/">
									<img width="320" height="210" src="/media/2017/01/DSC_3842-320x210.jpg" class="attachment-320x210 size-320x210 wp-post-image" alt="" />								</a>
							</div>
							<div class="texto">
								<span class="meta">27 de enero de 2017 </span>
								<h4 class="title"><a href="/noticias/brigadistas-de-conaf-y-helicopteros-siguen-trabajando-en-incendios-forestales-de-pirque-y-el-canelo/">BRIGADISTAS DE CONAF Y HELICÓPTEROS SIGUEN TRABAJANDO EN INCENDIOS FORESTALES DE PIRQUE Y EL CANELO   </a></h4>
							</div>
							<div class="clearfix"></div>
						</div>
											<div class="post tarjeta">
							<div class="pic">
								<a href="/noticias/cinco-companias-de-bomberos-cuatro-aljibes-y-dos-brigadas-conaf-combaten-el-fuego-en-incendio-forestal-de-el-canelo/">
									<img width="320" height="210" src="/media/2017/01/IMG-20170124-WA0003-320x210.jpg" class="attachment-320x210 size-320x210 wp-post-image" alt="" />								</a>
							</div>
							<div class="texto">
								<span class="meta">24 de enero de 2017 </span>
								<h4 class="title"><a href="/noticias/cinco-companias-de-bomberos-cuatro-aljibes-y-dos-brigadas-conaf-combaten-el-fuego-en-incendio-forestal-de-el-canelo/">CINCO COMPAÑÍAS DE BOMBEROS, CUATRO ALJIBES Y DOS BRIGADAS CONAF COMBATEN EL FUEGO EN INCENDIO FORESTAL DE EL CANELO</a></h4>
							</div>
							<div class="clearfix"></div>
						</div>
											<div class="post tarjeta">
							<div class="pic">
								<a href="/noticias/gobernacion-conaf-ejercito-y-bomberos-han-trabajado-arduamente-para-extinguir-incendio-en-pirque/">
									<img width="320" height="210" src="/media/2017/01/en-el-fuego-320x210.jpg" class="attachment-320x210 size-320x210 wp-post-image" alt="" />								</a>
							</div>
							<div class="texto">
								<span class="meta">23 de enero de 2017 </span>
								<h4 class="title"><a href="/noticias/gobernacion-conaf-ejercito-y-bomberos-han-trabajado-arduamente-para-extinguir-incendio-en-pirque/">GOBERNACIÓN, CONAF, EJÉRCITO Y BOMBEROS HAN TRABAJADO ARDUAMENTE PARA EXTINGUIR INCENDIO EN PIRQUE</a></h4>
							</div>
							<div class="clearfix"></div>
						</div>
											<div class="post tarjeta">
							<div class="pic">
								<a href="/noticias/gobernacion-cordillera-presento-querella-por-femicidio-frustrado-en-puente-alto/">
									<img width="320" height="210" src="/media/2017/01/PRESENTACION-QUERELLA-POR-FEMICIDIO-FRUSTRADO-320x210.jpg" class="attachment-320x210 size-320x210 wp-post-image" alt="" />								</a>
							</div>
							<div class="texto">
								<span class="meta">19 de enero de 2017 </span>
								<h4 class="title"><a href="/noticias/gobernacion-cordillera-presento-querella-por-femicidio-frustrado-en-puente-alto/">GOBERNACIÓN CORDILLERA PRESENTÓ QUERELLA POR FEMICIDIO FRUSTRADO EN PUENTE ALTO</a></h4>
							</div>
							<div class="clearfix"></div>
						</div>
											<div class="post tarjeta">
							<div class="pic">
								<a href="/noticias/caminata-de-seguridad-publica-en-villa-padre-hurtado-de-puente-alto/">
									<img width="320" height="210" src="/media/2017/01/caminata-seguridad-publica-padre-hurtado-1-320x210.jpg" class="attachment-320x210 size-320x210 wp-post-image" alt="" />								</a>
							</div>
							<div class="texto">
								<span class="meta">18 de enero de 2017 </span>
								<h4 class="title"><a href="/noticias/caminata-de-seguridad-publica-en-villa-padre-hurtado-de-puente-alto/">CAMINATA DE SEGURIDAD PÚBLICA EN VILLA PADRE HURTADO DE PUENTE ALTO</a></h4>
							</div>
							<div class="clearfix"></div>
						</div>
											<div class="post tarjeta">
							<div class="pic">
								<a href="/noticias/vecinos-de-bajos-de-mena-dialogaron-en-terreno-con-comision-de-diputados/">
									<img width="320" height="210" src="/media/2017/01/poblaodra-hablando-320x210.jpg" class="attachment-320x210 size-320x210 wp-post-image" alt="" />								</a>
							</div>
							<div class="texto">
								<span class="meta">16 de enero de 2017 </span>
								<h4 class="title"><a href="/noticias/vecinos-de-bajos-de-mena-dialogaron-en-terreno-con-comision-de-diputados/"> VECINOS DE BAJOS DE MENA DIALOGARON EN TERRENO CON COMISIÓN DE DIPUTADOS  </a></h4>
							</div>
							<div class="clearfix"></div>
						</div>
											<div class="post tarjeta">
							<div class="pic">
								<a href="/noticias/dos-millones-de-personas-beneficiadas-con-politicas-de-seguridad-publica-del-gobierno/">
									<img width="320" height="210" src="/media/2017/01/aleuy-en-bajos-de-mena-1-320x210.jpg" class="attachment-320x210 size-320x210 wp-post-image" alt="" />								</a>
							</div>
							<div class="texto">
								<span class="meta">13 de enero de 2017 </span>
								<h4 class="title"><a href="/noticias/dos-millones-de-personas-beneficiadas-con-politicas-de-seguridad-publica-del-gobierno/">DOS MILLONES DE PERSONAS BENEFICIADAS CON POLÍTICAS DE SEGURIDAD PÚBLICA DEL GOBIERNO</a></h4>
							</div>
							<div class="clearfix"></div>
						</div>
											<div class="post tarjeta">
							<div class="pic">
								<a href="/noticias/un-millon-700-mil-personas-son-beneficiadas-con-nueva-ley-de-servicios-sanitarios-y-agua-potable-rural/">
									<img width="320" height="210" src="/media/2017/01/APR-MOP-320x210.jpg" class="attachment-320x210 size-320x210 wp-post-image" alt="" />								</a>
							</div>
							<div class="texto">
								<span class="meta">9 de enero de 2017 </span>
								<h4 class="title"><a href="/noticias/un-millon-700-mil-personas-son-beneficiadas-con-nueva-ley-de-servicios-sanitarios-y-agua-potable-rural/">UN MILLÓN 700 MIL PERSONAS SON BENEFICIADAS CON NUEVA LEY DE SERVICIOS SANITARIOS Y AGUA POTABLE RURAL</a></h4>
							</div>
							<div class="clearfix"></div>
						</div>
											<div class="post tarjeta">
							<div class="pic">
								<a href="/noticias/gobernacion-cordillera-inicio-talleres-de-monitores-comunitarios-para-prevenir-violencia-contra-la-mujer/">
									<img width="320" height="210" src="/media/2016/12/monitores-1-320x210.jpg" class="attachment-320x210 size-320x210 wp-post-image" alt="" />								</a>
							</div>
							<div class="texto">
								<span class="meta">28 de diciembre de 2016 </span>
								<h4 class="title"><a href="/noticias/gobernacion-cordillera-inicio-talleres-de-monitores-comunitarios-para-prevenir-violencia-contra-la-mujer/">GOBERNACION CORDILLERA INICIÓ TALLERES DE MONITORES COMUNITARIOS PARA PREVENIR VIOLENCIA CONTRA LA MUJER</a></h4>
							</div>
							<div class="clearfix"></div>
						</div>
											<div class="post tarjeta">
							<div class="pic">
								<a href="/noticias/ministro-de-desarrollo-social-realiza-cierre-de-proceso-constituyente-indigena-nacional-en-puente-alto/">
									<img width="320" height="210" src="/media/2016/12/cierre-5-320x210.jpg" class="attachment-320x210 size-320x210 wp-post-image" alt="" />								</a>
							</div>
							<div class="texto">
								<span class="meta">23 de diciembre de 2016 </span>
								<h4 class="title"><a href="/noticias/ministro-de-desarrollo-social-realiza-cierre-de-proceso-constituyente-indigena-nacional-en-puente-alto/">MINISTRO DE DESARROLLO SOCIAL REALIZA CIERRE DE PROCESO CONSTITUYENTE INDÍGENA NACIONAL EN PUENTE ALTO</a></h4>
							</div>
							<div class="clearfix"></div>
						</div>
										
				</div>
    `
    /* eslint-enable max-len */

    it('parses correct amount of articles', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      parsed.parsed.should.not.be.null()
      parsed.parsed.length.should.equal(10)
    })

    it('get source', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      parsed.parsed[0].source.should.equal('Gobernación Cordillera')
    })

    it('parses timestamp', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      parsed.parsed[0].timestamp.should.equal('2017-01-27 00:00:00')
    })

    it('parses title', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      // eslint-disable-next-line max-len
      parsed.parsed[0].title.should.equal('BRIGADISTAS DE CONAF Y HELICÓPTEROS SIGUEN TRABAJANDO EN INCENDIOS FORESTALES DE PIRQUE Y EL CANELO')
    })

    it('parses thumbnail', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      // eslint-disable-next-line max-len
      parsed.parsed[0].thumbnail.should.equal('http://www.gobernacioncordillera.gov.cl/media/2017/01/DSC_3842-320x210.jpg')
    })

    it('parses cannonical', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      // eslint-disable-next-line max-len
      parsed.parsed[0].cannonical.should.equal('http://www.gobernacioncordillera.gov.cl/noticias/brigadistas-de-conaf-y-helicopteros-siguen-trabajando-en-incendios-forestales-de-pirque-y-el-canelo/')
    })
  })
})
