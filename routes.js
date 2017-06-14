
var express = require('express');
var login = require('./loginApi');
var location = require('./locationApi');

var router = express.Router();

//endpoints
router.route('/locations').get(location.getLocations);

router.route('/login').post(login.loginAuth);

router.route('/sendlocation').post(location.sendlocation);



//

module.exports = router;

