const express = require('express')
const next = require('next')
const compression = require('compression')
const sitemap = require('./sitemap.js')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const port = process.env.PORT || 3000
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    sitemap({ server })

    server.use(compression())

    server.use('/static', express.static('static'))
  
    server.get('*', (req, res) => {
      // console.log(req.url)
      // if (req.url === '/sitemap.xml') {
      //   return sendFile(res, './static/sitemap.xml')
      // }
      return handle(req, res)
      // return app.render(req, res, '/', '')
      // return app.render(req, res, '/', req.query)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
