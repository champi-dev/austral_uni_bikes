var express = require('express');
var router = express.Router();
var apiBikeController = require('../../controllers/api/apiBike');

router.get('/', apiBikeController.bike_list);
router.post('/create', apiBikeController.bike_create);
router.post('/update', apiBikeController.bike_update);
router.post('/delete', apiBikeController.bike_delete);

module.exports = router;