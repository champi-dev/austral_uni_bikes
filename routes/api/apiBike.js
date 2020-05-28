var express = require('express');
var router = express.Router();
var apiBikeController = require('../../controllers/api/apiBike');

router.get('/', apiBikeController.bike_list)
router.post('/create', apiBikeController.bike_create)

module.exports = router;