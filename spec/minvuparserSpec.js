// eslint-disable-next-line no-unused-vars
const should = require('should')
const cheerio = require('cheerio')
const parser = require('../src/minvu.parser.js')

describe('Minvu Parser', () => {

  describe('border conditions', () => {
    it('declares correct url', () => {
      parser.url.should.equal('http://www.minvu.cl/opensite_20170103115635.aspx')
    })

    it('declares correct name', () => {
      parser.name.should.equal('MINVU')
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
      <table width="100%" border="0" cellspacing="2" cellpadding="2" id="ops-tem-dTemplate"><tbody><tr>
      <td width="100%" valign="top" class="tdResumen_">
      <a name="20170203144515"></a><div class="ops-tem-dDesContenido"><div class="noticias_area"><h1><a href="opensite_det_20170203144744.aspx">Antofagasta, una región que avanza en desarrollo urbano e integración</a></h1><div class="img"><img src="rps_minvu_v56/OpenSite/Minvu/Más Noticias/Archivo Histórico de Noticias/Archivo de noticias 2017/Enero/Subse Antofagasta OK01.jpg" alt="" width="300" border="0"></div><p class="date">Publicado el: 03 de feb del 2017</p><p></p><p class="leer_mas"><a href="opensite_det_20170203144744.aspx">» Leer más</a></p><div class="bt"></div></div> <div align="right"></div></div><div align="right" class="ops-detalle"><a href="opensite_det_20170203144744.aspx" onmouseover="window.status=''; return true" target="_top"><img src="rps_minvu_v56/template/nada_13105026234921978.gif" alt="" border="0"></a></div></td></tr><tr><td width="100%" valign="top" class="tdResumen_"><a name="20170202162129"></a><div class="ops-tem-dDesContenido"><div class="noticias_area"><h1><a href="opensite_det_20170202162313.aspx">Ministra Saball invita al sector privado a participar en la reconstrucción del Maule</a></h1><div class="img"><img src="rps_minvu_v56/OpenSite/Minvu/Más Noticias/Archivo Histórico de Noticias/Archivo de noticias 2017/Enero/ministra saball maule201.jpg" alt="" width="300" border="0"></div><p class="date">Publicado el: 02 de feb del 2017</p><p></p><p class="leer_mas"><a href="opensite_det_20170202162313.aspx">» Leer más</a></p><div class="bt"></div></div> <div align="right"></div></div><div align="right" class="ops-detalle"><a href="opensite_det_20170202162313.aspx" onmouseover="window.status=''; return true" target="_top"><img src="rps_minvu_v56/template/nada_13105026234921978.gif" alt="" border="0"></a></div></td></tr><tr><td width="100%" valign="top" class="tdResumen_"><a name="20170201172621"></a><div class="ops-tem-dDesContenido"><div class="noticias_area"><h1><a href="opensite_det_20170201172818.aspx">Gobierno avanza en plan de reconstrucción participativo de Santa Olga y alrededores </a></h1><div class="img"><img src="rps_minvu_v56/OpenSite/Minvu/Más Noticias/Archivo Histórico de Noticias/Archivo de noticias 2017/Enero/IMG_282301.JPG" alt="" width="300" border="0"></div><p class="date">Publicado el: 01 de feb del 2017</p><p>La Ministra de Vivienda y Urbanismo, Paulina Saball, encabezó la segunda reunión con la mesa de trabajo que incluye a los dirigentes del sector, para impulsar un proceso de reconstrucción pertinente a las aspiraciones de los vecinos afectados por el incendio.</p><p class="leer_mas"><a href="opensite_det_20170201172818.aspx">» Leer más</a></p><div class="bt"></div></div> <div align="right"></div></div><div align="right" class="ops-detalle"><a href="opensite_det_20170201172818.aspx" onmouseover="window.status=''; return true" target="_top"><img src="rps_minvu_v56/template/nada_13105026234921978.gif" alt="" border="0"></a></div></td></tr><tr><td width="100%" valign="top" class="tdResumen_"><a name="20170131180603"></a><div class="ops-tem-dDesContenido"><div class="noticias_area"><h1><a href="opensite_det_20170131180751.aspx">Ministra Saball visita zonas afectadas en Biobío y entrega catastro preliminar de viviendas dañadas por incendios</a></h1><div class="img"><img src="rps_minvu_v56/OpenSite/Minvu/Más Noticias/Archivo Histórico de Noticias/Archivo de noticias 2017/Enero/Ministra Florida 401.jpg" alt="" width="300" border="0"></div><p class="date">Publicado el: 31 de ene del 2017</p><p>Ministra de Vivienda y Urbanismo informó que de 206 viviendas catastradas, 164 presentan daño irreparable y se concentran en las comunas de Florida, Quirihue, Tomé, San Nicolás, Concepción y Hualqui. Las secretaria de Estado se reunió con contratistas de la zona para empezar a trabajar en el proceso de reconstrucción regional.</p><p class="leer_mas"><a href="opensite_det_20170131180751.aspx">» Leer más</a></p><div class="bt"></div></div> <div align="right"></div></div><div align="right" class="ops-detalle"><a href="opensite_det_20170131180751.aspx" onmouseover="window.status=''; return true" target="_top"><img src="rps_minvu_v56/template/nada_13105026234921978.gif" alt="" border="0"></a></div></td></tr><tr><td width="100%" valign="top" class="tdResumen_"><a name="20170129164655"></a><div class="ops-tem-dDesContenido"><div class="noticias_area"><h1><a href="opensite_det_20170129164937.aspx">Minvu elabora plan de reconstrucción junto a vecinos de Santa Olga</a></h1><div class="img"><img src="rps_minvu_v56/OpenSite/Minvu/Más Noticias/Archivo Histórico de Noticias/Archivo de noticias 2017/Enero/ministra en santa olga01.jpg" alt="" width="300" border="0"></div><p class="date">Publicado el: 29 de ene del 2017</p><p>Ministra Paulina Saball informó este domingo que familias afectadas por el incendio en Santa Olga, Los Aromos y Altos de Morán, en la región del Maule, recibirán subsidios de arriendo o de acogida como apoyo previo a la recepción de una solución habitacional definitiva. </p><p class="leer_mas"><a href="opensite_det_20170129164937.aspx">» Leer más</a></p><div class="bt"></div></div> <div align="right"></div></div><div align="right" class="ops-detalle"><a href="opensite_det_20170129164937.aspx" onmouseover="window.status=''; return true" target="_top"><img src="rps_minvu_v56/template/nada_13105026234921978.gif" alt="" border="0"></a></div></td></tr><tr><td width="100%" valign="top" class="tdResumen_"><a name="20170128134811"></a><div class="ops-tem-dDesContenido"><div class="noticias_area"><h1><a href="opensite_det_20170128135003.aspx">Más de 4.400 familias recibieron su subsidio habitacional en la Región Metropolitana</a></h1><div class="img"><img src="rps_minvu_v56/OpenSite/Minvu/Más Noticias/Archivo Histórico de Noticias/Archivo de noticias 2017/Enero/entrega de subsidios01.jpg" alt="" width="300" border="0"></div><p class="date">Publicado el: 28 de ene del 2017</p><p>El Seremi metropolitano dijo que “hoy cumplimos con uno de los compromisos asumidos por la Presidenta con las familias de sectores medios, en cuanto a diversificar y otorgar más y mejores herramientas para el acceso a una vivienda”.</p><p class="leer_mas"><a href="opensite_det_20170128135003.aspx">» Leer más</a></p><div class="bt"></div></div> <div align="right"></div></div><div align="right" class="ops-detalle"><a href="opensite_det_20170128135003.aspx" onmouseover="window.status=''; return true" target="_top"><img src="rps_minvu_v56/template/nada_13105026234921978.gif" alt="" border="0"></a></div></td></tr><tr><td width="100%" valign="top" class="tdResumen_"><a name="20170127155333"></a><div class="ops-tem-dDesContenido"><div class="noticias_area"><h1><a href="opensite_det_20170127155528.aspx">Ministra Saball: “Buscaremos las soluciones habitacionales más adecuadas a la realidad de cada lugar”</a></h1><div class="img"><img src="rps_minvu_v56/OpenSite/Minvu/Más Noticias/Archivo Histórico de Noticias/Archivo de noticias 2017/Enero/IMG_278801.JPG" alt="" width="300" border="0"></div><p class="date">Publicado el: 27 de ene del 2017</p><p>La autoridad se reunió con el intendente y parlamentarios de la región para informar las líneas de acción del Minvu con las familias que resultaron afectadas tras el incendio.<br></p><p class="leer_mas"><a href="opensite_det_20170127155528.aspx">» Leer más</a></p><div class="bt"></div></div> <div align="right"></div></div><div align="right" class="ops-detalle"><a href="opensite_det_20170127155528.aspx" onmouseover="window.status=''; return true" target="_top"><img src="rps_minvu_v56/template/nada_13105026234921978.gif" alt="" border="0"></a></div></td></tr><tr><td width="100%" valign="top" class="tdResumen_"><a name="20170126193851"></a><div class="ops-tem-dDesContenido"><div class="noticias_area"><h1><a href="opensite_det_20170126194055.aspx">Ministra Saball gestiona soluciones habitacionales para familias damnificadas en O´Higgins</a></h1><div class="img"><img src="rps_minvu_v56/OpenSite/Minvu/Más Noticias/Archivo Histórico de Noticias/Archivo de noticias 2017/Enero/foto101.jpg" alt="" width="300" border="0"></div><p class="date">Publicado el: 26 de ene del 2017</p><p>La autoridad visitó diversas comunas de la región para conocer en profundidad la situación de las familias afectadas por los incendios forestales.</p><p class="leer_mas"><a href="opensite_det_20170126194055.aspx">» Leer más</a></p><div class="bt"></div></div> <div align="right"></div></div><div align="right" class="ops-detalle"><a href="opensite_det_20170126194055.aspx" onmouseover="window.status=''; return true" target="_top"><img src="rps_minvu_v56/template/nada_13105026234921978.gif" alt="" border="0"></a></div></td></tr><tr><td width="100%" valign="top" class="tdResumen_"><a name="20170123155539"></a><div class="ops-tem-dDesContenido"><div class="noticias_area"><h1><a href="opensite_det_20170123160140.aspx">Ministros Saball y Gómez-Lobo anuncian apertura de Consulta Pública sobre Ley de Aportes al Espacio Público</a></h1><div class="img"><img src="rps_minvu_v56/OpenSite/Minvu/Más Noticias/Archivo Histórico de Noticias/Archivo de noticias 2017/Enero/ministra saball y Gomez Lobo01.jpg" alt="" width="300" border="0"></div><p class="date">Publicado el: 23 de ene del 2017</p><p>El proceso para recibir contribuciones y observaciones de personas e instituciones estará abierto desde este 23 de enero al 6 de marzo.</p><p class="leer_mas"><a href="opensite_det_20170123160140.aspx">» Leer más</a></p><div class="bt"></div></div> <div align="right"></div></div><div align="right" class="ops-detalle"><a href="opensite_det_20170123160140.aspx" onmouseover="window.status=''; return true" target="_top"><img src="rps_minvu_v56/template/nada_13105026234921978.gif" alt="" border="0"></a></div></td></tr><tr><td width="100%" valign="top" class="tdResumen_"><a name="20170121145848"></a><div class="ops-tem-dDesContenido"><div class="noticias_area"><h1><a href="opensite_det_20170121150220.aspx">Minvu y Senadis firman convenio que promueve la accesibilidad universal en vivienda, barrio y ciudad</a></h1><div class="img"><img src="rps_minvu_v56/OpenSite/Minvu/Más Noticias/Archivo Histórico de Noticias/Archivo de noticias 2017/Enero/FirmaConvenioWEb01.jpg" alt="" width="300" border="0"></div><p class="date">Publicado el: 21 de ene del 2017</p><p>La iniciativa ofrece atención preferencial a personas identificadas por SENADIS como casos de alto impacto social y en condición de extrema vulnerabilidad, para acceder a subsidios habitacionales.</p><p class="leer_mas"><a href="opensite_det_20170121150220.aspx">» Leer más</a></p><div class="bt"></div></div> <div align="right"></div></div><div align="right" class="ops-detalle"><a href="opensite_det_20170121150220.aspx" onmouseover="window.status=''; return true" target="_top"><img src="rps_minvu_v56/template/nada_13105026234921978.gif" alt="" border="0"></a></div></td></tr>
      </tbody></table>
    `
    /* eslint-enable */

    it('parses correct amount of articles', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      parsed.parsed.should.not.be.null()
      parsed.parsed.length.should.equal(10)
    })

    it('get source', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      parsed.parsed[0].source.should.equal('Minvu')
    })

    it('parses timestamp', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      parsed.parsed.should.not.be.null()
      parsed.parsed[0].timestamp.should.equal('2017-02-03 00:00:00')
      parsed.parsed[1].timestamp.should.equal('2017-02-02 00:00:00')
    })

    it('parses title', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      parsed.parsed.should.not.be.null()
      // eslint-disable-next-line max-len
      parsed.parsed[0].title.should.equal('Antofagasta, una región que avanza en desarrollo urbano e integración')
      // eslint-disable-next-line max-len
      parsed.parsed[1].title.should.equal('Ministra Saball invita al sector privado a participar en la reconstrucción del Maule')
    })


    it('parses thumbnail', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      parsed.parsed.should.not.be.null()
      // eslint-disable-next-line max-len
      parsed.parsed[0].thumbnail.should.equal('http://www.minvu.cl/rps_minvu_v56/OpenSite/Minvu/Más Noticias/Archivo Histórico de Noticias/Archivo de noticias 2017/Enero/Subse Antofagasta OK01.jpg')
      // eslint-disable-next-line max-len
      parsed.parsed[1].thumbnail.should.equal('http://www.minvu.cl/rps_minvu_v56/OpenSite/Minvu/Más Noticias/Archivo Histórico de Noticias/Archivo de noticias 2017/Enero/ministra saball maule201.jpg')
    })

    it('parses cannonical link', () => {
      const $ = cheerio.load(htmlBlock)
      const parsed = parser.parser($)

      parsed.parsed.should.not.be.null()
      // eslint-disable-next-line max-len
      parsed.parsed[0].cannonical.should.equal('http://www.minvu.cl/opensite_det_20170203144744.aspx')

      // eslint-disable-next-line max-len
      parsed.parsed[1].cannonical.should.equal('http://www.minvu.cl/opensite_det_20170202162313.aspx')
    })

  })

})
