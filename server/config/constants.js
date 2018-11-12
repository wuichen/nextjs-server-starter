require('dotenv').config()

module.exports = {
	redis_uri: process.env.REDIS_URI,
	shopify_host: process.env.SHOPIFY_APP_HOST,
  shopify_apiKey: process.env.SHOPIFY_APP_KEY,
  shopify_secret: process.env.SHOPIFY_APP_SECRET,
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};
