const shopify = require('../services/shopify')
const {middleware} = shopify;
const {withShop, withWebhook} = middleware;
module.exports = {
	withWebhook,
	withShop
}
