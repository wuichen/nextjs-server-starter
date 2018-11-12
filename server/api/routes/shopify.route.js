const express = require('express');
const router = express.Router();

const shopify = require('../services/shopify')

const {routes} = shopify;

router.use(routes)

module.exports = router;