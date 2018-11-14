const express = require('express');
const shopifyRoutes = require('../shopify.route');
const router = express.Router();

/**
 * GET v1/status
 */
// router.get('/status', (req, res) => res.send('OK'));

router.use('/shopify', shopifyRoutes);

router.get('/v1/api/shop', (req, res) => {
	const { session: { shop, accessToken } } = req;
	// console.log(shop)
	if (shop ) {
		res.json({
			shop, accessToken
		})
	} else {
		res.send('failed')
	}
	
})

module.exports = router;
