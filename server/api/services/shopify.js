const {
  shopify_host,
  shopify_apiKey,
  shopify_secret,
  redis_uri,
  env
} = require('../../config/constants')

const ShopifyAPIClient = require('shopify-api-node');
const ShopifyExpress = require('./shopify-express');
const {RedisStrategy} = require('@shopify/shopify-express/strategies');

const shopifyConfig = {
  host: shopify_host,
  apiKey: shopify_apiKey,
  secret: shopify_secret,
  scope: ['write_orders, write_products, read_product_listings'],
  shopStore: new RedisStrategy({
    url: redis_uri
  }),
  async afterAuth(request, response) {
    response.redirect('/');
  },
};

// Create shopify middlewares and router
const shopify = ShopifyExpress(shopifyConfig);

module.exports = shopify