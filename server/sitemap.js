const sm = require('sitemap')

const sitemap = sm.createSitemap({
  hostname: 'http://tantrumfest.com',
  cacheTime: 600000 // 600 sec - cache purge period
})

const setup = ({ server }) => {
  sitemap.add({
    url: '/',
    changefreq: 'daily',
    priority: 1
  })
  sitemap.add({
    url: '/about',
    changefreq: 'daily',
    priority: 1
  })
  sitemap.add({
    url: '/live',
    changefreq: 'daily',
    priority: 1
  })
  sitemap.add({
    url: '/programs',
    changefreq: 'daily',
    priority: 1
  })
  sitemap.add({
    url: '/contact',
    changefreq: 'daily',
    priority: 1
  })
  sitemap.add({
    url: '/cause',
    changefreq: 'daily',
    priority: 1
  })

  server.get('/sitemap.xml', (req, res) => {
    sitemap.toXML((err, xml) => {
      if (err) {
        res.status(500).end()
        return
      }

      res.header('Content-Type', 'application/xml')
      res.send(xml)
    })
  })
}

module.exports = setup
