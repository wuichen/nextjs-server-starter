const constants = require('./config/constants')
const server = require('./config/express')
const next = require('next')
const clientRoutes = require('./clientRoutes')
const port = parseInt(constants.PORT, 10) || 3000
const dev = constants.env !== 'production'
const app = next({ dev })
const {withShop} = require('./api/middlewares/shopify.middleware')

// nextjs
app.prepare().then(() => {

	// validate shopify session
	// server.use(
 //    withShop({authBaseUrl: '/v1/shopify'}).unless({
 //      path: [
 //        '/toshopify',
 //        '/shopify'
 //      ],
 //    })
	// );

  // server.get('/', withShop({authBaseUrl: '/shopify'}), async (request, response) => {
  //   return app.render(request, response, '/', {})
  // });
  const handler = clientRoutes.getRequestHandler(app)
  // const handler = clientRoutes.getRequestHandler(app, ({req, res, route, query}) => {
  //   app.render(req, res, route.page, query)
  // })

  server.get('*', (req, res) => {
    return handler(req, res)
  })

  startServer()

  function startServer () {
    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`)
    })
  }
})
