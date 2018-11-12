const express = require('express');
const shopifyRoutes = require('../shopify.route');
const router = express.Router();

/**
 * GET v1/status
 */
// router.get('/status', (req, res) => res.send('OK'));

router.use('/shopify', shopifyRoutes);

module.exports = router;
